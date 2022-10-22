#!usr/bin/env node
import { getArgs } from "./helpers/arg.js"
import { getWeather } from "./services/api.service.js";
import { printHelp, printSuccess, printError, printWeather } from "./services/log.service.js";
import { getKeyValue, saveKeyValue, TOKEN_DICTIONARY } from "./services/storage.service.js";

const saveToken = async (token) => {
    if (!token.length) {
        printError('no token')
        return
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token)
        printSuccess('Token saved')
    } catch (error) {
        printError(error.message)
    }
}

const saveCity = async (city) => {
    if (!city.length) {
        printError('no city')
        return
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city)
        printSuccess('City saved')
    } catch (error) {
        printError(error.message)
    }
}

const getForecast = async (...city) => {
    try {
        let weather
        if (city.length===1) {
            weather = await getWeather(city[0]);
        } else {
            const gettingCity = await getKeyValue(TOKEN_DICTIONARY.city)
            weather = await getWeather(gettingCity);
        }
        printWeather(weather, weather.weather[0].icon)
    } catch (e) {
        if (e?.response?.status == 404) {
            printError(' Wrong city')
        } else if (e?.response?.status == 401) {
            printError(' Wrong token')
        } else {
            printError(e.message)
        }
    }
}

const initCLI = () => {
    const args = getArgs(process.argv); // output command line parameters

    if (args.h) {
        return printHelp();
    }
    if (args.s) {
        return saveCity(args.s)
    }
    if (args.t) {
        return saveToken(args.t);
    }
    if (process.argv.length === 3) {
        return getForecast(process.argv[2])
    } else {
        return getForecast()
    }
}

initCLI();
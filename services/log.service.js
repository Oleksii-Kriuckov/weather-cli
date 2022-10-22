import chalk from 'chalk'
import dedent from 'dedent-js'

export const printError = (error) => {
    console.log(chalk.bgRed(' ERROR ') + error)
}

export const printSuccess = (success) => {
    console.log(chalk.bgGreen(' SUCCESS ') + success)
}

export const printHelp = () => {
    console.log(
       dedent(`${chalk.bgCyan(' HELP ')}
        Without parameters - output weather
        -s [CITY] for set city
        -h for output help
        -t [API_KEY] for save token`)
    )
}

export const printWeather = (res, icon) => {
    console.log(
       dedent(`${chalk.bgBlueBright(' WEATHER ') } Weather in ${res.name}
        ${icon} ${res.weather[0].description}
        Temperature: ${res.main.temp} ℃ (feels like ${res.main.feels_like} ℃ ) 
        Humidity: ${res.main.humidity} 💧
        Wind speed: ${res.wind.speed}`) 
    )
}
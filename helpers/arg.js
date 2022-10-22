
export const getArgs = (args) => {
    const res = {};
    const [executer, file, ...rest] = args
    rest.forEach((v, i, a) => {
        if (v.charAt(0) === '-') {
            if (i === a.length - 1) {
                res[v.substring(1)] = true;
            } else if (a[i + 1].charAt(0) !== '-') {
                res[v.substring(1)] = a[i + 1];
            } else {
                res[v.substring(1)] = true;
            }
        }
    });
    return res
}
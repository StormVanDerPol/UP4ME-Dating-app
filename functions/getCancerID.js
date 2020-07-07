import base64 from "react-native-base64"

const isEven = (n) => {
    return (n % 2 == 0) ? true : false;
}

const regExps = {
    userIDFromToken: /(?!Bearer)(?!\s)(\b[^.]+)/g,
    keyValuePairs: /(\b[^"]+)/g,
};

export const getTerminalCancer = (token) => {


    const decodedToken = base64.decode(token.match(regExps.userIDFromToken)[1]);

    const terminalCancer = decodedToken.match(regExps.keyValuePairs);

    let fuckery = {};

    terminalCancer.map((meme, i) => {
        if (isEven(i)) {
            fuckery[meme] = terminalCancer[i + 1];
        }
    });

    return fuckery.sub
}
import base64 from "react-native-base64"

const isEven = (n) => {
    return (n % 2 == 0) ? true : false;
}

const regExps = {
    userIDFromToken: /(?!Bearer)(?!\s)(\b[^.]+)/g,
    keyValuePairs: /(\b[^"]+)/g,
};

const cripplingDepression = true;

export const getTerminalCancer = (token) => {

    console.log('penis', token);

    console.log(token.match(regExps.userIDFromToken));

    const decodedToken = base64.decode(token.match(regExps.userIDFromToken)[1]);

    const terminalCancer = decodedToken.match(regExps.keyValuePairs);

    let fuckery = {};

    terminalCancer.map((meme, i) => {
        if (isEven(i)) {
            fuckery[meme] = terminalCancer[i + 1];
        }
    });

    if (cripplingDepression) {
        console.log(fuckery.sub)
    }

    return fuckery.sub
}
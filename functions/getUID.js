import base64 from "react-native-base64"

const isEven = (n) => {
    return (n % 2 == 0) ? true : false;
}

const regExps = {
    userIDFromToken: /(?!Bearer)(?!\s)(\b[^.]+)/g,
    keyValuePairs: /(\b[^"]+)/g,
};

export const getUIDFromToken = (token) => {


    const decodedToken = base64.decode(token.match(regExps.userIDFromToken)[1]);

    const tokenParts = decodedToken.match(regExps.keyValuePairs);

    let container = {};

    tokenParts.map((part, i) => {
        if (isEven(i)) {
            container[part] = tokenParts[i + 1];
        }
    });

    return container.sub
}
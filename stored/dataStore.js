import { devMode } from "../dev/devConfig";

export var DATA_STORE = {

    userToken: null,

    registData: {
        email: null,
    }
}

// DATA_STORE.meme = 'pp'
// setDataStore('meme', 'pp')

//Apparently this is all extra.
// export const setDataStore = (key, value) => {

//     DATA_STORE[key] = value;

//     if (devMode.enabled) {
//         console.log('DATA_STORE:', DATA_STORE)
//     }

// }

// export const clearDataStore = (...exceptions) => {

//     let temp = {};

//     for (key of exceptions) {
//         temp[key] = DATA_STORE[key];
//     }

//     DATA_STORE = { ...temp };

//     if (devMode.enabled) {
//         console.log('DATA_STORE after clearing:', DATA_STORE)
//     }
// }
import { devMode } from "../../dev/devConfig";

const protocol = (devMode.localBackend) ? `http://` : `https://`;
const domain = (devMode.localBackend) ? `192.168.1.17` : `www.upforme.nl`;
const port = `:50000`;
const apiRoot = `/api/v1`;

export const API_URL = `${protocol}${domain}${port}${apiRoot}`;

const endpoints = {

    get: {

        registerEmail: `/register/1/`,
        checkMail: `/get/profile/checkmail/`,
    },

    post: {
        login: `/login`,
        setUserData: `/set/profile/bjnh`,
        setGPS: `/set/gps`, //userid, latitude, longitude
        setPlace: `/set/profile/city`, //userid, woontin
    }
};

export const getEndpoint = (endpoint) => {
    return `${API_URL}${endpoint}`;
}

export const requestFeedback = {
    err: 'Network Error...please try again.'
}

export default endpoints;
import { devMode } from "../../dev/devConfig";

const protocol = (devMode.localBackend) ? `http://` : `https://`;
const domain = (devMode.localBackend) ? `192.168.1.17` : `www.upforme.nl`;
const port = `:8080`;
// const apiRoot = `/api/v1`;

export const API_URL = `${protocol}${domain}${port}`;

const endpoints = {

    get: {

        // registerEmail: `/register/1/`,
        checkMail: `/api/v1/get/profile/checkmail/`,
    },

    post: {
        authLocalReq: `/auth/local/req`,
        authLocal: `/auth/local`,
        setUserData: `/api/v1/set/profile/bjnh`,
        setGPS: `/api/v1/set/gps`, //userid, latitude, longitude
        setPlace: `/api/v1/set/profile/city`, //userid, woontin
    }
};

export const getEndpoint = (endpoint) => {
    return `${API_URL}${endpoint}`;
}

export const requestFeedback = {
    err: 'Network Error...please try again.'
}

export default endpoints;

//403 als expired
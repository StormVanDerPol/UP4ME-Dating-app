import { devMode } from "../../dev/devConfig";

const protocol = (devMode.localBackend) ? `http://` : `https://`;
const domain = (devMode.localBackend) ? `192.168.1.239` : `www.upforme.nl`;
const port = `:50000`;
const apiRoot = `/api/v1`;

export const API_URL = `${protocol}${domain}${port}${apiRoot}`;

const endpoints = {
    registerEmail: `/register/1/`,
    checkMail: `/get/profile/checkmail/`,
};

export const getEndpoint = (endpoint) => {
    return `${API_URL}${endpoint}`;
}

export default endpoints;
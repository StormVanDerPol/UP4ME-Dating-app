import { devMode } from "../../dev/devConfig";

const local = false

const protocol = (local) ? `http://` : `https://`;
const domain = (local) ? `169.254.69.40` : `www.upforme.nl`;
const port = (local) ? `:8080` : '';

const apiRoot = `/api/v1`;

export const HOST = `${protocol}${domain}${port}`;

const endpoints = {

    get: {

        // registerEmail: `/register/1/`,
        checkMail: `/api/v1/get/profile/checkmail/`,
        authGoogle: `https://www.upforme.nl/auth/google`,
        authApple: `https://www.upforme.nl/auth/apple`,
        lastLogin: `/get/lastlogin/`,
        setLastLogin: `/set/lastlogin/`,
        potentialMatches: `/get/potentials/`,
        profile: `/get/profile/`,

    },

    post: {
        authLocalReq: `/auth/local/req`,
        authLocal: `/auth/local`,
        setUserData: `/set/profile/bjnh`,
        setGPS: `/set/gps`, //userid, latitude, longitude
        setPlace: `/set/profile/city`, //userid, woontin.
        setGender: `/set/profile/gender`, //userid, geslacht
        setPhotos: `/set/photos`,
        setProfilePicture: `/set/profile/picture`,
        setProfileText: `/set/profile/text`,
        setProperties: `/set/properties`,
        setCriteria: `/set/criteria`,
        setLastedit: `/set/lastedit`,
        getLastedit: `/get/lastedit`,
        setMatchResponses: `/set/matchresponses`
    }
};

export const getEndpoint = (endpoint, api = true) => {

    return (api) ? HOST + apiRoot + endpoint : HOST + endpoint;
}

export const requestFeedback = {
    err: 'Network Error...please try again.'
}

export default endpoints;

//403 als expired
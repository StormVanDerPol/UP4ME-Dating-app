import { PermissionsAndroid, Platform } from "react-native";
import Geolocation from "@react-native-community/geolocation";
import Axios from "axios";
import endpoints, { getEndpoint } from "../res/data/endpoints";
import { DATA_STORE } from "../stored/dataStore";
import { timeouts } from "../res/data/requests";


const GPS_CONFIG = {
    enabled: false,
    logging: true,
}

export const GPS_DATA = {
    enabled: false,
    permission: false,
    timestamp: null,
    coords: null,
}

const hrToMS = (hr) => {
    return hr * 60 * 60 * 1000;
}

const msOffset = hrToMS(0.01);

export const requestPermission = async () => {

    var granted = false;

    if (Platform.OS == 'android') {
        granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

        if (granted == 'granted') {
            granted = true;
        }
        else {
            granted = false;
        }
    }
    else if (Platform.OS == 'iOS') {
        geolocation.requestAuthorization();
    }

    GPS_DATA.permission = granted;
    return granted;
}

export const getGPS = () => {
    Geolocation.getCurrentPosition((pos) => {

        if (GPS_CONFIG.logging)
            console.log('got location:', pos);

        GPS_DATA.coords = pos.coords;
        GPS_DATA.timestamp = pos.timestamp;

        if (DATA_STORE.userToken != null) {

            if (GPS_CONFIG.logging)
                console.log('requesting', getEndpoint(endpoints.post.setGPS), {
                    userid: DATA_STORE.userToken,
                    latitude: GPS_DATA.coords.latitude,
                    longitude: GPS_DATA.coords.longitude,
                })

            Axios.post(getEndpoint(endpoints.post.setGPS), {
                userid: DATA_STORE.userToken,
                latitude: GPS_DATA.coords.latitude,
                longitude: GPS_DATA.coords.longitude,
            }, {
                headers: {
                    authorization: DATA_STORE.userToken,
                },
                timeout: timeouts.short,
            }).then((res) => {
                if (GPS_CONFIG.logging)
                    console.log(res);
            }).catch((err) => {
                if (GPS_CONFIG.logging)
                    console.log(err);
                GPS_DATA.timestamp -= msOffset + 100;

                if (GPS_CONFIG.logging)
                    console.log('error making request', 'new timestamp', GPS_DATA.timestamp);
            });
        }
        else {
            GPS_DATA.timestamp -= msOffset + 100;

            if (GPS_CONFIG.logging)
                console.log('no token available', 'new timestamp', GPS_DATA.timestamp);
        }

    }), (err) => {
        if (GPS_CONFIG.logging)
            console.log('error getting location:', err)
    }, {
        timeout: 1000,
        maximumAge: 2000,
        enableHighAccuracy: true,
    }
}

export const startWatchingGPS = () => {

    if (GPS_CONFIG.enabled) {

        if (!GPS_DATA.coords) {
            requestPermission()
                .then(() => {
                    getGPS();
                });
        }

        if (!GPS_DATA.enabled) {

            setInterval(() => {

                let now = Date.now()

                if (now > GPS_DATA.timestamp + msOffset) {

                    requestPermission()
                        .then(() => {
                            getGPS();
                        });
                }
                else {
                    if (GPS_CONFIG.logging)
                        console.log(`${(GPS_DATA.timestamp + msOffset) - now} ms left till update`);
                }

            }, 10000)
            GPS_DATA.enabled = true;
        }
    }
    else {

        //use mock data instead.
        GPS_DATA.enabled = true;
        GPS_DATA.permission = true;
        GPS_DATA.timestamp = Date.now();
        GPS_DATA.coords = {
            latitude: 0,
            longitude: 0,
        };

        if (GPS_CONFIG.logging)
            console.log(`GPS setting would've been enabled now`);
    }
}
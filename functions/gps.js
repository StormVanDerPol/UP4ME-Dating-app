import { PermissionsAndroid, Platform } from "react-native";
import Geolocation from "@react-native-community/geolocation";
import endpoints, { getEndpoint } from "../res/data/endpoints";
import { DATA_STORE } from "../stored/dataStore";
import { dodoFlight } from "./dodoAirlines";
import { hrToMS } from "../res/data/time";


const GPS_CONFIG = {
    enabled: true,
    logging: false,
}

export const GPS_DATA = {
    enabled: false,
    permission: false,
    timestamp: null,
    coords: null,
}

const msOffset = hrToMS(1);

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
        GPS_DATA.timestamp = Date.now();

        if (DATA_STORE.userToken != null) {

            dodoFlight({
                method: 'post',
                url: getEndpoint(endpoints.post.setGPS),
                data: {
                    userid: DATA_STORE.userID,
                    latitude: GPS_DATA.coords.latitude,
                    longitude: GPS_DATA.coords.longitude,
                },

                thenCallback: (res) => {
                    if (GPS_CONFIG.logging)
                        console.log(res);
                },

                catchCallback: (err) => {
                    GPS_DATA.timestamp -= msOffset + 100;
                    if (GPS_CONFIG.logging) {
                        console.log(err);
                        console.warn('error updating GPS', 'new timestamp', GPS_DATA.timestamp);
                    }
                },
            })
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


let gpsTimer = null;

export const startWatchingGPS = async () => {

    if (GPS_CONFIG.enabled) {

        if (!GPS_DATA.coords) {
            await requestPermission()
                .then(() => {
                    getGPS();
                });
        }

        if (!GPS_DATA.enabled) {



            gpsTimer = setInterval(() => {

                if (DATA_STORE.userToken) {

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
                }
                else {
                    clearInterval(gpsTimer);
                    console.log('stopped watching GPS...');
                }

            }, 10000);
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
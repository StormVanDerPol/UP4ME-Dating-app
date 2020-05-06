import "./globalVariables";

import Geolocation from '@react-native-community/geolocation';

import { PermissionsAndroid } from 'react-native';

import Axios from 'axios';

import { apiUrl } from './globals';
import { endpointSetGPS } from "./endpoints";

export async function reqLocationPermission() {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

    if (granted) {
        console.log("You can use the ACCESS_FINE_LOCATION");
    }
    else {
        console.log("ACCESS_FINE_LOCATION permission denied");
    }

    return granted;
}

export const updateGPSData = () => {

    if (global.sessionUserId != null) {

        Geolocation.getCurrentPosition((pos) => {
            global.gpsData = {
                lat: pos.coords.latitude,
                lon: pos.coords.longitude
            }
            console.log('stored userID', global.sessionUserId, 'GPS Data', global.gpsData);

            Axios.post(endpointSetGPS,
                {
                    userid: global.sessionUserId,
                    latitude: global.gpsData.lat,
                    longitude: global.gpsData.lon
                })
                .then((res) => {
                    console.log('gps update', 'data : ', res);
                })
                .catch((err) => {
                    console.log('Error', err);
                });

        });
    }
    else {
        console.log('No active session')
    }
}
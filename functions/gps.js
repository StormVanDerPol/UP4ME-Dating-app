import { PermissionsAndroid, Platform, Alert, BackHandler } from "react-native";
import Geolocation from "@react-native-community/geolocation";
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import endpoints, { getEndpoint } from "../res/data/endpoints";
import { DATA_STORE } from "../stored/dataStore";
import { dodoFlight } from "./dodoAirlines";
import { hrToMS } from "../res/data/time";

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
            })
        }
        else {
            GPS_DATA.timestamp -= msOffset + 100;
        }

    }), (error) => {
        alert(error.code);
    }, {
        timeout: 1000,
        maximumAge: 2000,
        enableHighAccuracy: true,
    }
}


let gpsTimer = null;

export const startWatchingGPS = async () => {

    if (!GPS_DATA.coords) {
        getLocation();
        GPS_DATA.enabled = true;
    }

    gpsTimer = setInterval(() => {

        if (DATA_STORE.userToken) {

            let now = Date.now();

            if (now > GPS_DATA.timestamp + msOffset) {
                getLocation();
                GPS_DATA.enabled = true;
            }
        } else {
            clearInterval(gpsTimer);
            GPS_DATA.enabled = false;
        }
    }, 10000)

}

const getLocation = async () => {


    var provider;

    if (Platform.OS == 'android') {
        await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 1000, fastInterval: 500 })
            .then((data) => {
                provider = true;
            })
            .catch((error) => {
                provider = false;
            });
    }
    else {
        provider = true;
    }

    if (provider) {

        const permissionGranted = await requestPermission();

        if (permissionGranted) {
            getGPS();
        } else {
            alert('Location permission not granted');
        }

    } else {

        clearInterval(gpsTimer);
        GPS_DATA.enabled = false;

        Alert.alert(
            'Location notice',
            'UP4ME Uses location data to make sure your potential matches are within the range the user provides, thus we request the user to enable their geolocation provider to provide this experience',
            [
                {
                    text: 'Agree',
                    onPress: () => {
                        startWatchingGPS();
                    }
                },
                {
                    text: 'Disagree, exit the app.',
                    onPress: () => {
                        BackHandler.exitApp();
                    }
                }
            ],
            { cancelable: false }
        );
    }

}
import Axios from "axios"
import { timeouts } from "../res/data/requests"
import { DATA_STORE } from "../stored/dataStore"
import { Alert } from "react-native";
import { navigationProxy, timedReset } from "../navigation/navigationProxy";
// import { stopWatchingGPS } from "./gps";

export const dodoFlight = async ({
    method,
    url,
    timeout = timeouts.short,
    data = {},
    headers = {},
    config = {},
    thenCallback = (res) => { },
    catchCallback = (err) => { },
    finallyCallback = () => { },
}) => {

    console.log(
        'Preparing dodo flight',
        {
            method: method,
            url: url,
            data: data,

            headers: {
                authorization: DATA_STORE.userToken,
                ...headers,
            },

            ...config,
        });

    await Axios({
        method: method,
        url: url,
        data: data,

        timeout: timeout,

        headers: {
            authorization: DATA_STORE.userToken,
            ...headers,
        }
    })
        .then((res) => {
            console.log('Noot noot! we have arrived', res);

            if (res.status == 200) {

                if (res.headers.authorization) {
                    console.log('new token received!')
                    DATA_STORE.userToken = res.headers.authorization;
                }
                else {
                    console.log('keeping old token')
                }

                thenCallback(res);
            }
        })
        .catch((err) => {
            console.log('DoDoAirlines crashed...', err);

            if (err.response) {

                console.log(err.response);

                if (err.response.status == 403) {

                    DATA_STORE.userToken = null;
                    DATA_STORE.userID = null;

                    navigationProxy.reset({
                        index: 1,
                        routes: [
                            {
                                name: 'Landing',
                                params: {},
                            },
                        ]
                    });

                    Alert.alert(
                        '403 Forbidden request',
                        'Try logging in again',
                    );
                }
                else if (err.response.status == 404) {

                    // navigationProxy.reset({
                    //     index: 0,
                    //     routes: [
                    //         {
                    //             name: 'Landing',
                    //             params: {},
                    //         },
                    //     ]
                    // });

                    Alert.alert(
                        '404 not found',
                    );
                }
            } else {
                Alert.alert(
                    'Error',
                    'Please try again later!',
                    [
                        {
                            text: 'OK',
                        }
                    ],
                    { cancelable: false }
                );
            }
            catchCallback(err);
        })
        .finally(() => {
            finallyCallback()
        })
}
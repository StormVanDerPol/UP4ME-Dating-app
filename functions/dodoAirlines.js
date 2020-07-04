import Axios from "axios"
import { timeouts } from "../res/data/requests"
import { DATA_STORE } from "../stored/dataStore"
import { devMode } from "../dev/devConfig";
import { Alert } from "react-native";
import { navigationProxy } from "../navigation/navigationProxy";
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
            console.log(res);

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
            console.log(err);

            if (err.response) {

                console.log(err.response);

                if (err.response.status == 403) {

                    DATA_STORE.userToken = null;
                    DATA_STORE.userID = null;

                    // stopWatchingGPS();

                    Alert.alert(
                        'Token expired',
                        'Please log-in again',
                        [
                            {
                                text: 'OK', onPress: () => {
                                    navigationProxy.navigate('Landing');
                                }
                            }
                        ],
                        { cancelable: false }
                    );
                }
            }
            else {
                alert('server error');
            }
            catchCallback(err);
        })
        .finally(() => {
            finallyCallback()
        })
}
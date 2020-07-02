import Axios from "axios"
import { timeouts } from "../res/data/requests"
import { DATA_STORE } from "../stored/dataStore"
import { devMode } from "../dev/devConfig";
import { Alert } from "react-native";
import { navigationProxy } from "../navigation/navigationProxy";

export const dodoFlight = async ({
    method,
    url,
    timeout = timeouts.short,
    data = {},
    headers = {},
    thenCallback = (res) => { },
    catchCallback = (err) => { },
    finallyCallback = () => { },
}) => {

    if (devMode.network)
        console.log(
            'Preparing dodo flight',
            {
                method: method
            },
            {
                url: url
            },
            {
                data: data
            },
            {
                headers: {
                    authorization: DATA_STORE.userToken,
                    ...headers,
                }
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
            if (devMode.network)
                console.log(res);

            if (res.status == 200) {

                console.log('same token', (res.headers.authorization == DATA_STORE.userToken));

                if (res.headers.authorization) {
                    DATA_STORE.userToken = res.headers.authorization;
                }

                thenCallback(res);
            }
        })
        .catch((err) => {
            if (devMode.network)
                console.log(err.response);

            if (err.response.status == 403) {

                DATA_STORE.userToken = {};

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

            catchCallback(err.response);

        })
        .finally(() => {
            finallyCallback()
        })
}
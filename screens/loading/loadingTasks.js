import { DATA_STORE } from "../../stored/dataStore";
import { getData } from "../../stored/handleData";
import { dodoFlight } from "../../functions/dodoAirlines";
import endpoints, { getEndpoint } from "../../res/data/endpoints";
import { timedReset } from "../../navigation/navigationProxy";
import { hrToMS } from "../../res/data/time";
import { Alert } from "react-native";
import loadProfile from "./loadProfile";
import { startWatchingGPS } from "../../functions/gps";

export const loadingTasks = {
    startUp: [
        {
            name: 'load userID',
            exec: async () => {
                DATA_STORE.userID = await getData('userID');
            }
        },
        {
            name: 'load token',
            exec: async () => {
                DATA_STORE.userToken = await getData('userToken');
            }
        },
        {
            name: 'setting last login',
            exec: async () => {

                if (DATA_STORE.userToken && DATA_STORE.userID) {

                    await dodoFlight({
                        method: 'get',
                        url: getEndpoint(endpoints.get.setLastLogin) + DATA_STORE.userID,

                        thenCallback: (res) => {
                            console.log(res)
                            if (res.data === true) {

                                timedReset({
                                    name: 'LoadHome',
                                    delay: 100,
                                });

                            } else {
                                Alert.alert(
                                    'Something went wrong!',
                                    'Weird userID',
                                );

                                timedReset({
                                    name: 'Landing',
                                    delay: 500,
                                });

                            }
                        },
                    })
                } else {
                    timedReset({
                        name: 'Landing',
                        delay: 500,
                    });
                }
            }
        },
    ],

    home: [
        {
            name: 'loading potential matches',
            exec: async () => {
                if (DATA_STORE.pMatches.timeStamp == null || Date.now() > DATA_STORE.pMatches.timeStamp + hrToMS(1)) {
                    await dodoFlight({
                        method: 'get',
                        url: getEndpoint(endpoints.get.potentialMatches) + DATA_STORE.userID,
                        // url: `https://www.upforme.nl/api/v1/suckmybigpp`,

                        thenCallback: (res) => {
                            DATA_STORE.pMatches.list = res.data;
                            if (res.data != false) {
                                DATA_STORE.pMatches.timeStamp = Date.now();
                            }
                        },
                    });
                }
            }
        },
        {
            name: `loading profiles`,
            exec: async () => {
                for (pMatch of DATA_STORE.pMatches.list) {
                    await loadProfile(pMatch);
                }

                console.log(DATA_STORE)
            }
        },
        {
            name: 'getting location data',
            exec: async () => {
                startWatchingGPS();
            }
        },
        {
            name: 'redirect to home',
            exec: async () => {
                timedReset({
                    name: 'Home',
                    delay: 500
                });
            }
        },
    ]
}
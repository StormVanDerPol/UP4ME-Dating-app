import { DATA_STORE } from "../../stored/dataStore";
import { getData } from "../../stored/handleData";
import { dodoFlight } from "../../functions/dodoAirlines";
import endpoints, { getEndpoint } from "../../res/data/endpoints";
import { timedReset, navigationProxy } from "../../navigation/navigationProxy";
import { hrToMS } from "../../res/data/time";
import { Alert } from "react-native";
import loadProfile from "./loadProfile";
import { startWatchingGPS } from "../../functions/gps";

export const profileLoadTasks = {
    tasks: []
}

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

                                navigationProxy.reset({
                                    index: 1,
                                    routes: [
                                        {
                                            name: 'Loading',
                                            params: {
                                                taskSet: loadingTasks.home,
                                            },
                                        },
                                    ]
                                });

                            } else {
                                Alert.alert(
                                    'Something went wrong!',
                                    'Weird userID',
                                );

                                navigationProxy.reset({
                                    index: 1,
                                    routes: [
                                        {
                                            name: 'Landing',
                                            params: {},
                                        },
                                    ]
                                });

                            }
                        },
                    })
                } else {
                    navigationProxy.reset({
                        index: 1,
                        routes: [
                            {
                                name: 'Landing',
                                params: {},
                            },
                        ]
                    });
                }
            }
        },
    ],

    home: [
        {
            name: 'getting location data',
            exec: async () => {
                await startWatchingGPS();
            }
        },
        {
            name: 'loading potential matches',
            exec: async () => {
                if (DATA_STORE.pMatches.timeStamp == null || Date.now() > DATA_STORE.pMatches.timeStamp + hrToMS(1)) {
                    await dodoFlight({
                        method: 'get',
                        url: getEndpoint(endpoints.get.potentialMatches) + DATA_STORE.userID,

                        thenCallback: (res) => {
                            DATA_STORE.pMatches.list = res.data;

                            if (!res.data) {

                                for (let pMatch of DATA_STORE.pMatches.list) {
                                    profileLoadTasks.tasks.push({
                                        name: `loading profile ${pMatch}`,
                                        exec: async () => {
                                            await loadProfile(pMatch);
                                        },
                                    })
                                }

                                DATA_STORE.pMatches.timeStamp = Date.now();
                            }
                        },
                    });
                }
            }
        },
        {
            name: 'redirect',
            exec: async () => {
                navigationProxy.reset({
                    index: 1,
                    routes: [
                        {
                            name: 'Loading',
                            params: {
                                taskSet: profileLoadTasks.tasks,
                            },
                        },
                    ]
                });
            }
        },
    ]
}
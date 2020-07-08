import { DATA_STORE } from "../../stored/dataStore";
import { getData } from "../../stored/handleData";
import { dodoFlight } from "../../functions/dodoAirlines";
import endpoints, { getEndpoint } from "../../res/data/endpoints";
import { timedReset } from "../../navigation/navigationProxy";

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
                                    name: 'Landing',
                                    delay: 2000,
                                });

                            } else {
                                Alert.alert(
                                    'Something went wrong!',
                                    'Weird userID',
                                );

                                timedReset({
                                    name: 'Landing',
                                    delay: 2000,
                                });

                            }
                        },
                    })
                } else {
                    timedReset({
                        name: 'Landing',
                        delay: 2000,
                    });
                }
            }
        },
    ],
}
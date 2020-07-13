import React, { useRef } from 'react';
import LoadingScreen from '../../loading/LoadingScreen';
import { startWatchingGPS } from '../../../functions/gps';
import { DATA_STORE } from '../../../stored/dataStore';
import { hrToMS } from '../../../res/data/time';
import { dodoFlight } from '../../../functions/dodoAirlines';
import endpoints, { getEndpoint } from '../../../res/data/endpoints';
import { navigationProxy } from '../../../navigation/navigationProxy';

const LoadHome = () => {

    const tasks = [
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
                            name: 'LoadProfiles',
                            params: {},
                        },
                    ]
                });
            }
        },
    ]

    return (
        <LoadingScreen tasks={tasks} />
    );
}

export default LoadHome;
import React from 'react';
import { dodoFlight } from '../../functions/dodoAirlines';
import endpoints, { getEndpoint } from '../../res/data/endpoints';
import { timeouts } from '../../res/data/requests';
import { DATA_STORE } from '../../stored/dataStore';
import { navigationProxy } from '../../navigation/navigationProxy';
import LoadingScreen from '../loading/LoadingScreen';

const LoadDatesOverview = () => {

    const tasks = [
        {
            name: 'getting dates',
            exec: async () => {
                await dodoFlight({
                    method: 'get',
                    url: getEndpoint(endpoints.get.dates) + DATA_STORE.userID,
                    timeout: timeouts.short,

                    thenCallback: (res) => {
                        DATA_STORE.dates = res.data
                    }
                });
            }
        },
        {
            name: 'redirecting',
            exec: () => {
                // navigationProxy.navigate('DatesOverview');
                navigationProxy.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'DatesOverview',
                            params: {},
                        }
                    ]
                })
            }
        }

    ]

    return (
        <LoadingScreen tasks={tasks} />
    );
}

export default LoadDatesOverview;
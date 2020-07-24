import React from 'react';
import LoadingScreen from '../loading/LoadingScreen';
import { dodoFlight } from '../../functions/dodoAirlines';
import endpoints, { getEndpoint } from '../../res/data/endpoints';
import { navigationProxy } from '../../navigation/navigationProxy';
import { getLocations } from './getLocations';

const LoadViewLocations = () => {

    const tasks = [
        {
            name: 'Load locations',
            exec: async () => {
                await getLocations();
            }
        },
        {
            name: 'Together we ride!',
            exec: async () => {
                navigationProxy.reset({
                    index: 1,
                    routes: [
                        {
                            name: 'ViewLocations',
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

export default LoadViewLocations;
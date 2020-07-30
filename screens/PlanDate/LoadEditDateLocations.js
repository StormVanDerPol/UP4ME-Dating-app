import React from 'react';
import { getLocations } from '../dateLocations/getLocations';
import { navigationProxy } from '../../navigation/navigationProxy';
import LoadingScreen from '../loading/LoadingScreen';
import { DATA_STORE } from '../../stored/dataStore';

const LoadEditDateLocations = () => {

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
                            name: 'EditDate',
                            params: {
                                canEdit: true,
                            }
                        },
                        {
                            name: 'EditDateLocations',
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

export default LoadEditDateLocations;
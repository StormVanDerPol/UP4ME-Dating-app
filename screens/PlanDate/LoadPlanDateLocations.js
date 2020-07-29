import React from 'react';
import { getLocations } from '../dateLocations/getLocations';
import { navigationProxy } from '../../navigation/navigationProxy';
import LoadingScreen from '../loading/LoadingScreen';
import { DATA_STORE } from '../../stored/dataStore';

const LoadPlanDateLocations = () => {

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
                            name: 'PlanDate',
                            params: {
                                userid: DATA_STORE.plannedDate.userid,
                            }
                        },
                        {
                            name: 'PlanDateLocations',
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

export default LoadPlanDateLocations;
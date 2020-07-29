import React from 'react';
import LoadingScreen from '../loading/LoadingScreen';
import loadProfile from '../loading/loadProfile';
import { navigationProxy } from '../../navigation/navigationProxy';

const LoadDateDetails = ({ route }) => {

    const dateData = route.params.dateData;

    console.log(dateData);

    const tasks = [
        {
            name: 'Loading profile',
            exec: async () => {
                await loadProfile(dateData.userid);
            }
        },
        {
            name: 'redirecting',
            exec: () => {
                // navigationProxy.navigate('DateDetails', dateData);
                navigationProxy.reset({
                    index: 1,
                    routes: [
                        {
                            name: 'DateDetails',
                            params: dateData,
                        },
                    ],
                });
            }
        }
    ]

    return (
        <LoadingScreen tasks={tasks} />
    );
}

export default LoadDateDetails;
import React from 'react';
import loadProfile from '../loading/loadProfile';
import { DATA_STORE } from '../../stored/dataStore';
import LoadingScreen from '../loading/LoadingScreen';
import { navigationProxy } from '../../navigation/navigationProxy';

const LoadProfileHub = () => {

    const tasks = [
        {
            name: 'loading own profile',
            exec: async () => {
                await loadProfile(DATA_STORE.userID);
            }
        },
        {
            name: 'redirecting...',
            exec: () => {
                navigationProxy.reset({
                    index: 1,
                    routes: [
                        {
                            name: 'ProfileHub',
                            params: {},
                        },
                    ]
                });
            }
        }
    ]

    return (
        <LoadingScreen tasks={tasks} />
    );
}

export default LoadProfileHub;
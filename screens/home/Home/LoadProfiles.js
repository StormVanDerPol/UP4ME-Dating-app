import React, { useRef } from 'react';
import LoadingScreen from '../../loading/LoadingScreen';
import { DATA_STORE } from '../../../stored/dataStore';
import loadProfile from '../../loading/loadProfile';
import { navigationProxy } from '../../../navigation/navigationProxy';

const LoadProfiles = () => {

    const tasks = useRef([]);

    let toLoad = DATA_STORE.pMatches.list;

    const _init = useRef(false);

    if (!_init.current) {

        if (toLoad) {

            for (let pMatch of toLoad) {
                tasks.current.push({
                    name: `loading profile ${pMatch}`,
                    exec: async () => {
                        await loadProfile(pMatch)
                    }
                })
            }
        }

        tasks.current.push({
            name: 'redirecting...',
            exec: () => {
                navigationProxy.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'Home',
                            params: {},
                        },
                    ]
                });
            }
        })

        _init.current = true;
    }

    return (
        <LoadingScreen tasks={tasks.current} />
    );
}

export default LoadProfiles;
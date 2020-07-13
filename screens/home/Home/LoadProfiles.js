import React, { useRef } from 'react';
import LoadingScreen from '../../loading/LoadingScreen';
import { DATA_STORE } from '../../../stored/dataStore';
import loadProfile from '../../loading/loadProfile';
import { navigationProxy } from '../../../navigation/navigationProxy';

const LoadProfiles = () => {

    const tasks = useRef([]);

    let toLoad = DATA_STORE.pMatches.list;

    const loaded = useRef(0);

    const _init = useRef(false);

    if (!_init.current) {

        if (toLoad) {

            const loadCount = toLoad.length;

            for (let pMatch of toLoad) {
                tasks.current.push({
                    name: `loading profile ${pMatch}`,
                    exec: async () => {
                        await loadProfile(pMatch)
                            .then(() => {
                                loaded.current++;

                                if (loaded.current == loadCount) {

                                    console.log(DATA_STORE.profileCache)

                                    navigationProxy.reset({
                                        index: 1,
                                        routes: [
                                            {
                                                name: 'Home',
                                                params: {},
                                            },
                                        ]
                                    });
                                }
                            });
                    }
                })
            }
        }
        _init.current = true;
    }

    return (
        <LoadingScreen tasks={tasks.current} />
    );
}

export default LoadProfiles;
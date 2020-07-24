import React, { useState } from 'react';
import { dodoFlight } from '../../functions/dodoAirlines';
import { DATA_STORE } from '../../stored/dataStore';
import { getData, getJSONData } from '../../stored/handleData';
import endpoints, { getEndpoint } from '../../res/data/endpoints';
import { navigationProxy } from '../../navigation/navigationProxy';
import LoadingScreen from '../loading/LoadingScreen';

const Boot = () => {

    const tasks = [
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
            name: 'loading settings',
            exec: async () => {

                let _data = await getJSONData('settings');

                console.log('this fucker', _data, DATA_STORE.settings)
                if (_data) {
                    DATA_STORE.settings = _data;
                }
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

                                navigationProxy.reset({
                                    index: 1,
                                    routes: [
                                        {
                                            name: 'LoadHome',
                                            params: {},
                                        },
                                    ]
                                });

                            } else {
                                Alert.alert(
                                    'Something went wrong!',
                                    'Weird userID',
                                );

                                navigationProxy.reset({
                                    index: 1,
                                    routes: [
                                        {
                                            name: 'Landing',
                                            params: {},
                                        },
                                    ]
                                });

                            }
                        },
                    })
                } else {
                    navigationProxy.reset({
                        index: 1,
                        routes: [
                            {
                                name: 'Landing',
                                params: {},
                            },
                        ]
                    });
                }
            }
        },
    ];

    return (
        <LoadingScreen tasks={tasks} />
    );
}

export default Boot;
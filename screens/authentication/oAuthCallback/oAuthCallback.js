import React, { useEffect } from 'react';
import TextQuicksand from '../../../components/TextQuicksand';
import { dodoFlight } from '../../../functions/dodoAirlines';
import { Alert } from 'react-native';
import endpoints, { getEndpoint } from '../../../res/data/endpoints';
import { navigationProxy } from '../../../navigation/navigationProxy';
import { DATA_STORE } from '../../../stored/dataStore';
import { getTerminalCancer } from '../../../functions/getCancerID';
import { createSession } from '../../../functions/createSession';

const AuthCallback = ({ route }) => {

    const token = route.params.token;

    createSession('bearer ' + token);

    console.log(route)

    dodoFlight({
        method: 'get',
        url: getEndpoint(endpoints.get.lastLogin) + DATA_STORE.userID,

        thenCallback: (res) => {

            if (res.data[0][0].actief == -1) {
                navigationProxy.reset({
                    index: 2,
                    routes: [
                        {
                            name: 'Landing',
                            params: {},
                        },
                        {
                            name: 'RegistUserData',
                            params: {},
                        },
                    ]
                });
            }
            else {
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

        catchCallback: (err) => {

            DATA_STORE.userToken = null;
            DATA_STORE.userID = null;
            navigationProxy.navigate('Landing');

        }
    })

    return (
        <>
        </>
    );
}

export default AuthCallback;
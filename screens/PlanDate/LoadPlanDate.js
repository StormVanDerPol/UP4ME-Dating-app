import React from 'react';
import LoadingScreen from '../loading/LoadingScreen';
import { dodoFlight } from '../../functions/dodoAirlines';
import { DATA_STORE } from '../../stored/dataStore';
import endpoints, { getEndpoint } from '../../res/data/endpoints';
import { navigationProxy } from '../../navigation/navigationProxy';

const LoadPlanDate = ({ route }) => {

    const userid = route.params.userid;

    var toSend = {
        userid: userid,
    };

    const tasks = [
        {
            name: 'Loading a dumbass his profile',
            exec: async () => {
                await loadProfile(userid);
            }
        },
        {
            name: 'Loading restaurant profile, probably',
            exec: async () => {

                if (DATA_STORE.currentResID)
                    await dodoFlight({
                        method: 'get',
                        url: getEndpoint(endpoints.get.resProfile) + DATA_STORE.currentResID,
                        thenCallback: (res) => {
                            toSend = {
                                ...toSend,
                                resData: res.data,
                            }
                        }
                    })
            },
        },
        {
            name: 'Redirect',
            exec: () => {
                // navigationProxy.navigate('PlanDate', toSend);
                navigationProxy.reset({
                    index: 1,
                    routes: [
                        {
                            name: 'Home',
                            params: {},
                        },
                        {
                            name: 'PlanDate',
                            params: toSend,
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

export default LoadPlanDate;
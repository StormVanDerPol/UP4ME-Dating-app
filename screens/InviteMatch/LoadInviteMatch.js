import React from 'react';
import LoadingScreen from '../loading/LoadingScreen';
import loadProfile from '../loading/loadProfile';
import { navigationProxy } from '../../navigation/navigationProxy';

const LoadInviteMatch = ({ route }) => {

    const userid = route.params.userid;

    const tasks = [
        {
            name: 'Loading a dumbass his profile',
            exec: async () => {
                await loadProfile(userid);
            }
        },
        {
            name: 'Redirect',
            exec: () => {
                // navigationProxy.navigate('InviteMatch', {
                //     userid: userid,
                // })

                navigationProxy.reset({
                    index: 1,
                    routes: [
                        {
                            name: 'Home',
                            params: {},
                        },
                        {
                            name: 'InviteMatch',
                            params: {
                                userid: userid,
                            }
                        }
                    ],
                })
            }
        }
    ]

    return (
        <LoadingScreen tasks={tasks} />
    );
}

export default LoadInviteMatch;
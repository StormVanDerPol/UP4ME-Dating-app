import React, { useState } from 'react';

import {
    StyleSheet, Text,
} from 'react-native';

import { CommonActions } from '@react-navigation/native';

import { endpointGetPotentials } from '../../endpoints';
import Axios from 'axios';

const MatchScreenInitial = ({ route, navigation }) => {

    const [init, setInit] = useState(false);
    const retrievePotentialMatches = (userid) => {

        let matchList = [];

        Axios.get(`${endpointGetPotentials}${userid}`)
            .then((res) => {
                console.log(`potential Matches for ${userid}`, res.data);
                matchList = res.data;
            })
            .catch((err) => {
                console.log('Error fetching potential matches', err)
            })
            .finally(() => {

                navigation.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [

                            {
                                name: 'MatchScreenDefault',
                                params: {
                                    matchList: matchList,
                                    index: 0,
                                }
                            },
                        ]
                    })
                );
            });
    }

    if (!init) {
        retrievePotentialMatches(global.sessionUserId)
        setInit(true);
    }


    return (
        <>
            <Text>Please wait warmly</Text>
        </>
    );
}

const s = StyleSheet.create({

});

export default MatchScreenInitial;

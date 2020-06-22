import React, { useState, useRef, useEffect } from 'react';

import {
    StyleSheet, Text,
} from 'react-native';

import { CommonActions } from '@react-navigation/native';

import { endpointGetPotentials, endpointGetProfile } from '../../endpoints';
import { feedProfileData } from './feedProfileData';

import Axios from 'axios';
import { rootNavigation } from '../../rootNavigation';

const MatchScreenInitial = ({ navigation }) => {

    const [loadPercent, setLoadPercent] = useState(0);
    const _requestsDone = useRef(0);

    const [init, setInit] = useState(false);
    const retrievePotentialMatches = (userid) => {

        let matchList = [];

        Axios.get(`${endpointGetPotentials}${userid}`)
            .then(async (res) => {
                console.log(`potential Matches for ${userid}`, res.data);
                matchList = res.data;

                for (match of matchList) {

                    if (global.storedProfiles[match] == null) {

                        await Axios.get(`${endpointGetProfile}${match}`)
                            .then((matchRes) => {

                                global.storedProfiles[match] = feedProfileData(matchRes.data);

                            })
                            .catch((err) => {
                                console.log(err);
                            })
                            .finally(() => {
                                _requestsDone.current++;
                                setLoadPercent((_requestsDone.current / matchList.length) * 100)
                            })
                    }
                }

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
                                    scrollPosition: 0,
                                }
                            },
                        ]
                    })
                );
            });
    }

    if (!init) {
        global.registData.registering = false;
        retrievePotentialMatches(global.sessionUserId)
        setInit(true);
    }


    useEffect(() => {
        console.log(`%cLoading... ${loadPercent}%`, 'font-size: 3rem; color: red;');
    }, [loadPercent])

    return (
        <>
            <Text>Please wait warmly</Text>
            <Text>{loadPercent}%</Text>
        </>
    );
}

const s = StyleSheet.create({

});

export default MatchScreenInitial;

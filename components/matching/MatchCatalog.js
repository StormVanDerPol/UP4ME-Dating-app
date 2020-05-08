import React, { useState, useEffect } from 'react';

import {
    StyleSheet, View, Text,
} from 'react-native';

import { apiUrl, deviceWidth } from '../../globals';
import { ScrollView } from 'react-native-gesture-handler';

import Axios from 'axios';

import MatchCatalogItem from './MatchCatalogItem';
import Nav from '../nav';
import { endpointGetPotentials } from '../../endpoints';

const MatchCatalog = ({ route, navigation }) => {

    const [data] = useState(route.params);
    const [init, setInit] = useState(false);
    const [focusedMatch, setFocusedMatch] = useState(0);
    const [matchList, setMatchList] = useState([]);
    const [profileCache, setProfileCache] = useState({});

    const retrievePotentialMatches = (userid) => {
        Axios.get(`${endpointGetPotentials}${userid}`)
            .then((res) => {
                console.log(`potential Matches for ${userid}`, res.data);
                setMatchList(res.data);
            })
            .catch((err) => {

            })
    }

    if (!init) {
        retrievePotentialMatches(global.sessionUserId.id)
        setInit(true);
    }

    const onFlingMatch = (direction) => {
        switch (direction) {
            case 'right':
                if (focusedMatch != 0) {
                    setFocusedMatch(focusedMatch - 1);
                }
                break;

            case 'left':
                if (focusedMatch != matchList.length - 1) {
                    setFocusedMatch(focusedMatch + 1);
                }
                break;
        }
    }

    const sendCache = (cache) => {
        setProfileCache(cache);
    }

    const deletePotentialMatch = (pmid) => {

        delete profileCache[pmid];
        console.log('new profile cache', profileCache);

        setProfileCache(profileCache);

        for (let i = 0; i < matchList.length; i++) {
            if (matchList[i] == pmid) {
                matchList.splice(i, 1);
            }
        }

        console.log('new match list', matchList);
        setMatchList([...matchList]);
    }

    useEffect(() => {
        console.log('Match list update:', matchList);
    }, [matchList])

    useEffect(() => {
        console.log('wrote cache...', profileCache);
    }, [profileCache]);

    useEffect(() => {
        console.log('focusedMatch', focusedMatch)
    }, [focusedMatch])


    const noMatches = (
        <>
            <Text>no potential matches bruh</Text>
        </>
    );

    const renderProfiles = () => {

        switch (typeof matchList) {

            case 'array':
                if (matchList.length > 0) {
                    return matchList.map((matchid, i) => {
                        return (
                            <MatchCatalogItem
                                cache={profileCache}
                                sendCache={sendCache}
                                userid={matchid}
                                focusedMatch={focusedMatch}
                                itemid={i}
                                key={i}
                                onFlingMatch={onFlingMatch}
                                deletePotentialMatch={deletePotentialMatch}
                            />)
                    })
                }
                else {
                    return noMatches;
                }

            case 'boolean':
                if (!matchList) {
                    return noMatches;

                }
                break;

            default:
                return (
                    <Text>Weird result</Text>
                )
        }
    }


    return (
        <>
            <ScrollView>

                <Nav currentSection={'Main'} n={navigation} />

                <View style={[s.MatchCatalogItemContainer, { right: deviceWidth * (focusedMatch) }]}>

                    {renderProfiles()}

                </View>
            </ScrollView>


        </>
    );
}

const s = StyleSheet.create({

    MatchCatalogItemContainer: {
        flexDirection: 'row',
        width: deviceWidth,
        position: "relative",
    }
});

export default MatchCatalog;
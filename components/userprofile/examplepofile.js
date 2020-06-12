import React, { useRef, useState, useEffect } from 'react';

import {
    View, Text, Dimensions, StyleSheet,
} from 'react-native';

import { calcAgeHet, getDistBetweenCoords } from '../../globals';
import { MatchScreenUserProfileStyles } from '../matching/MatchScreenUserProfileStyles';

import RNSVG_match_no from '../../res/ui/rnsvg/rnsvg_match_no';
import RNSVG_match_yes from '../../res/ui/rnsvg/rnsvg_match_yes';
import RNSVG_paperPlane from '../../res/ui/rnsvg/nav/rnsvg_paperPlane';
import RNSVG_ruler from '../../res/ui/rnsvg/rnsvg_ruler';
import RNSVG_occupation from '../../res/ui/rnsvg/rnsvg_occupation';
import RNSVG_location_profile from '../../res/ui/rnsvg/rnsvg_location_profile';
import RNSVG_report from '../../res/ui/rnsvg/rnsvg_report';
import Axios from 'axios';
import { endpointGetProfile } from '../../endpoints';
import { debugMode } from '../../debugmode';
import { userPropStringSelector } from '../matching/MatchScreenUserPropStringSelector';
import { ScrollView } from 'react-native-gesture-handler';
import BlepButton from '../blepButton';

import Carousel, { Pagination } from "react-native-snap-carousel";

import FastImage from 'react-native-fast-image';
import ProfileLayout from './profilelayout';
import Nav from '../nav';


const ExampleProfile = () => {

    const _init = useRef(false);
    const _userData = useRef({});

    const [fu, forceUpdate] = useState(0);

    const [loaded, setLoaded] = useState(false);

    if (!_init.current) {

        if (global.sessionUserData.fetched == false) {

            Axios.get(
                `${endpointGetProfile}${global.sessionUserId}`
            )
                .then((res) => {

                    let fetchedData = {};

                    let fetchedImages = [
                        res.data.foto1,
                        res.data.foto2,
                        res.data.foto3,
                        res.data.foto4,
                        res.data.foto5,
                        res.data.foto6,
                    ];

                    let fetchedUserProps = {
                        sport: res.data.sporten,
                        party: res.data.feesten,
                        smoking: res.data.roken,
                        alcohol: res.data.alcohol,
                        politics: res.data.stemmen,
                        work: res.data.uur40,
                        kids: res.data.kids,
                        kidWish: res.data.kidwens
                    };

                    console.log(userPropStringSelector(fetchedUserProps));

                    fetchedData = {
                        profilePictures: fetchedImages,
                        name: res.data.naam,
                        placeName: res.data.zoektin,
                        height: res.data.lengte / 100,
                        job: res.data.beroep,
                        desc: res.data.profieltext,
                        age: calcAgeHet(res.data.geboortedatum),
                        dist: 0,
                        userProperties: fetchedUserProps,
                        userPropertiesDesc: userPropStringSelector(fetchedUserProps),
                    }

                    _userData.current = { ...fetchedData };

                    console.log(_userData.current);
                })
                .catch((err) => {
                    if (debugMode.networkRequests) {
                        console.log('Network Error', err)
                    }
                })
                .finally(() => {

                    global.sessionUserData = {
                        ...global.sessionUserData,
                        ..._userData.current,
                        fetched: true,
                    }

                    setLoaded(true);
                })
        }
        else {
            _userData.current = global.sessionUserData;
            setLoaded(true);
        }

        _init.current = true;
    }

    // const _toRender = useRef(<Text>I need to nut</Text>);

    const toRender = () => {
        if (loaded) {
            return (
                <>
                    <ProfileLayout userData={_userData.current} />
                </>
            )
        }
        else {
            return <Text>I need to nut</Text>;
        }

        // forceUpdate(fu + 1);
    }

    return (
        <>
            <Nav currentSection={'Profile'} />

            <ScrollView>

                <BlepButton active={1} title={['Bewerken', 'Voorbeeld']} route={['EditProfile', undefined]} />

                {toRender()}

            </ScrollView>
        </>
    );
}

const PagDotStyles = StyleSheet.create({
    dot: {
        margin: -2.5,
        padding: 0,

        width: 20,
        height: 20,

        borderRadius: 100,

        backgroundColor: '#fff',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.8,
        shadowRadius: 3.84,

        elevation: 5,
    },
})



export default ExampleProfile;
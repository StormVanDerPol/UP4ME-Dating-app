import React, { useRef, useState, useEffect } from 'react';

import {
    StyleSheet, View, Text, Dimensions,
} from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { up4meColours, calcAgeHet } from '../../globals';
import { MatchScreenUserProfileStyles } from '../matching/MatchScreenUserProfileStyles';

import RNSVG_match_no from '../../res/ui/rnsvg/rnsvg_match_no';
import RNSVG_match_yes from '../../res/ui/rnsvg/rnsvg_match_yes';
import RNSVG_paperPlane from '../../res/ui/rnsvg/nav/rnsvg_paperPlane';
import RNSVG_ruler from '../../res/ui/rnsvg/rnsvg_ruler';
import RNSVG_occupation from '../../res/ui/rnsvg/rnsvg_occupation';
import RNSVG_location_profile from '../../res/ui/rnsvg/rnsvg_location_profile';
import Axios from 'axios';
import { endpointGetProfile } from '../../endpoints';
import { debugMode } from '../../debugmode';
import { userPropStringSelector } from '../matching/MatchScreenUserPropStringSelector';
import { ScrollView } from 'react-native-gesture-handler';
import BlepButton from '../blepButton';

const ExampleProfile = () => {

    const _init = useRef(false);
    const _userData = useRef({});

    const [fu, forceUpdate] = useState(0);

    const [loaded, setLoaded] = useState(false);

    if (!_init.current) {

        if (global.sessionUserData.exampleFetched == false) {

            Axios.get(
                `${endpointGetProfile}${global.sessionUserId}`
            )
                .then((res) => {

                    let fetchedData = {
                        profilePictures: [],
                    };

                    let fetchedImages = [
                        res.data.foto1,
                        res.data.foto2,
                        res.data.foto3,
                        res.data.foto4,
                        res.data.foto5,
                        res.data.foto6,
                    ];

                    for (let image of fetchedImages) {

                        if (image) {
                            fetchedData.profilePictures.push(image);
                        }
                    };

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
                        ...fetchedData,

                        name: res.data.naam,
                        placeName: res.data.zoektin,
                        height: res.data.lengte / 100,
                        job: res.data.beroep,
                        desc: res.data.profieltext,
                        age: calcAgeHet(res.data.geboortedatum),
                        dist: Math.round(
                            Math.random() * 100
                        ),
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
                        exampleFetched: true,
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

    const _toRender = useRef(<Text>I need to nut</Text>);

    useEffect(() => {
        if (loaded) {
            _toRender.current = (
                <>
                    <View style={[MatchScreenUserProfileStyles.container]}>
                        <SliderBox
                            sliderBoxHeight={'100%'}
                            autoplay={false}
                            dotColor={up4meColours.gradOrange}
                            paginationBoxVerticalPadding={Dimensions.get('window').height - 160}
                            resizeMode={'cover'}
                            images={_userData.current.profilePictures}
                            dotStyle={{
                                width: 17,
                                height: 17,
                                borderRadius: 100,
                            }}

                        />
                        <View style={MatchScreenUserProfileStyles.infoBox}>
                            <Text style={MatchScreenUserProfileStyles.infoBoxHeader}>{_userData.current.name}, {_userData.current.age}</Text>
                            <View style={MatchScreenUserProfileStyles.infoBoxItem}>
                                <View style={[MatchScreenUserProfileStyles.infoBoxIcon]}><RNSVG_location_profile /></View>
                                <Text style={MatchScreenUserProfileStyles.infoBoxText}>{_userData.current.placeName}</Text>
                            </View>
                            <View style={MatchScreenUserProfileStyles.infoBoxItem}>
                                <View style={[MatchScreenUserProfileStyles.infoBoxIcon]}><RNSVG_occupation /></View>
                                <Text style={MatchScreenUserProfileStyles.infoBoxText}>{_userData.current.job}</Text>
                            </View>
                        </View>
                    </View>


                    <View>
                        <View style={MatchScreenUserProfileStyles.subInfoBoxContainer}>
                            <View style={MatchScreenUserProfileStyles.subInfoBoxWrapper}>
                                <View style={MatchScreenUserProfileStyles.subInfoIconWrapper}>
                                    <RNSVG_ruler />
                                </View>
                                <Text>{_userData.current.height}m</Text>
                            </View>
                            <View style={MatchScreenUserProfileStyles.subInfoBoxWrapper}>
                                <View style={MatchScreenUserProfileStyles.subInfoIconWrapper}>
                                    <RNSVG_paperPlane />
                                </View>
                                <Text>{_userData.current.dist}km</Text>
                            </View>
                        </View>

                        <View>
                            <Text style={MatchScreenUserProfileStyles.description}>{_userData.current.desc}</Text>
                            <View style={MatchScreenUserProfileStyles.matchProperties}>
                                {
                                    _userData.current.userPropertiesDesc.map((prop, i) => {
                                        return (
                                            <View key={i}>
                                                <Text style={MatchScreenUserProfileStyles.matchProperty}>
                                                    {prop}
                                                </Text>
                                            </View>
                                        )
                                    })
                                }

                            </View>
                        </View>

                        <View style={MatchScreenUserProfileStyles.matchDecision}>
                            <RNSVG_match_no />
                            <RNSVG_match_yes />
                        </View>
                    </View>

                </>
            )
        }

        forceUpdate(fu + 1);

    }, [loaded])

    return (
        <>
            <ScrollView>

                <BlepButton active={1} title={['Bewerken', 'Voorbeeld']} route={['EditProfile', undefined]} />

                {_toRender.current}

            </ScrollView>
        </>
    );
}

export default ExampleProfile;
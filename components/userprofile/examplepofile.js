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

    const [carouselIndex, setCarouselIndex] = useState(0)

    const _carouselRef = useRef();

    function carouselItem({ item, index }) {
        return (

            <FastImage
                key={index}
                style={{
                    width: Dimensions.get('window').width,
                    height: '100%',
                }}
                source={{
                    uri: item,
                }}
                width={'100%'}
                height={'100%'}
            />
        )
    }

    // const _toRender = useRef(<Text>I need to nut</Text>);

    const toRender = () => {
        if (loaded) {
            return (
                <>
                    <View style={[MatchScreenUserProfileStyles.container]}>

                        <Carousel
                            data={_userData.current.profilePictures}
                            renderItem={carouselItem}
                            ref={(c) => { _carouselRef.current = c; }}
                            layout={'stack'}
                            layoutCardOffset={18}
                            sliderWidth={Dimensions.get('window').width}
                            itemWidth={Dimensions.get('window').width}
                            scrollEnabled={false}
                            onSnapToItem={(index) => setCarouselIndex(index)}
                            loop={true}
                            useScrollView={true}
                        />
                        <View
                            style={{
                                position: "absolute",
                                left: 0,
                                right: 0,
                            }}>
                            <Pagination
                                tappableDots={true}
                                inactiveDotOpacity={1}
                                dotStyle={PagDotStyles.dot}
                                dotColor={'#fff'}
                                inactiveDotColor={'#fff'}
                                carouselRef={_carouselRef.current}
                                dotsLength={_userData.current.profilePictures.length}
                                activeDotIndex={carouselIndex}
                            />
                        </View>
                        <View
                            onLayout={() => {
                                forceUpdate(fu + 1);
                            }}

                            style={{
                                position: "absolute",
                                right: 20,
                                top: 20,
                                width: 30,
                                height: 30,
                                opacity: 0.7,
                            }}>
                            <RNSVG_report />
                        </View>

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
        else {
            return <Text>I need to nut</Text>;
        }

        // forceUpdate(fu + 1);
    }

    return (
        <>
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
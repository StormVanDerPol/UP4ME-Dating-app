import React, { useState, useEffect, useRef } from 'react';

import {
    StyleSheet, View, Text, BackHandler, Dimensions,
} from 'react-native';
import Axios from 'axios';
import { endpointGetProfile, endpointMatchResponses } from '../../endpoints';
import { calcAgeHet, up4meColours, gs, getDistBetweenCoords } from '../../globals';

import { SliderBox } from 'react-native-image-slider-box';
import { FlingGestureHandler, TouchableWithoutFeedback, Directions, State, ScrollView } from 'react-native-gesture-handler';

import RNSVG_match_yes from '../../res/ui/rnsvg/rnsvg_match_yes';
import RNSVG_match_no from '../../res/ui/rnsvg/rnsvg_match_no';
import RNSVG_occupation from '../../res/ui/rnsvg/rnsvg_occupation';
import RNSVG_location_profile from '../../res/ui/rnsvg/rnsvg_location_profile';

import Nav from '../nav';
import MatchNoMatch from './MatchNoMatch';

import { debugMode } from '../../debugmode';
import RNSVG_ruler from '../../res/ui/rnsvg/rnsvg_ruler';
import RNSVG_paperPlane from '../../res/ui/rnsvg/nav/rnsvg_paperPlane';
import { updateGPSData } from '../../updategps';
import { MatchScreenUserProfileStyles } from './MatchScreenUserProfileStyles';
import { userPropStringSelector } from './MatchScreenUserPropStringSelector';
import { rootNavigation } from '../../rootNavigation';
import { feedProfileData } from './feedProfileData';

const MatchScreen = ({ route, navigation }) => {

    const [matchList, setMatchList] = useState(route.params.matchList);
    const [PotentialMatchIndex] = useState(route.params.index);

    const _userData = useRef({
        profilePictures: [],
        userPropertiesDesc: [],
        dist: 0,
    })

    const [loading, setLoading] = useState(true);

    var scrollPosition = route.params.scrollPosition;

    const retrieveProfileData = (userid) => {

        if (global.storedProfiles[userid] == null) {

            Axios.get(`${endpointGetProfile}${userid}`)
                .then((res) => {

                    _userData.current = feedProfileData(res.data);

                })
                .catch((err) => {
                    console.log('Error', err);
                })
                .finally(() => {
                    global.storedProfiles[userid] = {
                        ..._userData.current,
                    }
                    setLoading(false);
                })
        }
        else {

            _userData.current = {
                ...global.storedProfiles[userid],
            }

            console.log(_userData.current);
            setLoading(false);

        }
    }

    const handleMatch = (reply) => {

        let interest = (reply ? 2 : 1);

        let toSend = {
            userid1: parseInt(global.sessionUserId, 10),
            userid2: matchList[PotentialMatchIndex],
            interesse: interest,
        }

        Axios.post(endpointMatchResponses, toSend)
            .then((res) => {
                console.log('match response', res);
                matchList.splice(PotentialMatchIndex, 1);
                setMatchList([...matchList]);

            })
            .catch((err) => {
                console.log('error sending match response', err);
            })
            .finally(() => {
                changeMatchScreen('currentIndex');
            })
    }

    function changeMatchScreen(direction) {

        console.log('%cChanging match screen!',
            'font-size: 1.2rem; color: aqua');

        console.log(`current matchList`, matchList);

        if (matchList.length > 0) {

            let dir = 0;
            let canChange = true;

            let animDir = 'Default';

            if (debugMode.swiping) {

                console.log('%cCurrent index: ' + `%c${PotentialMatchIndex}` + '%cwhich is userid: ' + `%c${matchList[PotentialMatchIndex]}`,
                    'font-size: 1rem; color: blue',
                    'font-size: 1rem; color: red',
                    'font-size: 1rem; color: blue',
                    'font-size: 1rem; color: red');

                console.log('%cGoing ' + direction,
                    'font-size: 1rem; color: orange');
            }
            switch (direction) {
                case 'right':
                    if (PotentialMatchIndex > 0) {
                        dir = -1;
                        animDir = 'Right';
                        console.log("%cMoving right is possible", 'color: green');
                    }
                    else {
                        canChange = false;
                        console.log("%cMoving right is not possible", 'color: red');
                    }
                    break;

                case 'left':
                    if (PotentialMatchIndex < matchList.length - 1) {
                        dir = 1;
                        animDir = 'Left';
                        console.log("%cMoving left is possible", 'color: green');
                    }
                    else {
                        canChange = false;
                        console.log("%cMoving left is not possible", 'color: red');
                    }
                    break;
                default:
                    if (!matchList[PotentialMatchIndex]) {
                        dir = -1;
                        animDir = 'Right';
                        console.log(`%cNothing on index ${matchList[PotentialMatchIndex]}, subtracting one.`, 'color: orange');
                    }
                    break;
            }

            if (canChange) {

                console.log(` %cNavigating to index: ${PotentialMatchIndex + dir} which is userid: ${matchList[PotentialMatchIndex + dir]}`, 'font-weight: bold');
                console.log(`%cScrollposition saved: ${scrollPosition}`, 'font-size: 1rem; color: tomato');

                navigation.push('MatchScreen' + animDir, {
                    matchList: matchList,
                    index: PotentialMatchIndex + dir,
                    scrollPosition: scrollPosition,
                });
            }
        }
    }

    const _init = useRef(false);

    if (!_init.current) {

        updateGPSData();

        if (matchList) {
            retrieveProfileData(matchList[PotentialMatchIndex]);
        }
        else {
            setLoading(false);
        }

        _init.current = true;
    }

    useEffect(() => {

        function onPressBackButton() {
            rootNavigation.navigate('MatchScreenInitial');
        };

        const backhandler = BackHandler.addEventListener(
            "hardwareBackPress",
            onPressBackButton
        );

        return () => backhandler.remove();
    }, []);

    function contentToRender() {

        if (loading) {
            return (
                <>
                    <Text>Please wait warmly</Text>
                </>
            )
        }
        else {
            if (matchList.length > 0) {
                return (
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

                        <FlingGestureHandler
                            ref={FlingUpRef}
                            simultaneousHandlers={scrollViewRef}
                            direction={Directions.UP}
                            onHandlerStateChange={({ nativeEvent }) => {
                                if (nativeEvent.state === State.ACTIVE) {
                                    console.log('fling up');
                                    navigation.navigate('MatchScreenInitial');
                                }
                            }}
                        >

                            <FlingGestureHandler
                                direction={Directions.RIGHT}
                                onHandlerStateChange={({ nativeEvent }) => {
                                    if (nativeEvent.state === State.ACTIVE) {
                                        console.log('fling right');
                                        changeMatchScreen('right')
                                    }
                                }}>
                                <FlingGestureHandler
                                    direction={Directions.LEFT}
                                    onHandlerStateChange={({ nativeEvent }) => {
                                        if (nativeEvent.state === State.ACTIVE) {
                                            console.log('fling left');
                                            changeMatchScreen('left');
                                        }
                                    }}>
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
                                            <TouchableWithoutFeedback onPress={() => {
                                                handleMatch(false);
                                            }}>
                                                <RNSVG_match_no />
                                            </TouchableWithoutFeedback>

                                            <TouchableWithoutFeedback onPress={() => {
                                                handleMatch(true);
                                            }}>
                                                <RNSVG_match_yes />
                                            </TouchableWithoutFeedback>
                                        </View>
                                    </View>
                                </FlingGestureHandler>
                            </FlingGestureHandler>
                        </FlingGestureHandler>
                    </>
                );
            }
            else {
                return (
                    <MatchNoMatch />
                );
            }
        }
    }

    const scrollViewRef = React.createRef();
    const FlingUpRef = React.createRef();

    return (
        <>
            <Nav currentSection={'Main'} />
            <ScrollView
                style={gs.body}
                ref={scrollViewRef}
                waitFor={FlingUpRef}

                contentOffset={{ y: scrollPosition, x: 0 }}

                onScroll={(e) => {
                    scrollPosition = e.nativeEvent.contentOffset.y;
                }}
            >
                {contentToRender()}
            </ScrollView>
        </>
    );
}

export default MatchScreen;

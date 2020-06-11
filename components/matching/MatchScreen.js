import React, { useState, useEffect, useRef } from 'react';

import {
    StyleSheet, View, Text, BackHandler, Dimensions, Image,
} from 'react-native';
import Axios from 'axios';
import { endpointGetProfile, endpointMatchResponses, endpointSetReport } from '../../endpoints';
import { calcAgeHet, up4meColours, gs, getDistBetweenCoords, mx, apiUrl } from '../../globals';

import { SliderBox } from 'react-native-image-slider-box';
import { FlingGestureHandler, TouchableWithoutFeedback, Directions, State, ScrollView, TapGestureHandler, TouchableOpacity } from 'react-native-gesture-handler';

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
import { CommonActions } from '@react-navigation/native';

import Carousel, { Pagination } from "react-native-snap-carousel";

import FastImage from 'react-native-fast-image';
import RNSVG_report from '../../res/ui/rnsvg/rnsvg_report';

import ModalUp4me from '../modalup4me';
import BigButtonRedux, { ButtonTypes } from '../bigbuttonRedux';

const MatchScreen = ({ route, navigation }) => {

    const [fu, forceUpdate] = useState(0);

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

            if (debugMode.perfomance)
                console.log(`%cFetching profile ${userid} from %cAPI`, 'font-size: 2rem; color: tomato;', 'font-size: 2rem; color: red');

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

            if (debugMode.perfomance)
                console.log(`%cFetching profile ${userid} from %cCACHE`, 'font-size: 2rem; color: tomato;', 'font-size: 2rem; color: blue');

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

                // navigation.push('MatchScreen' + animDir, {
                //     matchList: matchList,
                //     index: PotentialMatchIndex + dir,
                //     scrollPosition: scrollPosition,
                // });

                navigation.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [
                            {
                                name: 'MatchScreen' + animDir,
                                params: {
                                    matchList: matchList,
                                    index: PotentialMatchIndex + dir,
                                    scrollPosition: scrollPosition,
                                }
                            },
                        ]
                    })
                );
            }
        }
    }


    // const refreshMatchScreen = () => {
    //     navigation.dispatch(
    //         CommonActions.reset({
    //             index: 1,
    //             routes: [
    //                 {
    //                     name: 'MatchScreenInitial',
    //                     params: {},
    //                 },
    //             ]
    //         })
    //     );
    // }

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

    const [reportModalActive, setReportModalActive] = useState(false);

    const [reportModal, setReportModal] = useState(<></>)

    function report(status) {
        Axios.post(`${endpointSetReport}`, {
            userid1: global.sessionUserId,
            userid2: matchList[PotentialMatchIndex],
            status: status,
        })
            .catch((err) => {
                console.log(err)
            })
    }


    // IP/api/v1/set/report/
    // post request

    // { userid1, userid2, status }

    //2 == bad photo, dick pic meme
    //3 == spam
    //4 == catfish


    useEffect(() => {

        setReportModal(

            (reportModalActive) ? <ModalUp4me

                duration={300}

                style={{
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingBottom: 50,
                }}>
                <BigButtonRedux onPress={() => { report(2) }} title={"ongepaste foto's"} style={{ marginTop: 12 }} />
                <BigButtonRedux onPress={() => { report(3) }} title={'catfish'} style={{ marginTop: 12 }} />
                <BigButtonRedux onPress={() => { report(4) }} title={'lijkt op spam'} style={{ marginTop: 12 }} />
                <BigButtonRedux onPress={() => { setReportModalActive(false) }} title={'annuleren'} style={{ marginTop: 12 }} buttonType={ButtonTypes.cancel} />
            </ModalUp4me> : <></>
        )

    }, [reportModalActive])


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
                                                bottom: 20,
                                                width: 30,
                                                height: 30,
                                                opacity: 0.7,
                                            }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setReportModalActive(true);
                                                }}
                                            >
                                                <RNSVG_report />
                                            </TouchableOpacity>
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

                                </View>
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

            {reportModal}

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

export default MatchScreen;

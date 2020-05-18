import React, { useState, useEffect } from 'react';

import {
    StyleSheet, View, Text, BackHandler,
} from 'react-native';
import Axios from 'axios';
import { endpointGetProfile, endpointMatchResponses } from '../../endpoints';
import { calcAgeHet, up4meColours, deviceHeight, gs } from '../../globals';

import { SliderBox } from 'react-native-image-slider-box';
import { FlingGestureHandler, TouchableWithoutFeedback, Directions, State, ScrollView } from 'react-native-gesture-handler';

import RNSVG_match_yes from '../../res/ui/rnsvg/rnsvg_match_yes';
import RNSVG_match_no from '../../res/ui/rnsvg/rnsvg_match_no';
import RNSVG_occupation from '../../res/ui/rnsvg/rnsvg_occupation';
import RNSVG_location_profile from '../../res/ui/rnsvg/rnsvg_location_profile';
import Nav from '../nav';
import MatchNoMatch from './MatchNoMatch';

import { debugMode } from '../../debugmode';

const MatchScreen = ({ route, navigation }) => {

    const [matchList, setMatchList] = useState(route.params.matchList);
    const [PotentialMatchIndex] = useState(route.params.index);

    const [images, setImages] = useState([]);
    const [name, setName] = useState();
    const [age, setAge] = useState();
    const [placeName, setPlaceName] = useState();
    const [height, setHeight] = useState();
    const [job, setJob] = useState();
    const [desc, setDesc] = useState()
    const [profProps, setProfProps] = useState({});

    const [loading, setLoading] = useState(true);

    var scrollPosition = route.params.scrollPosition;

    const retrieveProfileData = (userid) => {
        Axios.get(`${endpointGetProfile}${userid}`)
            .then((res) => {

                console.log(`${endpointGetProfile} response: `, res.data);

                let imagesToCheck = [
                    res.data.foto1,
                    res.data.foto2,
                    res.data.foto3,
                    res.data.foto4,
                    res.data.foto5,
                    res.data.foto6,
                ];

                for (let image of imagesToCheck) {

                    if (image) {
                        images.push(image);
                    }
                }

                setImages([...images]);
                setName(res.data.naam);
                setPlaceName(res.data.zoektin);
                setHeight(res.data.lengte / 100);
                setJob(res.data.beroep);
                setDesc(res.data.profieltext);
                setProfProps({
                    sport: res.data.sporten,
                    party: res.data.feesten,
                    smoking: res.data.roken,
                    alcohol: res.data.alcohol,
                    politics: res.data.stemmen,
                    work: res.data.uur40,
                    kids: res.data.kids,
                    kidWish: res.data.kidwens,
                    food: res.data.eten
                });
                setAge(calcAgeHet(res.data.geboortedatum));
            })
            .catch((err) => {
                console.log('Error', err);
            })
            .finally(() => {
                setLoading(false);
            })
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
        else {
            // navigation.navigate('MatchNoMatch');
        }
    }

    const [init, setInit] = useState(false);

    if (!init) {

        retrieveProfileData(matchList[PotentialMatchIndex]);
        setInit(true);
    }

    useEffect(() => {

        function onPressBackButton() {
            navigation.navigate('MatchScreenInitial');
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
                        <View style={[s.container]}>
                            <SliderBox
                                sliderBoxHeight={'100%'}
                                autoplay={false}
                                dotColor={up4meColours.gradOrange}
                                paginationBoxVerticalPadding={deviceHeight - 160}
                                resizeMode={'cover'}
                                images={images}
                                dotStyle={{
                                    width: 17,
                                    height: 17,
                                    borderRadius: 100,
                                }}

                            />
                            <View style={s.infoBox}>
                                <Text style={s.infoBoxHeader}>{name}, {age}</Text>
                                <View style={s.infoBoxItem}>
                                    <View style={[s.infoBoxIcon]}><RNSVG_location_profile /></View>
                                    <Text style={s.infoBoxText}>{placeName}</Text>
                                </View>
                                <View style={s.infoBoxItem}>
                                    <View style={[s.infoBoxIcon]}><RNSVG_occupation /></View>
                                    <Text style={s.infoBoxText}>{job}</Text>
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
                                        <View style={s.subInfoBoxContainer}>
                                            <View>
                                                <Text>{height}</Text>
                                            </View>
                                            <View>
                                                <Text>number</Text>
                                            </View>
                                        </View>

                                        <View>
                                            <Text style={s.description}>{desc}</Text>
                                            <View style={s.matchProperties}>
                                                <Text style={s.matchProperty}>{profProps.sport}</Text>
                                                <Text style={s.matchProperty}>{profProps.party}</Text>
                                                <Text style={s.matchProperty}>{profProps.smoking}</Text>
                                                <Text style={s.matchProperty}>{profProps.alcohol}</Text>
                                                <Text style={s.matchProperty}>{profProps.politics}</Text>
                                                <Text style={s.matchProperty}>{profProps.work}</Text>
                                                <Text style={s.matchProperty}>{profProps.kids}</Text>
                                                <Text style={s.matchProperty}>{profProps.kidWish}</Text>
                                                <Text style={s.matchProperty}>{profProps.food}</Text>
                                            </View>
                                        </View>

                                        <View style={s.matchDecision}>
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

const s = StyleSheet.create({
    container: {
        height: deviceHeight - 125,
    },
    infoBox: {
        position: 'absolute',
        bottom: 20,
        left: 20
    },

    infoBoxItem: {
        alignContent: "center",
        flexDirection: "row",
        marginTop: 10
    },

    infoBoxHeader: {
        color: 'white',
        fontSize: 35,
    },
    infoBoxText: {
        fontSize: 18,
        color: 'white',
    },
    subInfoBoxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        marginBottom: 32
    },

    infoBoxIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },

    description: {
        fontSize: 16,
        alignItems: 'center',
        padding: 25,
        paddingTop: 0,
    },
    matchProperties: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginBottom: 25,
        flexWrap: "wrap",
    },
    matchProperty: {
        fontSize: 17,
        borderWidth: 2,
        borderColor: 'red',
        borderRadius: 20,
        paddingHorizontal: 33,
        paddingVertical: 10,
        marginHorizontal: 12,
        marginVertical: 10
    },

    matchDecision: {
        marginHorizontal: 50,
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
});

export default MatchScreen;

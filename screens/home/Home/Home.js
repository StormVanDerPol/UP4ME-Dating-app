import React, { useState, useRef, useEffect } from 'react';
import { DATA_STORE } from '../../../stored/dataStore';
import { MatchButtons, MemoizedUserProfile } from '../../../components/bigComponents/UserProfile';
import getDeviceDimensions from '../../../functions/dimensions';
import Body, { FlexSection } from '../../../components/Body';
import { FlatList } from 'react-native-gesture-handler';
import { View, Animated, StyleSheet } from 'react-native';
import { dodoFlight } from '../../../functions/dodoAirlines';
import endpoints, { getEndpoint } from '../../../res/data/endpoints';
import TextQuicksand from '../../../components/TextQuicksand';
import FastImage from 'react-native-fast-image';
import UpForMeButton, { ButtonTypes } from '../../../components/UpForMeButton';
import UpForMeIcon, { iconIndex } from '../../../components/UpForMeIcon';
import UpForMeModal from '../../../components/UpForMeModal';

import reportUser from '../../../functions/reportUser';
import { navigationProxy } from '../../../navigation/navigationProxy';
import NavBar, { nbroutes } from '../../../components/navBar/NavBar';
import { planThatDamnDate } from '../../../functions/planThatDamnDate';

const listRef = React.createRef();

const Home = () => {

    const matchList = useRef(DATA_STORE.pMatches.list);

    const swipedex = useRef(0);
    const velocity = useRef(0);

    const [fu, forceUpdate] = useState(0);

    const deleteItem = () => {

        setDisableFade(false);

        matchList.current.splice(swipedex.current, 1)

        if (swipedex.current > matchList.current.length - 1) {

            swipedex.current = matchList.current.length - 1;

            listRef.current.scrollToOffset({
                animated: true,
                offset: getDeviceDimensions('window', 'width') * matchList.current.length - 1,
            })
        }

        forceUpdate(fu + 1);
    }

    const [fadeIn, setFadeIn] = useState(false);
    const [disableFade, setDisableFade] = useState(false);

    const matchee = useRef('wtf');
    const [match, setMatch] = useState(false);

    const [netFeedback, setNetFeedback] = useState({
        busy: false,
        message: '',
    })


    const [reportVisible, showReport] = useState(false);

    const RenderItem = ({ item }) => {
        return (
            <MemoizedUserProfile reportCallback={() => {
                showReport(true);
            }} key={item} userid={item} />
        )
    }

    const triggerDelete = () => {

        setFadeIn(true);
        setTimeout(() => {
            deleteItem();
            setFadeIn(false);
        }, 1000)
    }

    return (
        <Body>

            <NavBar route={nbroutes.home} />

            {(matchList.current.length > 0) ?

                <FlexSection>
                    <View>
                        <FlatList

                            scrollEnabled={!netFeedback.busy}

                            initialScrollIndex={swipedex.current}
                            ref={(c) => { listRef.current = c }}
                            keyExtractor={item => item.key}
                            extraData={fu}
                            data={matchList.current}
                            renderItem={RenderItem}
                            horizontal={true}
                            initialNumToRender={3}
                            maxToRenderPerBatch={3}
                            removeClippedSubviews={true}
                            windowSize={5}
                            showsHorizontalScrollIndicator={false}
                            decelerationRate={1}

                            onMomentumScrollBegin={(e) => {
                                velocity.current = e.nativeEvent.velocity.x;
                            }}

                            onMomentumScrollEnd={(e) => {

                                let old = swipedex.current;

                                swipedex.current = Math.round(e.nativeEvent.contentOffset.x / getDeviceDimensions('window', 'width'));

                                // console.log('target', swipedex.current, 'old', old)

                                if (old == swipedex.current) {

                                    // console.log('velocity', velocity.current);

                                    let newTarget = swipedex.current - Math.sign(velocity.current);

                                    // console.log('test new target', newTarget, (newTarget > -1 && newTarget < matchList.current.length))

                                    if (newTarget > -1 && newTarget < matchList.current.length) {

                                        swipedex.current = newTarget;
                                        // console.log('new target', swipedex.current)
                                    }
                                }

                                // console.log('final target', swipedex.current, 'offset', getDeviceDimensions('window', 'width') * swipedex.current)

                                listRef.current.scrollToOffset({
                                    animated: true,
                                    offset: getDeviceDimensions('window', 'width') * swipedex.current
                                })

                            }}
                        />
                    </View>

                    <MatchButtons onMatch={async (answer) => {

                        if (!netFeedback.busy) {

                            setNetFeedback({
                                message: 'plz wait',
                                busy: true,
                            })

                            let interest = (answer ? 2 : 1);

                            matchee.current = matchList.current[swipedex.current];

                            console.log(matchee.current);

                            await dodoFlight({
                                method: 'post',
                                url: getEndpoint(endpoints.post.setMatchResponses),
                                // url: getEndpoint(endpoints.get.setLastLogin) + DATA_STORE.userID,
                                data: {
                                    userid1: DATA_STORE.userID,
                                    userid2: matchList.current[swipedex.current],
                                    interesse: interest,
                                },

                                thenCallback: (res) => {

                                    // setDisableFade(false);

                                    setFadeIn(true);

                                    setTimeout(() => {

                                        if (res.data) {
                                            setMatch(true)
                                        }

                                        deleteItem();

                                        setFadeIn(false);

                                        setTimeout(() => {
                                            setDisableFade(true);
                                        }, 200)

                                        setNetFeedback({
                                            message: '',
                                            busy: false,
                                        });

                                    }, 1000)
                                },

                                catchCallback: (err) => {
                                    setNetFeedback({
                                        message: 'error',
                                        busy: false,
                                    });
                                },
                            })
                        }
                    }} />
                </FlexSection>

                :

                // NO MATCHES SCREEN
                <View>

                    <TextQuicksand>No matches bruh</TextQuicksand>
                    <TextQuicksand>Pas je criteria aan</TextQuicksand>

                    <UpForMeButton
                        title={'Naar filters'}
                        onPress={() => {
                            navigationProxy.reset({
                                index: 1,
                                routes: [
                                    {
                                        name: 'Home',
                                        params: {},
                                    },
                                    {
                                        name: 'LoadCriteria',
                                        params: {},
                                    }
                                ]
                            })
                        }}
                    />
                </View>

            }



            {(match) ? <MatchSuccess userid={matchee.current}
                onContinueSwiping={() => {
                    setMatch(false);
                    // setDisableFade(false);
                }}
            /> : <></>}

            {(!disableFade) ? (fadeIn) ? <FadeInOverlay /> : <FadeOutOverlay /> : <></>}

            <UpForMeModal onPressBackButton={() => {
                showReport(false);
            }} enabled={reportVisible}>

                <View style={{ flex: 1 }} />

                <View style={styles.reportModal}>
                    <UpForMeButton style={styles.reportModalBtn} onPress={() => {

                        reportUser(1, DATA_STORE.userID, matchList.current[swipedex.current], () => {
                            showReport(false);
                            triggerDelete();
                        });

                    }} title={`Ongepaste foto's`} />
                    <UpForMeButton style={styles.reportModalBtn} onPress={() => {

                        reportUser(2, DATA_STORE.userID, matchList.current[swipedex.current], () => {
                            showReport(false);
                            triggerDelete();
                        });

                    }} title={'Catfish'} />
                    <UpForMeButton style={styles.reportModalBtn} onPress={() => {

                        reportUser(3, DATA_STORE.userID, matchList.current[swipedex.current], () => {
                            showReport(false);
                            triggerDelete();
                        });

                    }} title={'Lijkt op spam'} />
                    <UpForMeButton style={styles.reportModalBtn} title={'Annuleren'} buttonType={ButtonTypes.white}
                        onPress={() => {
                            showReport(false);
                        }} />
                </View>
            </UpForMeModal>
        </Body >
    );
}

const MatchSuccess = ({ userid, onContinueSwiping = () => { } }) => {

    return (
        <View style={styles.MatchSuccess}>

            <FastImage
                style={styles.MatchSuccessImage}
                source={{
                    uri: DATA_STORE.profileCache[userid].foto1,
                }}
            />

            <View style={{
                flex: 1,
            }}>

                <View style={styles.MatchSuccessHeaderContainer}>
                    <TextQuicksand style={{ ...styles.MatchSuccessHeader }}>Jij en {DATA_STORE.profileCache[userid].naam}</TextQuicksand>
                    <TextQuicksand style={{ ...styles.MatchSuccessHeader }}>MATCHEN!</TextQuicksand>
                </View>

                <UpForMeIcon style={styles.MatchSuccessHeart} icon={iconIndex.heart} />
                <UpForMeIcon style={styles.MatchSuccessHeart} icon={iconIndex.heart} />
                <UpForMeIcon style={styles.MatchSuccessHeart} icon={iconIndex.heart} />

            </View>

            <UpForMeButton
                style={styles.MatchSuccessButton}
                title={'Plan een date'}
                onPress={() => {
                    planThatDamnDate({
                        userid: userid,
                    })
                }}
            />

            <TextQuicksand
                style={styles.MatchScreenContinueSwiping}
                onPress={() => { onContinueSwiping() }}
            >Verder swipen</TextQuicksand>

        </View>
    )
}

const styles = StyleSheet.create({

    reportModal: {
        alignItems: "center",
        marginBottom: 24,
    },

    reportModalBtn: {
        marginVertical: 6,
    },

    MatchSuccess: {
        position: "absolute",
        top: 0,
        left: 0,
        width: getDeviceDimensions('window', 'width'),
        height: getDeviceDimensions('window', 'height'),
        backgroundColor: '#fff',
    },

    MatchSuccessImage: {
        position: "absolute",
        top: 0,
        left: 0,
        width: getDeviceDimensions('window', 'width'),
        height: getDeviceDimensions('window', 'height'),
    },

    MatchSuccessHeaderContainer: {
        alignItems: "center",
        marginTop: getDeviceDimensions('window', 'height') / 2 - 100,
    },

    MatchSuccessHeader: {
        color: '#fff',
        fontSize: 50,
        textShadowColor: '#000',
        textShadowRadius: 1,
        textShadowOffset: {
            width: 1,
            height: 1,
        }
    },

    MatchSuccessButton: {
        alignSelf: "center",
    },

    MatchSuccessHeart: {
        height: 33,
        width: 33,
        alignSelf: "center",
        marginVertical: 5,
    },

    MatchScreenContinueSwiping: {
        marginTop: 24,
        marginBottom: 12,
        color: '#fff',
        textDecorationLine: "underline",
        fontWeight: "normal",
        alignSelf: "center",
    },

    fadeCommon: {
        position: "absolute",
        top: 0,
        left: 0,
        width: getDeviceDimensions('window', 'width'),
        height: getDeviceDimensions('window', 'height'),
        backgroundColor: '#fff',
    }
})

const FadeOutOverlay = () => {

    const opacity = useRef(new Animated.Value(1)).current;

    const fadeAnim = () => {
        Animated.timing(
            opacity,
            {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }
        ).start();
    }

    useEffect(() => {
        fadeAnim();
    }, []);

    return (
        <Animated.View style={{
            ...styles.fadeCommon,
            opacity: opacity,
        }} />
    )
}

const FadeInOverlay = () => {

    const opacity = useRef(new Animated.Value(0)).current;

    const fadeAnim = () => {
        Animated.timing(
            opacity,
            {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }
        ).start();
    }

    useEffect(() => {
        fadeAnim();
    }, []);

    return (
        <Animated.View style={{
            ...styles.fadeCommon,
            opacity: opacity,
        }} />
    )
}

export default Home;
import React, { useState, useEffect } from 'react';
import { SliderBox } from "react-native-image-slider-box";

import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    deviceHeight,
    apiUrl,
    calcAge,
} from '../../globals';

import {
    TouchableOpacity,
    FlingGestureHandler,
    Directions,
    State
} from 'react-native-gesture-handler';

import Axios from 'axios';

const MatchCatalogItem = (p) => {

    const [images, setImages] = useState([]);
    const [name, setName] = useState();
    const [age, setAge] = useState();
    const [placeName, setPlaceName] = useState();
    const [height, setHeight] = useState();
    const [job, setJob] = useState();
    const [desc, setDesc] = useState()
    const [profProps, setProfProps] = useState({});

    const [loaded, setLoaded] = useState(false);

    const [loadWindow] = useState(1)

    const writeCache = () => {
        return Object.assign(p.cache, {
            [p.userid]: {
                images: images,
                name: name,
                age: age,
                placeName: placeName,
                height: height,
                job: job,
                desc: desc,
                profProps: profProps,
            }
        })
    }



    const retrieveProfileData = (userid) => {
        Axios.get(`${apiUrl}/retrieve/profile/of/${userid}`)
            .then((res) => {

                console.log('/retrieve/profile/of/ response: ', res.data[0]);

                let imagesToCheck = [
                    res.data[0].foto1,
                    res.data[0].foto2,
                    res.data[0].foto3,
                    res.data[0].foto4,
                    res.data[0].foto5,
                    res.data[0].foto6,
                ];

                for (let image of imagesToCheck) {

                    if (image) {
                        images.push(image);
                    }
                }

                setImages([...images]);

                setName(res.data[0].naam);

                setPlaceName(res.data[0].zoektin);

                setHeight(res.data[0].lengte / 100);

                setJob(res.data[0].beroep);

                setDesc(res.data[0].profieltext);

                setProfProps({
                    sport: res.data[0].sporten,
                    party: res.data[0].feesten,
                    smoking: res.data[0].roken,
                    alcohol: res.data[0].alcohol,
                    politics: res.data[0].stemmen,
                    work: res.data[0].uur40,
                    kids: res.data[0].kids,
                    kidWish: res.data[0].kidwens,
                    food: res.data[0].eten
                });

                setAge(calcAge(res.data[0].geboortedatum));

            })
            .catch((err) => {
                console.log('Error', err);
            })
            .finally(() => {
                console.log('images: ', images);
            })
    }


    const [cacheWritten, setCacheWritten] = useState(false);

    const handleMatch = (reply) => {

        let interest1 = (reply ? 2 : 1);

        console.log('posting to', `${apiUrl}/set/matchresponses`)

        Axios.post(`${apiUrl}/set/matchresponses`,
            {
                userid1: global.sessionUserId,
                userid2: p.userid,
                interesse1: interest1,
            }
        )
            .then((res) => {
                console.log('match response', res);

                if (res.data) {
                    p.deletePotentialMatch(p.userid);
                    unload();

                    setLoaded(false);
                }
            });
    }


    if (loaded) {

        if (!cacheWritten) {

            if (images.length != 0 &&
                name != undefined &&
                placeName != undefined &&
                height != undefined &&
                job != undefined &&
                desc != undefined &&
                profProps != {} &&
                age != undefined) {

                let newcache = writeCache();
                console.log('sending over data to MatchCatalog', newcache);
                p.sendCache(newcache);

                setCacheWritten(true);
            }
        }
    }


    const getCachedProfile = (id) => {

        let targetProfile = p.cache[id];

        console.log('target profile', targetProfile);

        setImages(targetProfile.images);
        setName(targetProfile.name);
        setPlaceName(targetProfile.placeName);
        setHeight(targetProfile.height);
        setJob(targetProfile.job);
        setDesc(targetProfile.desc);
        setProfProps(targetProfile.profProps);
        setAge(targetProfile.age);
    }

    const unload = () => {
        setImages([]);
        setName();
        setPlaceName();
        setHeight(0);
        setJob();
        setDesc();
        setProfProps({});
        setAge(0)
    }

    const [init, setInit] = useState(false);

    if (!init) {
        setInit(true);
    }

    if (!loaded) {

        if (Math.abs(p.itemid - p.focusedMatch) < loadWindow) {


            if (`${p.userid}` in p.cache) {

                console.log('loading userid profile from cache', p.userid)
                getCachedProfile(p.userid);

            }
            else {
                console.log('retrieving userid profile from API', p.userid)
                retrieveProfileData(p.userid);
            }
            setLoaded(true);
        }
    }
    else {
        if (Math.abs(p.itemid - p.focusedMatch) > loadWindow) {

            console.log('unloading userid', p.userid)

            unload();
            setLoaded(false)
        }
    }

    useEffect(() => {
        console.log('is loaded', loaded);
    }, [loaded])



    return (
        <View style={[]}>
            <View style={[s.container]}>
                <SliderBox
                    sliderBoxHeight={'100%'}
                    autoplay={false}
                    dotColor={"#ffd1f3"}

                    paginationBoxVerticalPadding={deviceHeight - 100}

                    resizeMode={'cover'}

                    images={images}
                    onCurrentImagePressed={index =>
                        console.warn(`image ${index} pressed`)
                    }
                />
                <View style={s.infoBoxContainer}>
                    <Text style={s.infoBoxHeader}>{name}, {age}</Text>

                    <Text style={s.subInfoBoxText}>icon {placeName}</Text>
                    <Text style={s.subInfoBoxText}>icon {job}</Text>
                </View>

            </View>

            <FlingGestureHandler
                direction={Directions.RIGHT}
                onHandlerStateChange={({ nativeEvent }) => {
                    if (nativeEvent.state === State.ACTIVE) {
                        console.log('fling right');
                        p.onFlingMatch('right');
                    }
                }}>
                <FlingGestureHandler
                    direction={Directions.LEFT}
                    onHandlerStateChange={({ nativeEvent }) => {
                        if (nativeEvent.state === State.ACTIVE) {
                            console.log('fling left');
                            p.onFlingMatch('left');
                        }
                    }}>
                    <View>

                        <View style={s.subInfoBoxContainer}>
                            <Text>icon {height}</Text>
                            <Text>icon number</Text>
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

                            <TouchableOpacity style={s.matchButton} onPress={() => {
                                handleMatch(false)
                            }}>
                                <Text>NO</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={s.matchButton} onPress={() => {
                                handleMatch(true)
                            }}>
                                <Text>OK</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </FlingGestureHandler>
            </FlingGestureHandler>
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        height: deviceHeight - 50,
    },
    infoBoxContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20
    },
    infoBoxHeader: {
        color: 'black',
        fontSize: 35,
    },
    subInfoBoxText: {
        fontSize: 18,
        color: 'black',
    },
    subInfoBoxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        marginBottom: 32
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
    matchButton: {
        width: 80,
        height: 80,
        borderRadius: 100,
        borderColor: 'pink',
        borderWidth: 2,
        backgroundColor: "white",

        justifyContent: "center",
        alignItems: 'center',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,

    },

});

export default MatchCatalogItem;
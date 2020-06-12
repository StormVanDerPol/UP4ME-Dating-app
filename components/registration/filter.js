
import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';

import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    Alert,
} from 'react-native';

import FilterRadioButton from './filterRadiobtn';
import Logo from '../logo';
import BigButton from '../bigbutton';

import MultiSlider from '@ptomasroos/react-native-multi-slider';

import { gs, up4meColours, deviceWidth, mx } from '../../globals';

import { endpointSetCriteria, endpointSetProfile, endpointGetCriteria, endpointGetMatches, endpointGetPotentials } from '../../endpoints';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { debugMode } from '../../debugmode';
import Nav from '../nav';
import SliderMarkerWhite from '../sliderMarkerWhite';
import BigButtonRedux from '../bigbuttonRedux';
import { rootNavigation } from '../../rootNavigation';

const Filters = ({ route }) => {

    const [fu, forceUpdate] = useState(0);

    const [selections, setSelections] = useState(
        {
            prefsport: 4,
            prefparty: 4,
            prefsmoking: 4,
            prefalcohol: 4,
            prefpolitics: 5,
            prefwork: 4,
            prefkids: 3,
            prefkidWish: 4,
            preffood: 4
        }
    );

    if (global.registData.userCriteria == null) {
        global.registData.userCriteria = selections;
    }

    const getSelections = (selection) => {

        setSelections(Object.assign(selections, selection));
        console.log(selections, 'keys: ', (Object.keys(selections).length));
    }

    const postData = async () => {

        console.log(selections)

        await Axios.post(endpointSetCriteria,
            {
                userid: global.sessionUserId,
                sport: selections.prefsport,
                feesten: selections.prefparty,
                roken: selections.prefsmoking,
                alcohol: selections.prefalcohol,
                stemmen: selections.prefpolitics,
                werken: selections.prefwork,
                kinderwens: selections.prefkidWish,
                kinderen: selections.prefkids,
                eten: selections.preffood,
                minlengte: _sliderData.current.heights[0],
                maxlengte: _sliderData.current.heights[1],
                leeftijdmin: _sliderData.current.ages[0],
                leeftijdmax: _sliderData.current.ages[1],
                geslacht: _prefGender.current,
                afstand: _sliderData.current.distance,
            })
            .then((res) => {
                console.log('success', res);
            })
            .catch((err) => {
                console.log('error', err);
            })

        global.registData.userCriteria = selections;
        global.registData.minheight = _sliderData.current.heights[0];
        global.registData.maxheight = _sliderData.current.heights[1];
        global.registData.minage = _sliderData.current.ages[0];
        global.registData.maxage = _sliderData.current.ages[1];
        global.registData.prefGender = _prefGender.current;
        global.registData.distance = _sliderData.current.distance;

        await Axios.post(`${endpointSetProfile}`, {

            userid: global.sessionUserId,
            naam: global.registData.name,
            geboortedatum: global.registData.bday,
            lengte: global.registData.height * 100,
            beroep: global.registData.job,
            woontin: global.registData.placeName,
            geslacht: global.registData.gender,
            profiletext: global.registData.profileDescription,

        })

        console.log('saved data: ', global.registData);

        await Axios.get(`${endpointGetPotentials}${global.sessionUserId}`)
            .then((res) => {
                console.log(res.data)

                if (!res.data) {
                    Alert.alert(
                        "Geen potential matches",
                        "Versoepel je criteria!",
                        [
                            {
                                text: "Terug",
                                style: "cancel",
                            },
                            { text: "Alsong doorgaan", onPress: () => rootNavigation.navigate('MatchScreenInitial') }
                        ],
                        { cancelable: false }
                    );
                }

            })



        // rootNavigation.navigate('MatchScreenInitial');
    }

    const _sliderData = useRef({
        ages: [18, 120],
        heights: [150, 250],
        distance: 250,
    })

    function getSliderData(data) {
        _sliderData.current = {
            ..._sliderData.current,
            ...data
        };
    }

    const _prefGender = useRef(4)

    function getPrefGenderData(data) {
        _prefGender.current = data;
    }

    function displayLogo() {

        if (!route.params)
            return <Logo />;

        if (route.params.fromNav)
            return <></>;

    }

    const _navHeight = useRef(0);

    function displayNav() {
        if (!route.params)
            return <></>;
        if (route.params.fromNav) {
            _navHeight.current = 50;
            return <Nav currentSection={'Filter'} />;
        }
    }

    const [loaded, setLoaded] = useState(false);

    // const _init = useRef(false);

    // if (!_init.current) {

    //     Axios.get(`${endpointGetCriteria}${global.sessionUserId}`)
    //         .then((res) => {

    //             console.log(res.data[0]);

    //             setSelections({
    //                 prefsport: res.data[0].sporten,
    //                 prefparty: res.data[0].feesten,
    //                 prefsmoking: res.data[0].roken,
    //                 prefalcohol: res.data[0].alcohol,
    //                 prefpolitics: res.data[0].stemmen,
    //                 prefwork: res.data[0].uur40,
    //                 prefkids: res.data[0].kids,
    //                 prefkidWish: res.data[0].kidwens,
    //                 preffood: res.data[0].eten,
    //             });

    //             _sliderData.current = {
    //                 ages: [res.data[0].leeftijdmin, res.data[0].leeftijdmax],
    //                 heights: [res.data[0].minlengte, res.data[0].maxlengte],
    //                 distance: res.data[0].afstand,
    //             }

    //             _prefGender.current = res.data[0].geslacht;
    //         })
    //         .catch((err) => {
    //             if (debugMode.networkRequests)
    //                 console.log('Network error getting user criteria', err);
    //         })
    //         .finally(() => {
    //             setLoaded(true);
    //         })

    //     _init.current = true;
    // }

    useEffect(() => {

        forceUpdate(fu + 1);

    }, [loaded])

    return (
        <View style={gs.body}>

            {displayNav()}

            <ScrollView style={gs.screenWrapperScroll}>

                {displayLogo()}

                <Text style={[s.questionHeader]}>Geïnteresseerd in</Text>

                <GenderSelector getData={getPrefGenderData} />


                <View style={[s.questionContainer]}>
                    <AgeSlider getData={getSliderData} />
                    <HeightSlider getData={getSliderData} />
                    <DistanceSlider getData={getSliderData} />
                </View>



                <View style={[s.questionContainer]}>
                    <Text style={[s.questionHeader]}>Wil je dat iemand sport?</Text>
                    <FilterRadioButton btnText={[
                        "Ja",
                        "Af en toe",
                        "Nee"
                    ]} selectKey={'prefsport'} value={global.registData.userCriteria.prefsport} getSelections={getSelections} />
                </View>


                <View style={[s.questionContainer]}>
                    <Text style={[s.questionHeader]}>Wil je dat iemand feest?</Text>
                    <FilterRadioButton btnText={[
                        "Ja",
                        "Af en toe",
                        "Nee"
                    ]} selectKey={'prefparty'} value={global.registData.userCriteria.prefparty} getSelections={getSelections} />
                </View>


                <View style={[s.questionContainer]}>
                    <Text style={[s.questionHeader]}>Wil je dat iemand rookt?</Text>
                    <FilterRadioButton btnText={[
                        "Ja",
                        "Af en toe",
                        "Nee"
                    ]} selectKey={'prefsmoking'} value={global.registData.userCriteria.prefsmoking} getSelections={getSelections} />
                </View>


                <View style={[s.questionContainer]}>
                    <Text style={[s.questionHeader]}>Wil je dat iemand alcohol drinkt?</Text>
                    <FilterRadioButton btnText={[
                        "Ja",
                        "Af en toe",
                        "Nee"
                    ]} selectKey={'prefalcohol'} value={global.registData.userCriteria.prefalcohol} getSelections={getSelections} />
                </View>

                <View style={[s.questionContainer]}>
                    <Text style={[s.questionHeader]}> Wat wil je dat iemand stemt?</Text>
                    <FilterRadioButton btnText={[
                        "Links",
                        "Midden",
                        "Rechts",
                        "Niet"
                    ]} selectKey={'prefpolitics'} value={global.registData.userCriteria.prefpolitics} getSelections={getSelections} />
                </View>

                <View style={[s.questionContainer]}>
                    <Text style={[s.questionHeader]}>Hoeveel wil je dat iemand werkt?</Text>
                    <FilterRadioButton btnText={[
                        "< 40 uur",
                        "40 uur",
                        "> 40 uur"
                    ]} selectKey={'prefwork'} value={global.registData.userCriteria.prefwork} getSelections={getSelections} />
                </View>

                <View style={[s.questionContainer]}>
                    <Text style={[s.questionHeader]}>Wil je dat iemand gezond eet?</Text>
                    <FilterRadioButton btnText={[
                        "Ja",
                        "Af en toe",
                        "Nee"
                    ]} selectKey={'preffood'} value={global.registData.userCriteria.preffood} getSelections={getSelections} />
                </View>

                <View style={[s.questionContainer]}>
                    <Text style={[s.questionHeader]}>Wil je dat iemand kinderen heeft?</Text>
                    <FilterRadioButton btnText={[
                        "Ja",
                        "Nee"
                    ]} selectKey={'prefkids'} value={global.registData.userCriteria.prefkids} getSelections={getSelections} />
                </View>

                <View style={[s.questionContainer]}>
                    <Text style={[s.questionHeader]}>Wil je dat iemand kinderen wilt?</Text>
                    <FilterRadioButton btnText={[
                        "Ja",
                        "Mischien",
                        "Nee"
                    ]} selectKey={'prefkidWish'} value={global.registData.userCriteria.prefkidWish} getSelections={getSelections} />
                </View>

                <View style={[s.questionContainer, { marginBottom: _navHeight.current }]}>
                    <View style={gs.bottom}>
                        {/* <BigButton component={"MatchScreenInitial"} text="opslaan"
                            callBack={postData} /> */}

                        <BigButtonRedux title={'opslaan'} onPress={() => { postData() }} />

                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const GenderSelector = (p) => {

    const [prefGender, setPrefGender] = useState(4);

    const prefGenderStyle = (id) => {

        return (prefGender == id) ? { color: "white" } : { color: "gray" };
    }

    function prefGenderGrad(id) {
        return (prefGender == id) ? [up4meColours.gradPink, up4meColours.gradOrange] : ['#fffff000', '#fffff000'];
    }

    const sendData = (data) => {
        p.getData(data);
    }

    useEffect(() => {
        sendData(prefGender)
    }, [prefGender]);

    return (
        <View style={s.prefGenderButtonContainer}>
            {
                ['Mannen', 'Vrouwen', 'Iedereen'].map((gender, i) => {

                    return (
                        < TouchableWithoutFeedback
                            onPress={() => setPrefGender(i + 1)}
                        >
                            <LinearGradient style={[s.prefGenderGrad]} colors={prefGenderGrad(i + 1)}>
                                <Text style={[prefGenderStyle(i + 1), s.prefGenderButton]}>{gender}</Text>
                            </LinearGradient>
                        </TouchableWithoutFeedback>
                    )
                })
            }
        </View>
    );
}

const AgeSlider = (p) => {

    const [ages, setAges] = useState([18, 120]);

    const sendData = (data) => {
        p.getData(data);
    }

    useEffect(() => {
        sendData({ ages: ages })
    }, [ages]);

    return (
        <>
            <View style={s.sliderHeader}>
                <Text>Leeftijd</Text>
                <Text>{ages[0]} - {ages[1]}</Text>
            </View>
            <View style={s.sliderWrapper}>
                <MultiSlider
                    customMarker={SliderMarkerWhite}
                    selectedStyle={s.track}
                    sliderLength={deviceWidth - mx * 2 - 30}
                    values={[ages[0], ages[1]]} min={18} max={120}
                    onValuesChange={(output) => { setAges(output) }} />
            </View>
        </>
    )
}

const HeightSlider = (p) => {

    const [heights, setHeights] = useState([150, 250]);

    const sendData = (data) => {
        p.getData(data);
    }

    useEffect(() => {
        sendData({ heights: heights })
    }, [heights]);

    return (
        <>
            <View style={s.sliderHeader}>
                <Text>Lengte</Text>
                <Text>{heights[0]} - {heights[1]}</Text>
            </View>
            <View style={s.sliderWrapper}>
                <MultiSlider
                    customMarker={SliderMarkerWhite}
                    selectedStyle={s.track}

                    sliderLength={deviceWidth - mx * 2 - 30}
                    values={[heights[0], heights[1]]} min={150} max={250}
                    onValuesChange={(output) => { setHeights(output) }} />
            </View>
        </>
    )
}

const DistanceSlider = (p) => {

    const [distance, setDistance] = useState(250);

    const sendData = (data) => {
        p.getData(data);
    }

    useEffect(() => {
        sendData({ distance: distance })
    }, [distance]);

    return (
        <>
            <View style={s.sliderHeader}>
                <Text>Afstand</Text>
                <Text>{distance}km</Text>
            </View>
            <View style={s.sliderWrapper}>
                <MultiSlider
                    customMarker={SliderMarkerWhite}
                    selectedStyle={s.track}

                    sliderLength={deviceWidth - mx * 2 - 30}
                    values={distance[0]} min={0} max={250}
                    step={1} onValuesChange={(output) => { setDistance(output) }} />
            </View>
        </>
    )
}

const s = StyleSheet.create({

    questionContainer: {
        marginTop: 15,
        paddingVertical: 15,
        borderColor: up4meColours.lineGray,
        borderTopWidth: 1,
    },


    questionHeader: {
        fontSize: 20,
        marginBottom: 10
    },

    donmai: {
        textDecorationLine: "underline",
    },

    prefGenderButton: {
        // color: 'black',

    },

    prefGenderGrad: {
        borderRadius: 50,
        paddingVertical: 20,
        width: ((deviceWidth - (mx * 2)) / 3),
        alignItems: "center",

    },

    prefGenderButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: up4meColours.picGray,
        borderRadius: 50,
    },

    sliderWrapper: {
        alignItems: "center"
    },

    sliderHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    track: {
        backgroundColor: up4meColours.gradPink,
    }

});

export default Filters;

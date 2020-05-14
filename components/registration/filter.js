
import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';

import {
    StyleSheet,
    ScrollView,
    Text,
    View,
} from 'react-native';

import FilterRadioButton from './filterRadiobtn';
import Logo from '../logo';
import BigButton from '../bigbutton';

import MultiSlider from '@ptomasroos/react-native-multi-slider';

import { gs, up4meColours, deviceWidth, mx } from '../../globals';

import { endpointSetCriteria, endpointSetProfile } from '../../endpoints';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import SliderMarker from '../sliderMarker';
import LinearGradient from 'react-native-linear-gradient';
import { debugMode } from '../../debugmode';
import Nav from '../nav';

const Filters = ({ route }) => {

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

    const postData = () => {
        Axios.post(endpointSetCriteria,
            {
                userid: global.registData.userid,
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

        Axios.post(`${endpointSetProfile}`, {

            userid: global.registData.userid,
            naam: global.registData.name,
            geboortedatum: global.registData.bday,
            lengte: global.registData.height * 100,
            beroep: global.registData.job,
            woontin: global.registData.placeName,
            geslacht: global.registData.gender,
            profiletext: global.registData.profileDescription,

        })

        console.log('saved data: ', global.registData);
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

    console.log(route);

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
                        <BigButton component={"MatchScreenInitial"} text="opslaan"
                            callBack={postData} />
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
                    sliderLength={deviceWidth - mx * 2 - 20}
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
                    sliderLength={deviceWidth - mx * 2 - 20}
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
                    sliderLength={deviceWidth - mx * 2 - 20}
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
    }

});

export default Filters;

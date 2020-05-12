
import React, { useState } from 'react';
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
import Slider from '@react-native-community/slider';

import { gs, apiUrl, pallette, deviceWidth, mx } from '../../globals';

import { endpointSetCriteria } from '../../endpoints';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import SliderMarker from '../sliderMarker';
import LinearGradient from 'react-native-linear-gradient';

const Filters = ({ navigation }) => {

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

    const [heights, setHeights] = useState([150, 250]);
    const [ages, setAges] = useState([18, 120]);
    const [prefGender, setPrefGender] = useState(4);
    const [distance, setDistance] = useState(1);

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
                minlengte: heights[0],
                maxlengte: heights[1],
                leeftijdmin: ages[0],
                leeftijdmax: ages[1],
                geslacht: prefGender,
                afstand: distance,
            })
            .then((res) => {
                console.log('success', res);
            })
            .catch((err) => {
                console.log('error', err);
            })

        global.registData.userCriteria = selections;
        global.registData.minheight = heights[0];
        global.registData.maxheight = heights[1];
        global.registData.minage = ages[0];
        global.registData.maxage = ages[1];
        global.registData.prefGender = prefGender;
        global.registData.distance = distance;
        console.log('saved data: ', global.registData);
    }


    const handlePrefGenderChange = (id) => {
        if (prefGender == id) {
            setPrefGender(4);
        }
        else {
            setPrefGender(id);
        }
    }

    const prefGenderStyle = (id) => {

        return (prefGender == id) ? { color: "white" } : { color: "gray" };
    }

    function prefGenderGrad(id) {
        return (prefGender == id) ? [pallette[0], pallette[1]] : ['#fffff000', '#fffff000'];
    }


    return (
        <>
            <ScrollView style={gs.screenWrapperScroll}>

                <Logo />
                <Text style={[s.questionHeader]}>Geïnteresseerd in</Text>

                {/* <Text>{prefGender}</Text> */}

                <View style={s.prefGenderButtonContainer}>
                    {
                        ['Mannen', 'Vrouwen', 'Iedereen'].map((gender, i) => {

                            return (
                                < TouchableWithoutFeedback
                                    onPress={() => handlePrefGenderChange(i + 1)}
                                >
                                    <LinearGradient style={[s.prefGenderGrad]} colors={prefGenderGrad(i + 1)}>
                                        <Text style={[prefGenderStyle(i + 1), s.prefGenderButton]}>{gender}</Text>
                                    </LinearGradient>

                                </TouchableWithoutFeedback>
                            )
                        })
                    }
                </View>


                <Text>{ages[0]} - {ages[1]}</Text>
                <MultiSlider customMarker={SliderMarker}
                    values={[ages[0], ages[1]]} min={18} max={120}
                    onValuesChange={(ages) => { setAges(ages) }} />

                <Text>{distance}km</Text>
                {/* <Slider value={distance} minimumValue={0} maximumValue={250} step={1}
                    onValueChange={(dist) => { setDistance(dist) }} /> */}

                <MultiSlider customMarker={SliderMarker}
                    values={distance[0]} min={0} max={250}
                    step={1} onValuesChange={(dist) => { setDistance(dist) }} />




                <Text>{heights[0]} - {heights[1]}</Text>
                <MultiSlider values={[heights[0], heights[1]]} min={150} max={250}
                    onValuesChange={(heights) => { setHeights(heights) }} />





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

                <View style={[s.questionContainer]}>
                    <View style={gs.bottom}>
                        <BigButton n={navigation} component={"MatchCatalog"} text="opslaan"
                            callBack={postData} />
                    </View>
                </View>

            </ScrollView>
        </>

    );
};

const s = StyleSheet.create({

    questionContainer: {
        marginTop: 15,
        paddingVertical: 15,
        borderColor: "gray",
        borderTopWidth: 1,
    },
    questionContainer1: {
        marginTop: 15,
        paddingVertical: 15,
        borderColor: "gray",
        borderBottomWidth: 1,
        marginBottom: 15,
    },

    questionHeader: {
        fontSize: 20,
        marginBottom: 10
    },

    donmai: {
        textDecorationLine: "underline",
    },

    prefGenderButton: {

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
        backgroundColor: "white",
        borderRadius: 50,
    },

});

export default Filters;

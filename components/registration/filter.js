
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

import MultiSlider from '@ptomasroos/react-native-multi-slider'

import { gs, apiUrl } from '../../globals';

import moment from 'moment';
import { endpointSetCriteria } from '../../endpoints';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const Filters = ({ route, navigation }) => {

    const [data] = useState(route.params);
    const [selections, setSelections] = useState(
        {

            prefsport: 4,
            prefparty: 4,
            prefsmoking: 4,
            prefalcohol: 4,
            prefpolitics: 4,
            prefwork: 4,
            prefkids: 4,
            prefkidWish: 4,
            preffood: 4
        }
    );

    const [heights, setHeights] = useState([150, 250]);
    const [ages, setAges] = useState([18, 120]);

    const [formFilled, setFormFilled] = useState(false);

    const [prefGender, setPrefGender] = useState(4);

    const getSelections = (selection) => {

        setSelections(Object.assign(selections, selection));
        console.log(selections, 'keys: ', (Object.keys(selections).length));

        if ((Object.keys(selections).length == 9)) {
            setFormFilled(true);
        }
    }

    const postData = () => {
        Axios.post(endpointSetCriteria,
            {
                userid: data.userid,
                sport: selections.prefsport,
                feesten: selections.prefparty,
                roken: selections.prefsmoking,
                alcohol: selections.prefalcohol,
                stemmen: selections.prefpolitics,
                werken: selections.prefwork,
                kinderen: selections.prefkids,
                kinderwens: selections.prefkidWish,
                eten: selections.preffood,
                minlengte: heights[0],
                maxlengte: heights[1],
                leeftijdmin: ages[0],
                leeftijdmax: ages[1],
                geslacht: prefGender,

            })
            .then((res) => {
                console.log('success', res);
            })
            .catch((err) => {
                console.log('error', err);
            })
    }


    // const convertAge = (age) => {

    //     let now = moment();

    //     let then = moment().subtract(18, 'years');



    // }


    const handlePrefGenderChange = (id) => {
        if (prefGender == id) {
            setPrefGender(4);
        }
        else {
            setPrefGender(id);
        }
    }

    const prefGenderStyle = (id) => {

        if (prefGender == id) {

            return {
                color: 'red',
            }
        }
        else {
            return {
                color: 'blue',
            }
        }
    }

    return (
        <>
            <ScrollView style={gs.screenWrapperScroll}>

                <Logo />
                <Text style={[s.questionHeader]}>Geïnteresseerd in</Text>

                <Text>{prefGender}</Text>

                {
                    ['Mannen', 'Vrouwen', 'Iedereen'].map((gender, i) => {

                        return (
                            <TouchableWithoutFeedback
                                onPress={() => handlePrefGenderChange(i + 1)}
                            >
                                <Text style={[prefGenderStyle(i + 1)]}>{gender}</Text>
                            </TouchableWithoutFeedback>
                        )

                    })
                }


                <Text>{heights[0]} - {heights[1]}</Text>
                <MultiSlider values={[150, 250]} min={150} max={250}
                    onValuesChange={(heights) => { setHeights(heights) }} />

                <Text>{ages[0]} - {ages[1]}</Text>
                <MultiSlider values={[18, 120]} min={18} max={120}
                    onValuesChange={(ages) => { setAges(ages) }} />

                <View style={[s.questionContainer]}>
                    <Text style={[s.questionHeader]}>Sport je?</Text>
                    <FilterRadioButton btnText={[
                        "Ja",
                        "Af en toe",
                        "Nee"
                    ]} selectKey={'prefsport'} value={data.prefsport} getSelections={getSelections} />
                </View>


                <View style={[s.questionContainer]}>
                    <Text style={[s.questionHeader]}>Feest je?</Text>
                    <FilterRadioButton btnText={[
                        "Ja",
                        "Af en toe",
                        "Nee"
                    ]} selectKey={'prefparty'} value={data.prefparty} getSelections={getSelections} />
                </View>


                <View style={[s.questionContainer]}>
                    <Text style={[s.questionHeader]}>Rook je?</Text>
                    <FilterRadioButton btnText={[
                        "Ja",
                        "Af en toe",
                        "Nee"
                    ]} selectKey={'prefsmoking'} value={data.prefsmoking} getSelections={getSelections} />
                </View>


                <View style={[s.questionContainer]}>
                    <Text style={[s.questionHeader]}>Drink je alcohol?</Text>
                    <FilterRadioButton btnText={[
                        "Ja",
                        "Af en toe",
                        "Nee"
                    ]} selectKey={'prefalcohol'} value={data.prefalcohol} getSelections={getSelections} />
                </View>

                <View style={[s.questionContainer]}>
                    <Text style={[s.questionHeader]}>Wat stem je?</Text>
                    <FilterRadioButton btnText={[
                        "Links",
                        "Midden",
                        "Rechts",
                        "Niet"
                    ]} selectKey={'prefpolitics'} value={data.prefpolitics} getSelections={getSelections} />
                </View>

                <View style={[s.questionContainer]}>
                    <Text style={[s.questionHeader]}>Hoe veel uur per week werk je?</Text>
                    <FilterRadioButton btnText={[
                        "< 40 uur",
                        "40 uur",
                        "> 40 uur"
                    ]} selectKey={'prefwork'} value={data.prefwork} getSelections={getSelections} />
                </View>

                <View style={[s.questionContainer]}>
                    <Text style={[s.questionHeader]}>Eet je gezond?</Text>
                    <FilterRadioButton btnText={[
                        "Ja",
                        "Af en toe",
                        "Nee"
                    ]} selectKey={'preffood'} value={data.preffood} getSelections={getSelections} />
                </View>

                <View style={[s.questionContainer]}>
                    <Text style={[s.questionHeader]}>Heb je kinderen?</Text>
                    <FilterRadioButton btnText={[
                        "Ja",
                        "Nee"
                    ]} selectKey={'prefkids'} value={data.prefkids} getSelections={getSelections} />
                </View>

                <View style={[s.questionContainer]}>
                    <Text style={[s.questionHeader]}>wil je kinderen?</Text>
                    <FilterRadioButton btnText={[
                        "Ja",
                        "Mischien",
                        "Nee"
                    ]} selectKey={'prefkidWish'} value={data.prefkidWish} getSelections={getSelections} />
                </View>

                <View style={[s.questionContainer]}>
                    <View style={gs.bottom}>
                        <BigButton n={navigation} component={"MatchCatalog"} text="opslaan"
                            disabled={!(formFilled)}
                            data={Object.assign(data, selections)}
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

    questionHeader: {
        fontSize: 20,
        marginBottom: 10
    },

});

export default Filters;

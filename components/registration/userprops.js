
import React, { useState } from 'react';
import Axios from 'axios';

import {
    StyleSheet,
    ScrollView,
    Text,
    View,
} from 'react-native';

import UserPropsRadioButton from './userpropsRadiobtn';
import Logo from '../logo';
import BigButton from '../bigbutton';

import { gs, up4meColours } from '../../globals';
import { endpointSetProperties } from '../../endpoints';

const UserProps = ({ navigation }) => {

    const [selections, setSelections] = useState(
        {
            sport: 0,
            party: 0,
            smoking: 0,
            alcohol: 0,
            politics: 0,
            work: 0,
            kids: 0,
            kidWish: 0,
            food: 0
        }
    );

    if (global.registData.userProperties == null) {
        global.registData.userProperties = selections;
    }

    const getSelections = (selection) => {

        setSelections(Object.assign(selections, selection));
        console.log('Selections', selections, 'Amount of keys', (Object.keys(selections).length));
    }

    const postData = () => {
        Axios.post(endpointSetProperties,
            {
                userid: global.registData.userid,
                sport: selections.sport,
                feesten: selections.party,
                roken: selections.smoking,
                alcohol: selections.alcohol,
                stemmen: selections.politics,
                werken: selections.work,
                kinderen: selections.kids,
                kinderwens: selections.kidWish,
                eten: selections.food

            })
            .then((res) => {
                console.log('success', res);
            })
            .catch((err) => {
                console.log('error', err);
            })

        global.registData.userProperties = selections;
        console.log('saved data: ', global.registData);
    }

    return (
        <View style={[gs.body]}>
            <ScrollView style={gs.screenWrapperScroll}>

                <Logo />
                <Text style={[s.header, gs.mainHeader]}>Eigenschappen</Text>
                <Text style={[s.summary]}>Hoe meer informatie je invult, hoe groter de kans op een match. Je potentiele matchen kunnen hier op filteren.</Text>

                <View style={[s.questionContainer]}>
                    <Text style={[s.questionHeader]}>Sport je?</Text>
                    <UserPropsRadioButton btnText={[
                        "Ja",
                        "Af en toe",
                        "Nee"
                    ]} selectKey={'sport'} value={global.registData.userProperties.sport} getSelections={getSelections} />
                </View>


                <View style={[s.questionContainer]}>
                    <Text style={[s.questionHeader]}>Feest je?</Text>
                    <UserPropsRadioButton btnText={[
                        "Ja",
                        "Af en toe",
                        "Nee"
                    ]} selectKey={'party'} value={global.registData.userProperties.party} getSelections={getSelections} />
                </View>


                <View style={[s.questionContainer]}>
                    <Text style={[s.questionHeader]}>Rook je?</Text>
                    <UserPropsRadioButton btnText={[
                        "Ja",
                        "Af en toe",
                        "Nee"
                    ]} selectKey={'smoking'} value={global.registData.userProperties.smoking} getSelections={getSelections} />
                </View>


                <View style={[s.questionContainer]}>
                    <Text style={[s.questionHeader]}>Drink je alcohol?</Text>
                    <UserPropsRadioButton btnText={[
                        "Ja",
                        "Af en toe",
                        "Nee"
                    ]} selectKey={'alcohol'} value={global.registData.userProperties.alcohol} getSelections={getSelections} />
                </View>

                <View style={[s.questionContainer]}>
                    <Text style={[s.questionHeader]}>Wat stem je?</Text>
                    <UserPropsRadioButton btnText={[
                        "Links",
                        "Midden",
                        "Rechts",
                        "Niet"
                    ]} selectKey={'politics'} value={global.registData.userProperties.politics} getSelections={getSelections} />
                </View>

                <View style={[s.questionContainer]}>
                    <Text style={[s.questionHeader]}>Hoe veel uur per week werk je?</Text>
                    <UserPropsRadioButton btnText={[
                        "< 40 uur",
                        "40 uur",
                        "> 40 uur"
                    ]} selectKey={'work'} value={global.registData.userProperties.work} getSelections={getSelections} />
                </View>

                <View style={[s.questionContainer]}>
                    <Text style={[s.questionHeader]}>Eet je gezond?</Text>
                    <UserPropsRadioButton btnText={[
                        "Ja",
                        "Af en toe",
                        "Nee"
                    ]} selectKey={'food'} value={global.registData.userProperties.food} getSelections={getSelections} />
                </View>

                <View style={[s.questionContainer]}>
                    <Text style={[s.questionHeader]}>Heb je kinderen?</Text>
                    <UserPropsRadioButton btnText={[
                        "Ja",
                        "Nee"
                    ]} selectKey={'kids'} value={global.registData.userProperties.kids} getSelections={getSelections} />
                </View>

                <View style={[s.questionContainer]}>
                    <Text style={[s.questionHeader]}>wil je kinderen?</Text>
                    <UserPropsRadioButton btnText={[
                        "Ja",
                        "Mischien",
                        "Nee"
                    ]} selectKey={'kidWish'} value={global.registData.userProperties.kidWish} getSelections={getSelections} />
                </View>

                <View style={[s.questionContainer]}>
                    <View style={gs.bottom}>
                        <BigButton component={"Filter"} text="Doorgaan"
                            callBack={postData} />
                    </View>
                </View>

            </ScrollView>
        </View >
    );
};

const s = StyleSheet.create({

    questionContainer: {
        marginTop: 15,
        paddingVertical: 15,
        borderColor: up4meColours.lineGray,
        borderTopWidth: 1,
    },

    questionHeader: {
        fontSize: 20,
        marginBottom: 10,
    },

    summary: {
        color: up4meColours.textGray,
    },



});

export default UserProps;

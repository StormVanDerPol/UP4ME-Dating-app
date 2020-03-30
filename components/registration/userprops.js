
import React, { Component } from 'react';

import {
    StyleSheet, ScrollView, Text, View,
} from 'react-native';
import UserPropsRadioButton from './userpropsRadiobtn';
import Logo from '../logo';
import { gs } from '../../globals';
import BigButton from '../bigbutton';

class UserProps extends Component {

    render() {
        return (
            <>
                <ScrollView style={gs.screenWrapperScroll}>

                    <Logo />
                    <Text style={[s.header, gs.mainHeader]}>Eigenschappen</Text>
                    <Text>Hoe meer informatie je invult, hoe groter de kans op een match. Je potentiele matchen kunnen hier op filteren</Text>

                    <View style={[s.questionContainer]}>
                        <Text style={[s.questionHeader]}>Sport je?</Text>
                        <UserPropsRadioButton btnText={[
                            "Ja",
                            "Af en toe",
                            "Nee"
                        ]} />
                    </View>


                    <View style={[s.questionContainer]}>
                        <Text style={[s.questionHeader]}>Feest je?</Text>
                        <UserPropsRadioButton btnText={[
                            "Ja",
                            "Af en toe",
                            "Nee"
                        ]} />
                    </View>


                    <View style={[s.questionContainer]}>
                        <Text style={[s.questionHeader]}>Rook je?</Text>
                        <UserPropsRadioButton btnText={[
                            "Ja",
                            "Af en toe",
                            "Nee"
                        ]} />
                    </View>


                    <View style={[s.questionContainer]}>
                        <Text style={[s.questionHeader]}>Drink je alcohol?</Text>
                        <UserPropsRadioButton btnText={[
                            "Ja",
                            "Af en toe",
                            "Nee"
                        ]} />
                    </View>

                    <View style={[s.questionContainer]}>
                        <Text style={[s.questionHeader]}>Wat stem je?</Text>
                        <UserPropsRadioButton btnText={[
                            "Links",
                            "Midden",
                            "Rechts"
                        ]} />
                    </View>

                    <View style={[s.questionContainer]}>
                        <Text style={[s.questionHeader]}>Hoe veel uur per week werk je?</Text>
                        <UserPropsRadioButton btnText={[
                            "< 40 uur",
                            "40 uur",
                            "> 40 uur"
                        ]} />
                    </View>

                    <View style={[s.questionContainer]}>
                        <Text style={[s.questionHeader]}>Eet je gezond?</Text>
                        <UserPropsRadioButton btnText={[
                            "Ja",
                            "Af en toe",
                            "Nee"
                        ]} />
                    </View>

                    <View style={[s.questionContainer]}>
                        <Text style={[s.questionHeader]}>Heb je kinderen?</Text>
                        <UserPropsRadioButton btnText={[
                            "Ja",
                            "Nee"
                        ]} />
                    </View>

                    <View style={[s.questionContainer]}>
                        <Text style={[s.questionHeader]}>wil je kinderen?</Text>
                        <UserPropsRadioButton btnText={[
                            "Ja",
                            "Mischien",
                            "Nee"
                        ]} />
                    </View>

                    <View style={[s.questionContainer]}>
                        <View style={gs.bottom}>
                            <BigButton text="opslaan" />
                        </View>
                    </View>

                </ScrollView>
            </>
        );
    }
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

export default UserProps;

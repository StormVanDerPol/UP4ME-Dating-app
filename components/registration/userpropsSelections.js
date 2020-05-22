
import React, { useState, useEffect } from 'react';

import {
    StyleSheet, View, Text,
} from 'react-native';
import UserPropsRadioButton from './userpropsRadiobtn';
import { up4meColours } from '../../globals';

const UserPropsSelections = (p) => {

    const [selections, setSelections] = useState(p.initSelections);

    const getSelections = (selection) => {

        setSelections(Object.assign(selections, selection));
        console.log('Selections', selections, 'Amount of keys', (Object.keys(selections).length));
    }

    useEffect(() => {
        sendSelections();
    }, [selections])

    const sendSelections = () => {
        p.getSelections(selections)
    }

    return (
        <>
            <View style={[s.questionContainer]}>
                <Text style={[s.questionHeader]}>Sport je?</Text>
                <UserPropsRadioButton btnText={[
                    "Ja",
                    "Af en toe",
                    "Nee"
                ]} selectKey={'sport'} value={selections.sport} getSelections={getSelections} />
            </View>


            <View style={[s.questionContainer]}>
                <Text style={[s.questionHeader]}>Feest je?</Text>
                <UserPropsRadioButton btnText={[
                    "Ja",
                    "Af en toe",
                    "Nee"
                ]} selectKey={'party'} value={selections.party} getSelections={getSelections} />
            </View>


            <View style={[s.questionContainer]}>
                <Text style={[s.questionHeader]}>Rook je?</Text>
                <UserPropsRadioButton btnText={[
                    "Ja",
                    "Af en toe",
                    "Nee"
                ]} selectKey={'smoking'} value={selections.smoking} getSelections={getSelections} />
            </View>


            <View style={[s.questionContainer]}>
                <Text style={[s.questionHeader]}>Drink je alcohol?</Text>
                <UserPropsRadioButton btnText={[
                    "Ja",
                    "Af en toe",
                    "Nee"
                ]} selectKey={'alcohol'} value={selections.alcohol} getSelections={getSelections} />
            </View>

            <View style={[s.questionContainer]}>
                <Text style={[s.questionHeader]}>Wat stem je?</Text>
                <UserPropsRadioButton btnText={[
                    "Links",
                    "Midden",
                    "Rechts",
                    "Niet"
                ]} selectKey={'politics'} value={selections.politics} getSelections={getSelections} />
            </View>

            <View style={[s.questionContainer]}>
                <Text style={[s.questionHeader]}>Hoe veel uur per week werk je?</Text>
                <UserPropsRadioButton btnText={[
                    "< 40 uur",
                    "40 uur",
                    "> 40 uur"
                ]} selectKey={'work'} value={selections.work} getSelections={getSelections} />
            </View>

            <View style={[s.questionContainer]}>
                <Text style={[s.questionHeader]}>Eet je gezond?</Text>
                <UserPropsRadioButton btnText={[
                    "Ja",
                    "Af en toe",
                    "Nee"
                ]} selectKey={'food'} value={selections.food} getSelections={getSelections} />
            </View>

            <View style={[s.questionContainer]}>
                <Text style={[s.questionHeader]}>Heb je kinderen?</Text>
                <UserPropsRadioButton btnText={[
                    "Ja",
                    "Nee"
                ]} selectKey={'kids'} value={selections.kids} getSelections={getSelections} />
            </View>

            <View style={[s.questionContainer]}>
                <Text style={[s.questionHeader]}>wil je kinderen?</Text>
                <UserPropsRadioButton btnText={[
                    "Ja",
                    "Mischien",
                    "Nee"
                ]} selectKey={'kidWish'} value={selections.kidWish} getSelections={getSelections} />
            </View>
        </>
    );
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
        marginBottom: 10,
    },
});

export default UserPropsSelections;




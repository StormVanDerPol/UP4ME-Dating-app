
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

import { gs, apiUrl } from '../../globals';

const UserProps = ({ route, navigation }) => {

    // const[prevRoute] = useState(navigation.dangerouslyGetState().routes[navigation.dangerouslyGetState().routes.length].name)

    const [data] = useState(route.params);
    const [selections, setSelections] = useState({});
    const [formFilled, setFormFilled] = useState(false);

    const getSelections = (selection) => {

        setSelections(Object.assign(selections, selection));
        console.log(selections, 'keys: ', (Object.keys(selections).length));

        if ((Object.keys(selections).length == 9)) {
            setFormFilled(true);
        }
    }

    const postRegistration = () => {
        Axios.post(`${apiUrl}/test`)
            .then((res) => {
                console.log('success', res);
            })
            .catch((err) => {
                console.log('error', err);
            })
    }

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
                    ]} selectKey={'sport'} value={data.sport} getSelections={getSelections} />
                </View>


                <View style={[s.questionContainer]}>
                    <Text style={[s.questionHeader]}>Feest je?</Text>
                    <UserPropsRadioButton btnText={[
                        "Ja",
                        "Af en toe",
                        "Nee"
                    ]} selectKey={'party'} value={data.party} getSelections={getSelections} />
                </View>


                <View style={[s.questionContainer]}>
                    <Text style={[s.questionHeader]}>Rook je?</Text>
                    <UserPropsRadioButton btnText={[
                        "Ja",
                        "Af en toe",
                        "Nee"
                    ]} selectKey={'smoking'} value={data.smoking} getSelections={getSelections} />
                </View>


                <View style={[s.questionContainer]}>
                    <Text style={[s.questionHeader]}>Drink je alcohol?</Text>
                    <UserPropsRadioButton btnText={[
                        "Ja",
                        "Af en toe",
                        "Nee"
                    ]} selectKey={'alcohol'} value={data.alcohol} getSelections={getSelections} />
                </View>

                <View style={[s.questionContainer]}>
                    <Text style={[s.questionHeader]}>Wat stem je?</Text>
                    <UserPropsRadioButton btnText={[
                        "Links",
                        "Midden",
                        "Rechts"
                    ]} selectKey={'politics'} value={data.politics} getSelections={getSelections} />
                </View>

                <View style={[s.questionContainer]}>
                    <Text style={[s.questionHeader]}>Hoe veel uur per week werk je?</Text>
                    <UserPropsRadioButton btnText={[
                        "< 40 uur",
                        "40 uur",
                        "> 40 uur"
                    ]} selectKey={'work'} value={data.work} getSelections={getSelections} />
                </View>

                <View style={[s.questionContainer]}>
                    <Text style={[s.questionHeader]}>Eet je gezond?</Text>
                    <UserPropsRadioButton btnText={[
                        "Ja",
                        "Af en toe",
                        "Nee"
                    ]} selectKey={'food'} value={data.food} getSelections={getSelections} />
                </View>

                <View style={[s.questionContainer]}>
                    <Text style={[s.questionHeader]}>Heb je kinderen?</Text>
                    <UserPropsRadioButton btnText={[
                        "Ja",
                        "Nee"
                    ]} selectKey={'kids'} value={data.kids} getSelections={getSelections} />
                </View>

                <View style={[s.questionContainer]}>
                    <Text style={[s.questionHeader]}>wil je kinderen?</Text>
                    <UserPropsRadioButton btnText={[
                        "Ja",
                        "Mischien",
                        "Nee"
                    ]} selectKey={'kidWish'} value={data.kidWish} getSelections={getSelections} />
                </View>

                <View style={[s.questionContainer]}>
                    <View style={gs.bottom}>
                        <BigButton n={navigation} component={"ProfileText"} text="opslaan"
                            disabled={!(formFilled)}
                            data={Object.assign(data, selections)}
                            callBack={postRegistration} />
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

export default UserProps;

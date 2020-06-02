import React, { useState } from 'react';
// import { Icon } from 'react-native-elements'
import { gs } from '../../globals';



import {
    StyleSheet, Text, View,
} from 'react-native';
import { TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import BigButton from '../bigbutton';
import RNSVG_filter_colour from '../../res/ui/rnsvg/nav/rnsvg_filter_colour';
import TopButton from '../topButton';
// import Gender from '../registration/gender';
// import UserData from '../registration/userdata';

const UserSettings = ({ navigation }) => {

    const [selected, setSelected] = useState(0);
    const [dropdownElements, setDropdownElements] = useState([]);

    const changeDropdown = (id, elements) => {

        if (id == selected) {
            dropdownElements[id] = (<></>);
            setDropdownElements([...dropdownElements]);
            setSelected(0);
        }
        else {
            dropdownElements[id] = elements;
            setDropdownElements([...dropdownElements]);
            setSelected(id)
        }
    }

    return (
        <>
            <ScrollView>

                <TopButton header={'Instellingen'} route={'UserProfile'} />

                <View style={[s.underb]}>
                    <TouchableWithoutFeedback onPress={() => {
                        changeDropdown(1, (
                            <>
                                <TouchableOpacity component="Gender">
                                    <Text>Geslacht________whatever></Text>
                                </TouchableOpacity>

                                {/* <Gender /> */}
                            </>
                        ));
                    }}>
                        <Text style={[s.fonty]}>Mijn gegevens</Text>
                    </TouchableWithoutFeedback>
                    {dropdownElements[1]}
                </View>

                <View style={[s.underb]}>
                    <TouchableWithoutFeedback onPress={() => {
                        changeDropdown(2, (
                            <Text>wowoowow</Text>
                        ));
                    }}>
                        <Text style={[s.fonty]}>Meldingen</Text>
                    </TouchableWithoutFeedback>
                    {dropdownElements[2]}
                </View>

                <View style={[s.underb]}>
                    <TouchableWithoutFeedback onPress={() => {
                        changeDropdown(3, (
                            <>
                                <Text style={[s.pt]} onPress={() => navigation.navigate('Agreement')}>Voorwaarden</Text>
                                <Text style={[s.pt]} onPress={() => navigation.navigate('PrivacyPolicy')}>Privacybeleid</Text>
                                <Text style={[s.pt]} onPress={() => navigation.navigate('CookiePolicy')}>Cookiebeleid</Text>
                            </>
                        ));
                    }}>
                        <Text style={[s.fonty]}>Voorwaarden en Privacy</Text>
                    </TouchableWithoutFeedback>
                    {dropdownElements[3]}
                </View>

                <View style={[s.underb]}>
                    <TouchableWithoutFeedback onPress={() => {
                        changeDropdown(4, (
                            <Text onPress={() => navigation.navigate('FQA')}>help</Text>
                        ));
                    }}>
                        <Text style={[s.fonty]}>Help and FAQ</Text>
                    </TouchableWithoutFeedback>
                    {dropdownElements[4]}
                </View>

                <View style={[s.underb]}>
                    <TouchableWithoutFeedback onPress={() => {
                        changeDropdown(5, (
                            <>
                                <Text>bro deze shit is leeg in de prototype wtf</Text>

                            </>

                        ));
                    }}>
                        <Text style={[s.fonty]}>Richtlijnen and veiligheid</Text>
                    </TouchableWithoutFeedback>
                    {dropdownElements[5]}
                </View>

                <View style={[s.underb]}>
                    <TouchableWithoutFeedback onPress={() => {
                        changeDropdown(6, (
                            <Text>fuck deze kk shit</Text>
                        ));
                    }}>
                        <Text style={[s.fonty]}>uitloggen</Text>
                    </TouchableWithoutFeedback>
                    {dropdownElements[6]}
                </View>

                <View style={[s.underb]}>
                    <TouchableWithoutFeedback onPress={() => {
                        changeDropdown(7, (
                            <View>
                                <Text>tuurlijk niet</Text>
                                <Text>open 3 buttons also make the whole screen gray</Text>
                            </View>

                        ));
                    }}>
                        <Text style={[s.fonty]}>Account verwijderen</Text>
                    </TouchableWithoutFeedback>
                    {dropdownElements[7]}
                </View>

                <BigButton
                    text="opslaan"
                // component="Pfinstellingen" bestaat nog niet

                />
            </ScrollView>
        </>
    );
}

const s = StyleSheet.create({
    underb: {
        padding: 15,
        paddingLeft: 25,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    fonty: {
        fontSize: 20,
    },
    pt: {
        textDecorationLine: 'underline',
        margin: 15,
        fontSize: 15,

    },
});

export default UserSettings;
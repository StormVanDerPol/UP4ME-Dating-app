import React, { useState } from 'react';

import {
    StyleSheet, Text, View,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
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
            <TouchableWithoutFeedback style={[s.underb]} onPress={() => navigation.goBack()}>
                <Text>Instellingen</Text>
            </TouchableWithoutFeedback>

            <View style={[s.underb]}>
                <TouchableWithoutFeedback onPress={() => {
                    changeDropdown(1, (
                        <>
                            <Text>This shall be copie pasta</Text>
                            <Text>This shall be copie pasta</Text>
                            <Text>This shall be copie pasta</Text>
                            <Text>This shall be copie pasta</Text>
                            <Text>This shall be copie pasta</Text>
                        </>
                    ));
                }}>
                    <Text>Mijn gegevens</Text>
                </TouchableWithoutFeedback>
                {dropdownElements[1]}
            </View>

            <View style={[s.underb]}>
                <TouchableWithoutFeedback onPress={() => {
                    changeDropdown(2, (
                        <Text>wowoowow</Text>
                    ));
                }}>
                    <Text>Meldingen</Text>
                </TouchableWithoutFeedback>
                {dropdownElements[2]}
            </View>

            <View style={[s.underb]}>
                <TouchableWithoutFeedback onPress={() => {
                    changeDropdown(3, (
                        <Text>Voorwaarden</Text>
                    ));
                }}>
                    <Text>Voorwaarden en Privacy</Text>
                </TouchableWithoutFeedback>
                {dropdownElements[3]}
            </View>

        </>
    );
}

const s = StyleSheet.create({
    underb: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',

    },
});

export default UserSettings;
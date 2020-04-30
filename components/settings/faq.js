import React, { useState } from 'react';
import { gs } from '../../globals';


import {
    StyleSheet,
    Text,
    View,

} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


const Faq = ({ navigation }) => {

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
                {/* <Icon name='keyboard_arrow_left' /> */}
                <Text style={[gs.topText]}>FAQ</Text>
            </TouchableWithoutFeedback>

            <View style={[s.underb]}>
                <TouchableWithoutFeedback onPress={() => {
                    changeDropdown(1, (
                        <>
                            <Text>Antwoord op vraag vraag. Wanneer je op het antwoord of op een andere vraag klikt, klapt het antwoord van deze vraag weer in zodat je scherm niet te vol met tekst wordt.</Text>
                        </>
                    ));
                }}>
                    <Text>Voor wie is Up4me?</Text>
                </TouchableWithoutFeedback>
                {dropdownElements[1]}
            </View>

            <View style={s.end}>
                <Text>Heb je een andere vraag of een tip voor ons? Neem gerust contact met ons op!</Text>

            </View>
            <View style={s.info}>
                <Text>icoon info@uptodates.nl</Text>
                <Text>icoon 0653118231</Text>
            </View>

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
    end: {
        padding: 20,
    },
    info: {
        padding: 20,
        paddingTop: 5,
    },

});

export default Faq;
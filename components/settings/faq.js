import React, { useState } from 'react';
import { gs } from '../../globals';


import {
    StyleSheet,
    Text,
    View,

} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import TopButton from '../topButton';


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
        <View style={gs.body}>

            <TopButton header={'FAQ'} route={'UserSettings'} />

            <View style={[s.underb]}>
                <TouchableWithoutFeedback onPress={() => {
                    changeDropdown(1, (
                        <>
                            <Text>Up4me is een datingapp voor singles die opzoek zijn naar iets serieus. Dat vind je door op een leuke maar efficiënte manier op date te gaan en mensen te leren kennen. Bij Up4me kun je daarom niet chatten maar plan je na de match meteen een date in bij een van de aangesloten locaties. </Text>
                        </>
                    ));
                }}>
                    <Text>Wat is Up4me?</Text>
                </TouchableWithoutFeedback>
                {dropdownElements[1]}
            </View>

            <View style={[s.underb]}>
                <TouchableWithoutFeedback onPress={() => {
                    changeDropdown(2, (
                        <>
                            <Text>Up4me is voor singles die opzoek zijn naar een vaste partner, omdat ze er aan toe zijn om te settelen en een toekomst met iemand op te bouwen, en voor mensen die op een leuke en efficiënte manier willen daten. Up4me is niet bedoeld voor mensen die opzoek zijn naar iets casuals.</Text>
                        </>
                    ));
                }}>
                    <Text>Voor wie is Up4me?</Text>
                </TouchableWithoutFeedback>
                {dropdownElements[2]}
            </View>

            <View style={s.end}>
                <Text>Heb je een andere vraag of een tip voor ons? Neem gerust contact met ons op!</Text>

            </View>
            <View style={s.info}>
                <Text>icoon info@uptodates.nl</Text>
                <Text>icoon 0653118231</Text>
            </View>

        </View>
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
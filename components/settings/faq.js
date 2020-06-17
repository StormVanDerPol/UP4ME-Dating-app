import React, { useState } from 'react';
import { gs } from '../../globals';


import {
    StyleSheet,
    Text,
    View,

} from 'react-native';
import { TouchableWithoutFeedback, ScrollView } from 'react-native-gesture-handler';
import TopButton from '../topButton';
import RNSVG_phone from '../../res/ui/rnsvg/rnsvg_phone';
import RNSVG_email from '../../res/ui/rnsvg/rnsvg_email';
import RNSVG_arrow_back from '../../res/ui/rnsvg/rnsvg_arrow_back';
import RNSVG_arrow_right from '../../res/ui/rnsvg/rnsvg_arrow_right';
import RNSVG_arrow_down from '../../res/ui/rnsvg/rnsvg_arrow_down';


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


    const DropDownArrow = (id) => {
        if (id == selected) {
            return <RNSVG_arrow_right />
        }
        else {
            return <RNSVG_arrow_down />
        }
    }
    // const changeIcon = (id) => {

    //     if ()
    // }

    return (
        <View style={gs.body}>
            <ScrollView>

                <TopButton header={'Help & FAQ'} route={'UserSettings'} />

                <View style={[s.underb]}>
                    <TouchableWithoutFeedback onPress={() => {
                        changeDropdown(1, (
                            <>
                                <View style={[s.text]}>

                                    <Text>Up4me is een datingapp voor singles die opzoek zijn naar iets serieus. Dat vind je door op een leuke maar efficiënte manier op date te gaan en mensen te leren kennen. Bij Up4me kun je daarom niet chatten maar plan je na de match meteen een date in bij een van de aangesloten locaties. </Text>

                                </View>

                            </>
                        ));
                    }}>
                        <View style={s.flex}>
                            <Text>Wat is Up4me?</Text>
                            <View style={[s.icon,]}>
                                {DropDownArrow(1)}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    {dropdownElements[1]}
                </View>

                <View style={[s.underb]}>
                    <TouchableWithoutFeedback onPress={() => {
                        changeDropdown(2, (
                            <>
                                <View style={[s.text]}>

                                    <Text>hhh</Text>
                                </View>
                            </>
                        ));
                    }}>
                        <Text>Voor wie is Up4me?</Text>
                    </TouchableWithoutFeedback>
                    {dropdownElements[2]}
                </View>

                <View style={[s.underb]}>
                    <TouchableWithoutFeedback onPress={() => {
                        changeDropdown(3, (
                            <>
                                <View style={[s.text]}>

                                    <Text>hhh</Text>
                                </View>
                            </>
                        ));
                    }}>
                        <Text>Hoe gebruik ik Up4me?</Text>
                    </TouchableWithoutFeedback>
                    {dropdownElements[3]}
                </View>

                <View style={[s.underb]}>
                    <TouchableWithoutFeedback onPress={() => {
                        changeDropdown(4, (
                            <>
                                <View style={[s.text]}>

                                    <Text>hhh</Text>
                                </View>
                            </>
                        ));
                    }}>
                        <Text>Hoe maak ik een Up4me account?</Text>
                    </TouchableWithoutFeedback>
                    {dropdownElements[4]}
                </View>

                <View style={[s.underb]}>
                    <TouchableWithoutFeedback onPress={() => {
                        changeDropdown(5, (
                            <>
                                <View style={[s.text]}>

                                    <Text>hhh</Text>
                                </View>
                            </>
                        ));
                    }}>
                        <Text>Hoe wijzig ik mijn profiel?</Text>
                    </TouchableWithoutFeedback>
                    {dropdownElements[5]}
                </View>

                <View style={[s.underb]}>
                    <TouchableWithoutFeedback onPress={() => {
                        changeDropdown(6, (
                            <>
                                <View style={[s.text]}>

                                    <Text>hhh</Text>
                                </View>
                            </>
                        ));
                    }}>
                        <Text>Hoe stel ik mijn voorkeuren in?</Text>
                    </TouchableWithoutFeedback>
                    {dropdownElements[6]}
                </View>

                <View style={[s.underb]}>
                    <TouchableWithoutFeedback onPress={() => {
                        changeDropdown(7, (
                            <>
                                <View style={[s.text]}>

                                    <Text>hhh</Text>
                                </View>
                            </>
                        ));
                    }}>
                        <Text>Hoe plan ik een date in?</Text>
                    </TouchableWithoutFeedback>
                    {dropdownElements[7]}
                </View>

                <View style={[s.underb]}>
                    <TouchableWithoutFeedback onPress={() => {
                        changeDropdown(8, (
                            <>
                                <View style={[s.text]}>

                                    <Text>hhh</Text>
                                </View>
                            </>
                        ));
                    }}>
                        <Text>Hoe kan ik een date wijzigen?</Text>
                    </TouchableWithoutFeedback>
                    {dropdownElements[8]}
                </View>

                <View style={[s.underb]}>
                    <TouchableWithoutFeedback onPress={() => {
                        changeDropdown(9, (
                            <>
                                <View style={[s.text]}>

                                    <Text>hhh</Text>
                                </View>
                            </>
                        ));
                    }}>
                        <Text>Hoe kan ik een date annuleren?</Text>
                    </TouchableWithoutFeedback>
                    {dropdownElements[9]}
                </View>

                <View style={[s.underb]}>
                    <TouchableWithoutFeedback onPress={() => {
                        changeDropdown(10, (
                            <>
                                <View style={[s.text]}>

                                    <Text>hhh</Text>
                                </View>
                            </>
                        ));
                    }}>
                        <Text>Hoe kan ik een match opheffen?</Text>
                    </TouchableWithoutFeedback>
                    {dropdownElements[10]}
                </View>

                <View style={[s.underb]}>
                    <TouchableWithoutFeedback onPress={() => {
                        changeDropdown(11, (
                            <>
                                <View style={[s.text]}>

                                    <Text>hhh</Text>
                                </View>
                            </>
                        ));
                    }}>
                        <Text>Hoe kan ik iemand rapporteren?</Text>
                    </TouchableWithoutFeedback>
                    {dropdownElements[11]}
                </View>

                <View style={[s.underb]}>
                    <TouchableWithoutFeedback onPress={() => {
                        changeDropdown(12, (
                            <>
                                <View style={[s.text]}>

                                    <Text>hhh</Text>
                                </View>
                            </>
                        ));
                    }}>
                        <Text>Hoe kan ik mijn account pauzeren?</Text>
                    </TouchableWithoutFeedback>
                    {dropdownElements[12]}
                </View>

                <View style={[s.underb]}>
                    <TouchableWithoutFeedback onPress={() => {
                        changeDropdown(13, (
                            <>
                                <View style={[s.text]}>

                                    <Text>hhh</Text>
                                </View>
                            </>
                        ));
                    }}>
                        <Text>Hoe kan ik mij account verwijderen?</Text>
                    </TouchableWithoutFeedback>
                    {dropdownElements[13]}
                </View>

                <View style={s.end}>
                    <Text>Heb je een andere vraag of een tip voor ons? Neem gerust contact met ons op!</Text>

                </View>
                <View style={s.info}>
                    <View style={s.flexup}>
                        <View style={s.icon}>
                            <RNSVG_phone />
                        </View>
                        <Text>0653118231</Text>

                    </View>

                    <View style={[s.flexicon, s.pad]}>
                        <View style={s.icon}>
                            <RNSVG_email />
                        </View>
                        <Text>info@upforme.nl</Text>

                    </View>
                </View>
            </ScrollView>
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
    icon: {
        width: 18,
        height: 18,
        marginHorizontal: 10,
    },
    flexicon: {
        flexDirection: 'row',

    },
    flex: {
        flexDirection: 'row',
        // borderWidth: 1,
        // alignSelf: 'flex-end'   
        justifyContent: 'space-between',

    },
    flexup: {
        flexDirection: 'row',

    },

    pad: {
        marginTop: 5,
    },
    text: {
        marginVertical: 10,
    },

});

export default Faq;
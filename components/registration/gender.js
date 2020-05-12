
import React, { useState } from 'react';

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';

import { gs, deviceWidth, pallette, apiUrl } from '../../globals';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../logo';
import BigButton from '../bigbutton';
import Axios from 'axios';
import { endpointRegisterProfile } from '../../endpoints';

const Gender = ({ route, navigation }) => {

    // const [data] = useState(route.params);

    const [selectedGender, setSelectedGender] = useState(0);
    const [genNotif, setGenNotif] = useState('');


    const onPressSelectGender = (id) => {
        setSelectedGender(id);
        toggleGenNotif(id);
    };

    const onPressSelectGenderCanReset = (id) => {
        if (selectedGender == id) {
            setSelectedGender(0);
            toggleGenNotif(0);
        }
        else {
            setSelectedGender(id);
            toggleGenNotif(id);
        }

    };

    const gradient = (id, colors) => {
        if (id == selectedGender) {
            return [colors[0], colors[1]];
        }
        else {
            return [colors[2], colors[3]];
        }
    };

    const slideCheckboxStyle = (id) => {
        if (id == selectedGender) {
            return {
                justifyContent: "flex-end",
            }
        }
        else {
            return {
                justifyContent: "flex-start"
            }
        }
    };

    const toggleGenNotif = (id) => {
        if (id == 4) {
            setGenNotif('Let op, indien je er voor kiest om het liever niet te zeggen, zul je alleen zichtbaar zijn voor de personen die gefilterd hebben op zowel mannen als vrouwen.');
        }
        else {
            setGenNotif('');
        }
    };

    const postData = () => {
        Axios.get(`${endpointRegisterProfile}${global.registData.userid}/${global.registData.name}/${global.registData.bday}/${global.registData.height * 100}/${global.registData.job}/${global.registData.placeName}/${selectedGender}`)
            .then((res) => {
                console.log(`${endpointRegisterProfile} response`, res)
            });
    }

    function save() {
        global.registData.gender = selectedGender;
        console.log('saved data: ', global.registData);
    }

    return (
        <>
            <View style={gs.screenWrapper}>

                <View>
                    <Logo />
                    <Text style={[s.header, gs.mainHeader]}>Ik ben een</Text>
                </View>

                <LinearGradient colors={gradient(1, [pallette[0], pallette[1], '#FFFFFF', '#FFFFFF'])} style={[s.radioBtnOuter]}>
                    <TouchableOpacity style={[s.radioBtnInner]} onPress={() => { onPressSelectGender(1) }}><Text>Man</Text></TouchableOpacity>
                </LinearGradient>
                <LinearGradient colors={gradient(2, [pallette[0], pallette[1], '#FFFFFF', '#FFFFFF'])} style={[s.radioBtnOuter]}>
                    <TouchableOpacity style={[s.radioBtnInner]} onPress={() => { onPressSelectGender(2) }}><Text>Vrouw</Text></TouchableOpacity>
                </LinearGradient>
                <LinearGradient colors={gradient(3, [pallette[0], pallette[1], '#FFFFFF', '#FFFFFF'])} style={[s.radioBtnOuter]}>
                    <TouchableOpacity style={[s.radioBtnInner]} onPress={() => { onPressSelectGender(3) }}><Text>Non-binair</Text></TouchableOpacity>
                </LinearGradient>

                <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                    <Text>Ik zeg het liever niet</Text>
                    <TouchableWithoutFeedback onPress={() => { onPressSelectGenderCanReset(4) }}>
                        <LinearGradient colors={gradient(4, [pallette[0], pallette[1], '#DDDDDD', '#DDDDDD'])} style={[s.slideCheckbox, slideCheckboxStyle(4)]}>
                            <View style={[s.slideCheckboxBall]}></View>
                        </LinearGradient>
                    </TouchableWithoutFeedback>
                </View>

                <Text>{genNotif}</Text>

                <View style={gs.bottom}>
                    <BigButton n={navigation} component="ProfilePictures" text="doorgaan" disabled={(selectedGender == 0)} callBack={postData}
                        callBack={save}
                    />
                </View>
            </View>

        </>
    );
}

const s = StyleSheet.create({

    radioBtnOuter: {
        marginVertical: 10,
        width: deviceWidth - 34,
        borderRadius: 100,
        padding: 4
    },

    radioBtnInner: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 100,
        width: deviceWidth - 40,
        alignSelf: "center",
    },

    slideCheckbox: {
        borderRadius: 100,
        flexDirection: "row",
        justifyContent: "flex-start",
        width: 80,
    },

    slideCheckboxBall: {

        borderRadius: 100,
        backgroundColor: "white",
        height: 40,
        width: 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

});

export default Gender;

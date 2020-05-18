import React, { useState } from 'react';

import {
    StyleSheet, View, Text,
} from 'react-native';
import { TouchableWithoutFeedback, ScrollView } from 'react-native-gesture-handler';
import { up4meColours, deviceWidth, mx, gs } from '../../globals';
import LinearGradient from 'react-native-linear-gradient';
import ProfileTextField from '../registration/profileTextField';

const EditProfile = () => {


    const [profText, setProfText] = useState('');

    const getProfText = (data) => {
        setProfText(data);
    }

    return (
        <ScrollView style={gs.body}>

            <EditProfileButton />

            <Text>Profiel tekst</Text>
            <ProfileTextField getProfText={getProfText} />

        </ScrollView >
    );
}

const s = StyleSheet.create({

});

const EditProfileButton = (p) => {
    return (
        <View style={editButtonStyles.editButtonContainer}>
            <TouchableWithoutFeedback
                onPress={() => {

                }}
            >

                <LinearGradient colors={[up4meColours.gradPink, up4meColours.gradOrange]} style={[editButtonStyles.editButton]} >
                    <Text style={[editButtonStyles.editButtonText, editButtonStyles.editButtonText_active]}>
                        Bewerken
                    </Text>
                </LinearGradient>

            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
                onPress={() => {

                }}
            >

                <View style={[editButtonStyles.editButton]}>
                    <Text style={[editButtonStyles.editButtonText, editButtonStyles.editButtonText_inactive]}>
                        Voorbeeld
                    </Text>
                </View>

            </TouchableWithoutFeedback>

        </View>
    )
}

const editButtonStyles = StyleSheet.create({

    editButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: up4meColours.picGray,
        borderRadius: 50,
    },

    editButton: {
        borderRadius: 50,
        paddingVertical: 20,
        width: ((deviceWidth - (mx * 2)) / 2),
        alignItems: "center",
    },

    editButtonText: {

    },

    editButtonText_active: {
        color: "white"
    },

    editButtonText_inactive: {
        color: "black"
    }
});

export default EditProfile;
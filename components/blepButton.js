import React from 'react';

import {
    StyleSheet, Text, View,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { up4meColours, deviceWidth, mx } from '../globals';
import LinearGradient from 'react-native-linear-gradient';
import { rootNavigation } from '../rootNavigation';

const BlepButton = (p) => {



    return (
        <View style={editButtonStyles.editButtonContainer}>

            {[0, 1].map((val, i) => {

                let button = (i == p.active) ?
                    (
                        <LinearGradient colors={[up4meColours.gradPink, up4meColours.gradOrange]} style={[editButtonStyles.editButton]} >
                            <Text style={[editButtonStyles.editButtonText, editButtonStyles.editButtonText_active]}>
                                {p.title[i]}
                            </Text>
                        </LinearGradient>
                    )
                    :
                    (
                        <View style={[editButtonStyles.editButton]}>
                            <Text style={[editButtonStyles.editButtonText, editButtonStyles.editButtonText_inactive]}>
                                {p.title[i]}
                            </Text>
                        </View>
                    );

                let input = (
                    <TouchableWithoutFeedback
                        onPress={() => {
                            rootNavigation.navigate(p.route[i]);
                        }}

                    >
                        {button}
                    </TouchableWithoutFeedback>
                );

                console.log('input', input)

                return input;

            })}

            {/* <TouchableWithoutFeedback
                onPress={() => {
                    if (p.route[0]) {
                        rootNavigation.navigate(p.route[0]);
                    }
                }}
            >

                <LinearGradient colors={[up4meColours.gradPink, up4meColours.gradOrange]} style={[editButtonStyles.editButton]} >
                    <Text style={[editButtonStyles.editButtonText, editButtonStyles.editButtonText_active]}>
                        {p.title[0]}
                    </Text>
                </LinearGradient>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
                onPress={() => {
                    if (p.route[1]) {
                        rootNavigation.navigate(p.route[1]);
                    }
                }}
            >

                <View style={[editButtonStyles.editButton]}>
                    <Text style={[editButtonStyles.editButtonText, editButtonStyles.editButtonText_inactive]}>
                        {p.title[1]}
                    </Text>
                </View>
            </TouchableWithoutFeedback> */}

        </View>
    )
}

const editButtonStyles = StyleSheet.create({

    editButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: up4meColours.picGray,
        borderRadius: 50,
        marginVertical: 10,
        marginHorizontal: 11,
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

export default BlepButton;



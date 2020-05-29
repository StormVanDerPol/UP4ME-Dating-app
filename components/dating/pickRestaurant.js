import React from 'react';

import { StyleSheet, View, Text } from "react-native";

import { ScrollView } from "react-native-gesture-handler";

import { gs } from "../../globals";

import TopButton from "../topButton";
import RNSVG_ruler from "../../res/ui/rnsvg/rnsvg_ruler";

import {
    WheelPicker,
    TimePicker,
    DatePicker
} from "react-native-wheel-picker-android";

function PickRestaurant() {

    return (

        <ScrollView style={gs.body}>

            <TopButton header={'Date Plannen'} route={'DateOverview'} />

            <View style={s.headerContainer} >
                <Text style={s.header}>Restaurants</Text>
                <View style={s.headerIconWrapper}>
                    <RNSVG_ruler />
                </View>
            </View>

            <WheelPicker
                data={['niggy', 'ww', 'allah']}
                onItemSelected={(res) => { }}
            />

            <DatePicker
                format24={true}
                hideAM={true}
                hideHours={true}
                hideMinutes={true}
                onDateSelected={(res) => { }}
            />

            <TimePicker
                format24={true}
                onTimeSelected={(res) => { }}
            />


        </ScrollView>

    );
}

const s = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-around"
    },

    headerIconWrapper: {
        width: 40,
        height: 40,
    },

    header: {
        fontSize: 25,
    },
});

export default PickRestaurant;
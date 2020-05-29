import React from 'react';

import { StyleSheet, View, Text } from "react-native";

import { ScrollView } from "react-native-gesture-handler";

import { gs } from "../../globals";

import TopButton from "../topButton";
import RNSVG_ruler from "../../res/ui/rnsvg/rnsvg_ruler";

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
import React from 'react';

import {
    StyleSheet, Text, View,
} from 'react-native';

const MatchNoMatch = () => {
    return (
        <>
            <View style={s.contain}>
                <Text style={s.stuff}>YOU have no matches!</Text>
                <Text>Ruth please tell me how to make this becuz this is not ok</Text>
            </View>
        </>
    );
}

const s = StyleSheet.create({
    contain: {
        height: 50,
        width: 350,
        paddingHorizontal: 25,
    },
    stuff: {
        color: 'red',
        fontSize: 50,
    },


});

export default MatchNoMatch;
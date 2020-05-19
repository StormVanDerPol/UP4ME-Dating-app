
import React from 'react';

import {
    StyleSheet, View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { up4meColours } from '../globals';

const SliderMarkerWhite = () => {
    return (
        <>
            <View style={[s.mark]} />
        </>
    );
}

const markerDiameter = 20;

const s = StyleSheet.create({
    mark: {
        borderRadius: 50,
        backgroundColor: 'white',

        width: markerDiameter,
        height: markerDiameter,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
});

export default SliderMarkerWhite;
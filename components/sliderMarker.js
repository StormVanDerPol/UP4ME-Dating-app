
import React from 'react';

import {
    StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { up4meColours } from '../globals';

const SliderMarker = () => {
    return (
        <>
            <LinearGradient
                style={[s.marker]}
                colors={[up4meColours.gradPink, up4meColours.gradOrange]} />
        </>
    );
}

const markerDiameter = 20;

const s = StyleSheet.create({
    marker: {
        borderRadius: 50,
        width: markerDiameter,
        height: markerDiameter
    }
});

export default SliderMarker;
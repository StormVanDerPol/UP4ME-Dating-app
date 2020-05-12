
import React from 'react';

import {
    StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { pallette } from '../globals';

const SliderMarker = () => {
    return (
        <>
            <LinearGradient
                style={[s.marker]}
                colors={[pallette[0], pallette[1]]} />
        </>
    );
}

const markerDiameter = 20;

const s = StyleSheet.create({
    marker: {
        width: markerDiameter,
        height: markerDiameter
    }
});

export default SliderMarker;
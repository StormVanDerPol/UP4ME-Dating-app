import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import up4meColours from '../res/data/colours';
import { StyleSheet, View } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider/MultiSlider';

const markerDiameter = 20;

export const SliderMarkerGradient = () => {
    return (
        <LinearGradient
            style={styles.marker}
            colors={[up4meColours.gradPink, up4meColours.gradOrange]}
        />
    );
}

export const SliderMarker = ({ color = 'white' }) => {
    return (
        <View style={[styles.marker, { backgroundColor: color }]} />
    );
}

export const SingleSlider = ({
    trackStyle = { backgroundColor: up4meColours.darkGray },
    selectedStyle = { backgroundColor: up4meColours.darkGray },
    marker = SliderMarkerGradient,
    initVal = 0,
    range = [0, 100],
    step = 1,
    sliderLength = 100,
    onChange = () => { }
}) => {

    return (
        <MultiSlider

            customMarker={marker}

            trackStyle={trackStyle}
            selectedStyle={selectedStyle}

            sliderLength={sliderLength}

            values={[initVal]}
            min={range[0]}
            max={range[1]}

            onValuesChange={(output) => { onChange(output[0]) }}

            step={step}
        />
    )
}

export const DoubleSlider = ({
    trackStyle = { backgroundColor: up4meColours.darkGray },
    selectedStyle = { backgroundColor: up4meColours.gradPink },
    marker = SliderMarker,
    initVals = [0, 100],
    range = [0, 100],
    step = 1,
    sliderLength = 100,
    onChange = () => { }
}) => {

    return (
        <MultiSlider

            customMarker={marker}

            trackStyle={trackStyle}
            selectedStyle={selectedStyle}

            sliderLength={sliderLength}

            values={initVals}
            min={range[0]}
            max={range[1]}

            onValuesChange={(output) => { onChange(output) }}

            step={step}
        />
    )
}

const styles = StyleSheet.create({
    marker: {
        borderRadius: 50,
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
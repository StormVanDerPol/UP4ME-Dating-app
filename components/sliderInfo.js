import React, { useState } from 'react';
import { SingleSlider, SliderMarkerGradient, SliderMarker, DoubleSlider } from './sliders';
import { View, StyleSheet } from 'react-native';
import TextQuicksand from './TextQuicksand';
import up4meColours from '../res/data/colours';
import getDeviceDimensions from '../functions/dimensions';
import { registParams } from '../styles/RegistStyles';


export const SingleSliderInfo = ({
    style = {},
    initVal,
    step,
    range,
    trackStyle,
    selectedStyle,
    marker,
    sliderLength = getDeviceDimensions('window', 'width') - registParams.xMargin - 30,
    onChange = () => { },
    title = '',
    unit = '',
    suffix = '',
    toDecimals = false,
}) => {

    const [val, setVal] = useState(initVal)

    return (
        <View style={style}>
            <View style={styles.header}>
                <TextQuicksand>{title}</TextQuicksand>
                <TextQuicksand>
                    {(toDecimals) ? val / 100 : val}{unit}{suffix}
                </TextQuicksand>
            </View>
            <SingleSlider
                trackStyle={trackStyle}
                selectedStyle={selectedStyle}
                marker={marker}
                initVal={initVal}
                range={range}
                step={step}
                sliderLength={sliderLength}
                onChange={(output) => {
                    setVal(output);
                    onChange(output)
                }}
            />
        </View>
    );
}

export const DoubleSliderInfo = ({
    style = {},
    initVals,
    step,
    range,
    trackStyle,
    selectedStyle,
    marker,
    sliderLength = getDeviceDimensions('window', 'width') - registParams.xMargin - 30,
    onChange = () => { },
    title = '',
    unit = '',
    suffix = '',
    toDecimals = false,
}) => {

    const [val, setVal] = useState(initVals)

    return (
        <View style={style}>
            <View style={styles.header}>
                <TextQuicksand>{title}</TextQuicksand>
                <TextQuicksand>
                    {(toDecimals) ? val[0] / 100 : val[0]}{unit} - {(toDecimals) ? val[1] / 100 : val[1]}{unit}{suffix}
                </TextQuicksand>
            </View>
            <DoubleSlider
                trackStyle={trackStyle}
                selectedStyle={selectedStyle}
                marker={marker}
                initVals={initVals}
                range={range}
                step={step}
                sliderLength={sliderLength}
                onChange={(output) => {
                    setVal(output);
                    onChange(output)
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    wrapper: {
        alignItems: "center"
    }
})


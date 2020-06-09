import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { gs, up4meColours, deviceWidth, mx } from '../../globals';
import { ScrollView } from 'react-native-gesture-handler';
import SliderMarkerWhite from '../sliderMarkerWhite';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const FilterRedux = () => {
    return (
        <ScrollView style={[gs.body, gs.screenWrapperScroll]}>

            <Text style={[s.questionHeader]}>Geïnteresseerd in</Text>

            <GaySlider initialValues={[18, 65]} unit={'km'} valueRange={[18, 65]} title='wakkaaa' />

        </ScrollView>
    )
}

const GaySlider = ({ initialValues = [0, 100], unit = '', valueRange = [0, 100] }, title = 'dick') => {

    const [val, setVal] = useState(initialValues);

    function renderValueIndicator() {
        return (initialValues.length == 2) ? (<Text>{val[0]}{unit} - {val[1]}{unit}</Text>) : (<Text>{val[0]}{unit}</Text>);
    }

    return (
        <>
            <View style={sliderStyles.header}>
                <Text>{title}</Text>
                {renderValueIndicator()}
            </View>
            <View style={sliderStyles.wrapper}>
                <MultiSlider
                    customMarker={SliderMarkerWhite}
                    selectedStyle={sliderStyles.track}
                    sliderLength={deviceWidth - mx * 2 - 30}
                    values={[val[0], val[1]]} min={valueRange[0]} max={valueRange[1]}
                    onValuesChange={(output) => { setVal(output) }}
                    step={1}
                />
            </View>
        </>
    )
}

const sliderStyles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    wrapper: {
        alignItems: "center"
    },

    track: {
        backgroundColor: up4meColours.gradPink,
    }
})

const s = StyleSheet.create({

    questionContainer: {
        marginTop: 15,
        paddingVertical: 15,
        borderColor: up4meColours.lineGray,
        borderTopWidth: 1,
    },


    questionHeader: {
        fontSize: 20,
        marginBottom: 10
    },

    donmai: {
        textDecorationLine: "underline",
    },


    prefGenderGrad: {
        borderRadius: 50,
        paddingVertical: 20,
        width: ((deviceWidth - (mx * 2)) / 3),
        alignItems: "center",

    },

    prefGenderButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: up4meColours.picGray,
        borderRadius: 50,
    },
});

export default FilterRedux;
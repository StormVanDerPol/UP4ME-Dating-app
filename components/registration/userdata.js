import React, { useState, useEffect, useRef } from 'react';

import {
    StyleSheet, Text, View, TextInput,
} from 'react-native';

import { gs, deviceWidth, mx, up4meColours } from '../../globals';

import Logo from '../logo';
import BigButton from '../bigbutton';

import MultiSlider from '@ptomasroos/react-native-multi-slider';
import SliderMarker from '../sliderMarker';

import { debugMode } from '../../debugmode';

const UserData = () => {

    const [job, setJob] = useState('');

    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const handleData = () => {

        global.registData.name = _name.current;
        global.registData.height = _height.current;
        global.registData.job = job;
        global.registData.day = day;
        global.registData.month = month;
        global.registData.year = year;
        global.registData.bday = year + month + day;

        if (debugMode.general)
            console.log('saved data: ', global.registData);
    }

    const _name = useRef('');

    const getName = (data) => {
        _name.current = data;
    }

    const _height = useRef(175);

    const getSliderHeight = (data) => {
        _height.current = data;
    }

    return (
        <View style={gs.body}>
            <View style={gs.screenWrapper}>

                <View>
                    <Logo />
                    <Text style={[gs.mainHeader]}>Mijn gegevens</Text>
                </View>

                <NameInput getData={getName} />

                <Text style={s.subheader}>Mijn geboortedatum</Text>
                <View style={s.center}>

                    <TextInput keyboardType='numeric'
                        onChangeText={(input) => {
                            if (input.length == 2) {
                                setDay(input);
                            }
                        }}
                        maxLength={2} style={s.input} placeholder={'DAG'}
                    />

                    <TextInput keyboardType='numeric'
                        onChangeText={(input) => {
                            if (input.length == 2) {
                                setMonth(input);
                            }
                        }}
                        maxLength={2} style={s.input} placeholder={'MAAND'}
                    />

                    <TextInput keyboardType='numeric'
                        onChangeText={(input) => {
                            if (input.length == 4) {
                                setYear(input);
                            }
                        }}
                        maxLength={4} style={s.input} placeholder={'JAAR'}
                    />

                </View>


                <HeightSlider getData={getSliderHeight} />

                <Text style={s.subheader}>Mijn beroep</Text>
                <TextInput style={s.input} maxLength={100} onChangeText={(input) => { setJob(input) }} />

                <View style={gs.bottom}>
                    <BigButton component="Location" text="doorgaan"
                        disabled={!(_name.current.length > 0 && job && day.length == 2 && month.length == 2 && year.length == 4)}
                        callBack={handleData}
                    />
                </View>
            </View>
        </View>
    );
}

const NameInput = (p) => {

    const [name, setName] = useState('');

    const sendData = (data) => {
        p.getData(data);
    }

    useEffect(() => {
        sendData(name);
    }, [name])

    return (
        <>
            <Text style={s.subheader}>Mijn naam</Text>
            <TextInput style={s.input} onChangeText={(input) => setName(input)} />
        </>
    )
}

const HeightSlider = (p) => {

    const [height, setHeight] = useState(175);

    const sendData = (data) => {
        p.getData(data);
    }

    useEffect(() => {
        sendData(height);
    }, [height])

    return (
        <>
            <View style={s.spaceBetween}>
                <Text style={s.subheader}>Mijn lengte</Text>
                <Text style={s.heightIndicator}>{height}m</Text>
            </View>

            <MultiSlider
                customMarker={SliderMarker}
                onValuesChange={(height) => setHeight(height[0] / 100)}
                min={150}
                max={251}
                step={1}
                sliderLength={deviceWidth - mx * 2}

                values={[height]}

                trackStyle={{
                    backgroundColor: '#d8d8d8',
                }}
                selectedStyle={{
                    backgroundColor: '#d8d8d8',
                }}
            />
        </>
    );
}


const s = StyleSheet.create({

    input: {
        // marginBottom: 25,
        borderBottomColor: up4meColours.lineGray,
        borderBottomWidth: 1
    },

    inputSlash: {
        alignItems: "center"
    },

    subheader: {
        marginTop: 25
    },

    heightIndicator: {
        marginTop: 25,
        color: "gray"
    },

    center: {
        flexDirection: "row",
        justifyContent: "center"
    },

    spaceBetween: {
        flexDirection: "row",
        justifyContent: "space-between"
    }

});

export default UserData;

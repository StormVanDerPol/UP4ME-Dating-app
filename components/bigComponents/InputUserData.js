import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import TextQuicksand from '../TextQuicksand';
import { TextInput } from 'react-native-gesture-handler';
import { RegistStyles } from '../../styles/RegistStyles';

import { SingleSliderInfo } from '../sliderInfo'
import { _FOCUSED_C } from '../KeyboardDismiss';
import BirthDayPicker from '../BirthDayPicker';
import { today } from '../../res/data/time';

const InputUserData = ({ initValues = {
    height: 175,
    birthday: {
        month: today.month,
        day: today.day,
        year: today.year,
        yearIndex: today.yearIndex,
    },
    name: '',
    job: '',
}, onChange = () => { } }) => {

    var _userData = useRef({
        height: initValues.height,
        birthday: initValues.birthday,
        name: initValues.name,
        job: initValues.job,
    }).current

    return (
        <>
            <UserDataTextInput header={'Mijn naam'}
                initVal={initValues.name}
                onChangeText={(input) => {
                    _userData.name = input;
                    onChange(_userData);
                }}
            />

            <View style={styles.birthdayContainer}>
                <TextQuicksand style={styles.birthdayHeader}>Mijn geboortedatum</TextQuicksand>
                <BirthDayPicker
                    initValues={initValues.birthday}
                    onChangeDate={(date) => {
                        _userData.birthday = date;
                        onChange(_userData);
                    }} />
            </View>

            <SingleSliderInfo style={styles.slider} title={'Lengte'} unit={'m'} initVal={initValues.height} range={[130, 245]} step={1} toDecimals={true}
                onChange={(output) => {
                    _userData.height = output;
                    onChange(_userData);
                }}
            />

            <UserDataTextInput header={'Mijn beroep'}
                initVal={initValues.name}
                onChangeText={(input) => {
                    _userData.job = input;
                    onChange(_userData);
                }}
            />

        </>
    );
}

const UserDataTextInput = ({ initVal = '', header, onChangeText = () => { } }) => {

    var _ref = useRef().current;

    return (
        <View style={[styles.textInputContainer]}>
            <TextQuicksand>{header}</TextQuicksand>
            <TextInput style={[
                RegistStyles.inputText
            ]}
                defaultValue={initVal}

                ref={(c) => { _ref = c }}
                onFocus={() => {
                    _ref.measure((fx, fy, width, height, px, py) => {
                        _FOCUSED_C.canSnap = true;
                        _FOCUSED_C.offset = (py + height + 33);
                    });
                }}

                onChangeText={(input) => { onChangeText(input); }}
            />
        </View>
    )
}

const styles = StyleSheet.create({

    textInputContainer: {
        marginTop: 24,
    },

    slider: {
        marginTop: 24,
    },

    birthdayContainer: {
        marginTop: 24,
    },

    birthdayHeader: {
        marginBottom: 12,
        color: '#000',
        fontSize: 16
    }
});

export default InputUserData;
import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import TextQuicksand from '../TextQuicksand';
import { TextInput } from 'react-native-gesture-handler';
import { RegistStyles } from '../../styles/RegistStyles';

import { SingleSliderInfo } from '../sliderInfo'
import { MemeMath } from '../../functions/math';
import { _FOCUSED_C } from '../KeyboardDismiss';
import BirthDayPicker from '../BirthDayPicker';

const InputUserData = ({ onChange = () => { } }) => {

    var _userData = useRef({
        height: 1.75,
        birthday: {},
        name: '',
        job: '',
    }).current

    return (
        <>
            <UserDataTextInput header={'Mijn naam'}
                onChangeText={(input) => {
                    _userData.name = input;
                    onChange(_userData);
                }}
            />

            <View style={styles.birthdayContainer}>
                <TextQuicksand style={styles.birthdayHeader}>Mijn geboortedatum</TextQuicksand>
                <BirthDayPicker onChangeDate={(date) => {
                    _userData.birthday = date;
                    onChange(_userData);
                }} />
            </View>

            <SingleSliderInfo style={styles.slider} title={'Lengte'} unit={'m'} initVal={_userData.height} range={[1.30, 2.45]} step={0.01} showDecimals={true}
                onChange={(output) => {
                    _userData.height = MemeMath.roundTwoDecimals(output);
                    onChange(_userData);
                }}
            />

            <UserDataTextInput header={'Mijn beroep'}
                onChangeText={(input) => {
                    _userData.job = input;
                    onChange(_userData);
                }}
            />

        </>
    );
}

const UserDataTextInput = ({ header, onChangeText = () => { } }) => {

    var _ref = useRef().current;

    return (
        <View style={[styles.textInputContainer]}>
            <TextQuicksand>{header}</TextQuicksand>
            <TextInput style={[
                RegistStyles.inputText
            ]}

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
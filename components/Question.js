import React from 'react';
import { View } from 'react-native';
import TextQuicksand from './TextQuicksand';
import { RegistStyles } from '../styles/RegistStyles';
import UpForMeRadioButton from './UpForMeRadioButton';

const Question = ({ title, defaultValue, initValue, headers, onChange = (active) => { } }) => {
    return (
        <>
            <View style={RegistStyles.questionContainer}>
                <TextQuicksand style={RegistStyles.questionHeader}>{title}</TextQuicksand>
                <UpForMeRadioButton
                    defaultValue={defaultValue}
                    active={initValue}
                    headers={headers}
                    onChange={(active) => { onChange(active); }}
                />
            </View>
        </>
    );
}

export default Question;
import React from 'react';
import { View } from 'react-native';
import { RegistStyles } from '../../styles/RegistStyles';
import NetworkFeedBackIndicator from '../waitIndicator';
import UpForMeButton from '../UpForMeButton';


const AlbeitABitLate = ({ message = '', title = '', enableCondition = true, onPress = async () => { } }) => {
    return (
        <View style={RegistStyles.bottom}>
            <NetworkFeedBackIndicator style={RegistStyles.waitIndicator} message={message} />
            <UpForMeButton style={RegistStyles.botButton} title={title} enabled={enableCondition} onPress={async () => {
                await onPress();
            }} />
        </View>
    );
}

export default AlbeitABitLate;
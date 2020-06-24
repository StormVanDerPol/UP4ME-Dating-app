import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import getDeviceDimensions from '../functions/dimensions';
import { Keyboard } from 'react-native';

const KeyboardDismiss = ({ children }) => {
    return (
        <TouchableWithoutFeedback
            style={{ height: getDeviceDimensions('window', 'height') }}
            onPress={() => { Keyboard.dismiss() }}>
            {children}
        </TouchableWithoutFeedback>
    );
}

export default KeyboardDismiss;
import React, { useEffect, useRef, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import getDeviceDimensions from '../functions/dimensions';
import { Keyboard } from 'react-native';

export var _FOCUSED_C = {
    offset: null,
    canSnap: false,
};

const KeyboardDismiss = ({ children }) => {


    const [KBHeight, setKBHeight] = useState(0)


    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

        // cleanup function
        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
            Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        };
    }, []);



    const _keyboardDidShow = (e) => {
        let offset = e.endCoordinates.screenY - _FOCUSED_C.offset;
        if (offset < 0 && _FOCUSED_C.canSnap == true)
            setKBHeight(e.endCoordinates.screenY - _FOCUSED_C.offset);
    };

    const _keyboardDidHide = (e) => {
        // console.log(e);
        setKBHeight(0);
    };

    return (

        <TouchableWithoutFeedback
            style={{
                height: getDeviceDimensions('window', 'height'),
                translateY: KBHeight,
            }}
            onPress={() => { Keyboard.dismiss() }}>
            {children}
        </TouchableWithoutFeedback>
    );
}

export default KeyboardDismiss;
import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { deviceWidth, up4meColours } from '../globals';

export const ButtonTypes = Object.freeze({
    default: 0,
    disabled: 1,
    cancel: 2,
})

const BigButtonRedux = ({ onPress = () => { }, buttonType = ButtonTypes.default, title, style = {} }) => {

    let button = <></>;

    let titleWrapper = <TouchableOpacity
        style={s.titleWrapper}
        onPress={() => {

            if (buttonType != ButtonTypes.disabled)
                onPress();
        }}>
        <Text style={s.title}>{title}</Text>
    </TouchableOpacity >


    switch (buttonType) {
        case ButtonTypes.disabled:

            button = <DisabledButton>{titleWrapper}</DisabledButton>
            break;

        case ButtonTypes.cancel:
            button = <CancelButton>{titleWrapper}</CancelButton>

            break;

        default:
            button = <GradButton>{titleWrapper}</GradButton>
            break;
    }

    return (
        <View style={style}>
            {button}
        </View>
    );
};

const GradButton = ({ children = <></> }) => {
    return (
        <LinearGradient
            style={s.button}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[up4meColours.gradPink, up4meColours.gradOrange]}
        >
            {children}
        </LinearGradient>
    );
}

const DisabledButton = ({ children = <></> }) => {
    return (
        <View
            style={{
                ...s.button,
                ...s.disabled,
            }}
        >
            {children}
        </View>
    );
}

const CancelButton = ({ children = <></> }) => {
    return (
        <View
            style={{
                ...s.button,
                ...s.cancel,
            }}>
            {children}
        </View>
    )
}

const s = StyleSheet.create({
    button: {
        height: 65,
        borderRadius: 100,
        width: deviceWidth - 40,
    },

    disabled: {
        backgroundColor: '#ddd',
    },

    cancel: {
        borderWidth: 3,
        borderColor: '#fff',
        fontWeight: "bold",
    },

    titleWrapper: {
        justifyContent: "center",
        flex: 1,
        alignItems: "center",
    },

    title: {
        textTransform: "uppercase",
        color: "white",
        fontSize: 20
    }
});

export default BigButtonRedux;
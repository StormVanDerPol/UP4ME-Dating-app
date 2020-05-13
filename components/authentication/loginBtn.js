import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { deviceWidth } from '../../globals';
import { rootNavigation } from '../../rootNavigation';

function LoginButton(p) {

    return (
        <TouchableOpacity
            onPress={() => rootNavigation.navigate(p.component)}
            style={s.button}>
            <Text style={s.buttonText}>{p.text}</Text>
        </TouchableOpacity>
    );
}

const s = StyleSheet.create({
    button: {
        borderColor: 'white',
        borderWidth: 1,
        marginVertical: 10,
        padding: 15,
        borderRadius: 100,
        width: deviceWidth - 40,
        alignSelf: "center"
    },

    buttonText: {
        color: 'white',
        alignSelf: "center",
        fontSize: 20,
        textTransform: "uppercase"
    },
})

export default LoginButton;
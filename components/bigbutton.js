import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { deviceWidth, up4meColours } from '../globals';

const BigButton = (p) => {

    const gradient = (disabled) => {

        if (!disabled) {
            return [up4meColours.gradPink, up4meColours.gradOrange]
        }
        else {
            return ['#DDDDDD', '#DDDDDD']
        }
    }

    const callBack = () => {

        console.log('callback that runs: ', p.callBack);

        if (p.callBack != undefined) {
            p.callBack();
        }
    }

    return (
        <>
            <LinearGradient style={s.button} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={gradient(p.disabled)}>
                <TouchableOpacity onPress={() => {

                    if (!p.disabled) {

                        callBack();

                        if (p.component != "back") {

                            p.n.navigate(p.component)
                        }
                        else {

                            p.n.goBack();
                        }
                    }
                }}>
                    <Text style={s.buttonText}>{p.text}</Text>
                </TouchableOpacity>
            </LinearGradient>
        </>
    );
};

const s = StyleSheet.create({
    button: {
        paddingVertical: 15,
        borderRadius: 100,
        width: deviceWidth - 40,
        alignSelf: "center"
    },
    buttonText: {
        textAlign: "center",
        textTransform: "uppercase",
        color: "white",
        fontSize: 20
    }
});

export default BigButton;
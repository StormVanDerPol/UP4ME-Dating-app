import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { pallette, deviceWidth } from '../globals';

const BigButton = (p) => {

    const gradient = (disabled) => {

        if (!disabled) {
            return [pallette[0], pallette[1]]
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
                            console.log(p.data);
                            p.n.navigate(p.component, p.data)
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
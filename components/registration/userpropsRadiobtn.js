
import React, { useState } from 'react';

import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { pallette } from "../../globals";

const UserPropsRadioButton = (p) => {

    const [selected, setSelected] = useState(-1);

    const btnGrad = (id) => {

        if (id == selected) {
            return [pallette[0], pallette[1]];
        }
        else {
            return ['#FFFFFF', '#FFFFFF'];
        }
    }

    const btnInnerStyle = (id) => {
        if (id == selected) {
            return {
                color: "white"
            }
        }
    }

    const sendSelections = () => {
        p.getSelections({ [p.selectKey]: selected });
    }

    const btnSelect = (id) => {
        setSelected(id);
        console.log(p)
        sendSelections();
    }


    return (
        <>
            <View style={s.container}>
                {
                    p.btnText.map((text, id) => {
                        return (

                            <TouchableOpacity style={s.btn} onPress={() => btnSelect(id)} >

                                <LinearGradient style={s.btnGrad} colors={btnGrad(id)} >
                                    <Text style={[s.btnInner, btnInnerStyle(id)]}>{text}</Text>
                                </LinearGradient>

                            </TouchableOpacity>

                        )
                    })
                }
            </View>
        </>
    );
};

const s = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center"
    },

    btn: {
        flex: 1,
    },

    btnGrad: {
        borderRadius: 100,
        paddingVertical: 16,
        marginHorizontal: 10
    },

    btnInner: {
        textAlign: "center",
        color: "gray"
    },
});

export default UserPropsRadioButton;

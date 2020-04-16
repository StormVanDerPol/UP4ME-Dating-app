import React, { useState, useEffect } from 'react';

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
    const [hasInitialized, setHasInitialized] = useState(false);

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

    useEffect(() => {

        if (!hasInitialized) {
            if (p.value != undefined) {

                console.log(`stored value for ${p.selectKey} was ${p.value}`)

                setSelected(p.value);
            }
            setHasInitialized(true);
        }

        else {
            sendSelections();
        }

    }, [selected])

    return (
        <>
            <View style={s.container}>
                {
                    p.btnText.map((text, id) => {
                        return (

                            <TouchableOpacity key={id} style={s.btn} onPress={() => setSelected(id)} >

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

import React, { useState, useEffect } from 'react';

import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { up4meColours } from "../../globals";

const UserPropsRadioButton = (p) => {

    const [selected, setSelected] = useState(0);
    const [hasInitialized, setHasInitialized] = useState(false);

    const btnGrad = (id) => {

        if (id == selected) {
            return [up4meColours.gradPink, up4meColours.gradOrange];
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


    const handleSelection = (id) => {
        if (id != selected) {
            setSelected(id)
        }
        else {
            setSelected(0);
        }
    }

    return (
        <>
            <View style={s.container}>
                {
                    p.btnText.map((text, id) => {
                        return (

                            <TouchableOpacity key={id + 1} style={s.btn} onPress={() => handleSelection(id + 1)} >

                                <LinearGradient style={s.btnGrad} colors={btnGrad(id + 1)} >
                                    <Text style={[s.btnInner, btnInnerStyle(id + 1)]}>{text}</Text>
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
        justifyContent: "center",

    },

    btn: {
        flex: 1,


    },

    btnGrad: {
        borderRadius: 100,
        paddingVertical: 16,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: up4meColours.darkGray,
    },

    btnInner: {
        textAlign: "center",
        color: "gray",
    },
});

export default UserPropsRadioButton;

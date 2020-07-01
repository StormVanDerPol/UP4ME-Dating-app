import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';

import { navigationProxy } from '../navigation/navigationProxy';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { rnRGB, invertRGB } from '../functions/colors';

const devRoutes = [
    {
        name: 'DevSandbox',
        color: { r: 50, g: 200, b: 100 },
        header: 'Dev'
    },

    {
        header: 'Login and Registration',
        name: 'Landing',
        color: { r: 60, g: 60, b: 255 },
    },

    {
        name: 'LocalStratEmail',
        color: { r: 60, g: 60, b: 255 },
    },

    {
        name: 'ConfirmationCode',
        color: { r: 60, g: 60, b: 255 },
    },

    {
        name: 'RegistUserData',
        color: { r: 60, g: 60, b: 255 },
    },
    {
        name: 'RegistLocation',
        color: { r: 60, g: 60, b: 255 },
    },
    {
        name: 'RegistGender',
        color: { r: 60, g: 60, b: 255 },
    },
]

const styles = StyleSheet.create({
    button: {
        padding: 10,
        margin: 10,
        borderRadius: 25,
        borderWidth: 2,
    }
});

export default DevRouter = () => {
    return (
        <>
            {devRoutes.map((route, i) => {

                let headerJSX = <></>;

                if (route.header) {
                    headerJSX = <Text>{route.header}</Text>
                }

                return (
                    <View
                        key={i}>

                        {headerJSX}

                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: rnRGB(route.color), borderColor: rnRGB(invertRGB(route.color)) }]}
                            onPress={() => {
                                navigationProxy.navigate(route.name)
                            }}
                        >
                            <Text style={{ color: rnRGB(invertRGB(route.color)) }}>{route.name}</Text>
                        </TouchableOpacity>
                    </View>

                )
            })}
        </>
    );
}
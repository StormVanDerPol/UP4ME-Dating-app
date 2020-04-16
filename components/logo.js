
import React from 'react';
import {
    StyleSheet, View,
} from 'react-native';
import RNSVG_up4me_logo_colour from '../res/ui/rnsvg/rnsvg_up4me_logo_colour';


const Logo = () => {

    return (
        <>
            <View style={s.logo} >
                <RNSVG_up4me_logo_colour />
            </View>
        </>
    );
};

const s = StyleSheet.create({
    logo: {
        width: 80,
        height: 32,
        alignSelf: "center",
    }
});

export default Logo;

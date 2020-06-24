/*PROPS:
- title : string to be displayed. REQUIRED
- buttonType : takes a value from ButtonTypes enum. Determines layout. 
- onPress : self explanatory
- style : applies to a View that wraps around the button
- enabled : bool that determines wether onPress fires or not
*/

import React from 'react';

import LinearGradient from 'react-native-linear-gradient';

import up4meColours from '../res/data/colours';

import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import TextQuicksand from './TextQuicksand';
import getDeviceDimensions from '../functions/dimensions';


export const ButtonTypes = {
    default: 0,
    dimmed: 1,
    white: 2,
    landing: 3,
}

const UpForMeButton = ({ onPress = () => { }, buttonType = ButtonTypes.default, title, style = {}, enabled = true }) => {

    let layout = <></>;

    let titleWrapper = <TouchableOpacity
        style={styles.titleWrapper}
        onPress={() => {

            if (enabled) {
                onPress();
            }
        }}>
        <TextQuicksand style={styles.title}>{title}</TextQuicksand>
    </TouchableOpacity >


    switch (buttonType) {
        case ButtonTypes.dimmed:

            layout = <DimmedLayout>{titleWrapper}</DimmedLayout>
            break;

        case ButtonTypes.white:
            layout = <WhiteLayout>{titleWrapper}</WhiteLayout>

            break;

        case ButtonTypes.landing:
            layout = <WhiteLayout extraStyles={{ borderWidth: 1.5 }}>{titleWrapper}</WhiteLayout>

            break;

        default:
            layout = <DefaultLayout>{titleWrapper}</DefaultLayout>
            break;
    }

    let buttonOpacity = (enabled) ? 1 : 0.5;

    return (
        <View style={{ ...style, opacity: buttonOpacity }}>
            {layout}
        </View>
    );
};

const DefaultLayout = ({ children = <></> }) => {
    return (
        <LinearGradient
            style={styles.button}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[up4meColours.gradPink, up4meColours.gradOrange]}
        >
            {children}
        </LinearGradient>
    );
}

const DimmedLayout = ({ children = <></> }) => {
    return (
        <View
            style={{
                ...styles.button,
                ...styles.dimmed,
            }}
        >
            {children}
        </View>
    );
}

const WhiteLayout = ({ children = <></>, extraStyles = {} }) => {
    return (
        <View
            style={{
                ...styles.button,
                ...styles.white,
                ...extraStyles,
            }}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 65,
        borderRadius: 100,
        width: getDeviceDimensions('window', 'width') - 40
    },

    dimmed: {
        backgroundColor: '#ddd',
    },

    white: {
        borderWidth: 3,
        borderColor: '#fff',
        fontWeight: "bold",
        backgroundColor: '#fffff000'
    },

    titleWrapper: {
        justifyContent: "center",
        alignItems: "center",
        height: '100%',
    },

    title: {
        textTransform: "uppercase",
        color: "white",
        fontSize: 20,
    }
});

export default UpForMeButton;
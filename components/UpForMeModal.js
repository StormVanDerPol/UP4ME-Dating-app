/*
usage:

<UpForMeModal
    enabled={bool: shows or kills the modal}
    style={}
    duration={int: duration of the anim in ms}
    animated={bool: play the fadein anim or nah}
    >

    <Whatever the fuck/>

</UpForMeModal>

*/

import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Animated, BackHandler } from 'react-native';

import getDeviceDimensions from '../functions/dimensions';

const UpForMeModal = ({ onPressBackButton = () => { }, enabled = true, style = {}, children, duration = 1000, animated = true }) => {
    return (enabled) ? <Modal style={style} children={children} duration={duration} animated={animated} onPressBackButton={onPressBackButton} /> : <></>;
}


const Modal = ({ style, children, duration, animated, onPressBackButton }) => {

    const ypos = useRef(
        (animated) ?
            new Animated.Value(getDeviceDimensions('window', 'height')) :
            new Animated.Value(0)
    ).current

    const opacity = useRef(
        (animated) ?
            new Animated.Value(0) :
            new Animated.Value(1)
    ).current


    useEffect(() => {

        Animated.timing(
            ypos,
            {
                toValue: 0,
                duration: duration,
                useNativeDriver: true,
            }
        ).start();

        Animated.timing(
            opacity,
            {
                toValue: 1,
                duration: duration / 2,
                useNativeDriver: true,

            }
        ).start();



        const backhandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                onPressBackButton();
                return true;
            }
        );

        return () => backhandler.remove();


    }, []);



    return (
        <Animated.View style={{
            ...styles.bg,
            width: getDeviceDimensions('window', 'width'),
            height: getDeviceDimensions('window', 'height'),
            opacity: opacity
        }}>
            <Animated.View
                style={{
                    ...styles.animatedContainer,
                    translateY: ypos
                }}>
                <View style={{
                    ...styles.contentWrapper,
                    ...style,
                }}>
                    {children}
                </View>
            </Animated.View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    bg: {
        position: "absolute",
        left: 0,
        backgroundColor: '#00000777',
    },

    animatedContainer: {
        width: '100%',
        height: '100%',
        position: "absolute",

    },

    contentWrapper: {
        width: '100%',
        height: '100%'
    },
})

export default UpForMeModal;
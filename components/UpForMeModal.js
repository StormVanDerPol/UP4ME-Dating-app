import React, { useRef, useEffect } from 'react';
import { StyleSheet, Dimensions, View, Animated } from 'react-native';

const UpForMeModal = ({ enabled = true, style = {}, children, duration = 1000, animated = true }) => {
    return (enabled) ? <Modal style={style} children={children} duration={duration} animated={animated} /> : <></>;
}


const Modal = ({ style, children, duration, animated }) => {

    const ypos = useRef(
        (animated) ?
            new Animated.Value(Dimensions.get('window').height) :
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
    }, []);



    return (
        <Animated.View style={{
            ...styles.bg,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
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
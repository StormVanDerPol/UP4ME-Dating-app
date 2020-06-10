import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Dimensions, Text, View, Animated } from 'react-native';

const ModalUp4me = ({ style = {}, children, duration = 1000 }) => {

    const ypos = useRef(new Animated.Value(Dimensions.get('window').height)).current

    useEffect(() => {
        Animated.timing(
            ypos,
            {
                toValue: 0,
                duration: duration,
            }
        ).start();
    }, []);

    return (
        <View
            style={{
                position: "absolute",
                left: 0,
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
                backgroundColor: '#00000777',
            }}
        >

            <Animated.View
                style={{
                    width: '100%',
                    height: '100%',
                    position: "absolute",
                    top: ypos
                }}
            >
                <View style={{
                    width: '100%',
                    height: '100%',
                    ...style,
                }}>
                    {children}
                </View>

            </Animated.View>

        </View>
    );
}

export default ModalUp4me;
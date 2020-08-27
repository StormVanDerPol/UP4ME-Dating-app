import React, { useRef, useEffect } from 'react';
import { StyleSheet, Animated, View, StatusBar } from 'react-native';
import getDeviceDimensions from '../functions/dimensions';
import TextQuicksand from './TextQuicksand';
import LinearGradient from 'react-native-linear-gradient';
import up4meColours from '../res/data/colours';
import UpForMeIcon, { iconIndex } from './UpForMeIcon';

const params = {
    height: 100,
    statusBarHeight: StatusBar.currentHeight,
    fadeDuration: 1000,
    lifeDuration: 7000,
}

const FirebaseMessageUI = ({ data, top = false, onDismount = () => { } }) => {

    console.log(data);

    const timer = useRef(null);

    const MessageBody = () => {
        return (

            <View style={styles.messageBody}>
                <TextQuicksand>{data.notification.title}</TextQuicksand>
                <TextQuicksand>{data.notification.body}</TextQuicksand>

                <UpForMeIcon style={styles.messageCloseIcon} icon={iconIndex.match_dislike} touchable={true} onPress={() => {
                    clearTimeout(timer.current);
                    fadeOut();
                }} />

            </View>
        )
    }


    const ypos = useRef(
        new Animated.Value(
            (top) ? -params.height : params.height,
        )
    ).current;

    const fadeIn = () => {
        Animated.timing(
            ypos,
            {
                toValue: 0,
                duration: params.fadeDuration,
                useNativeDriver: true,
            }
        ).start();
    }

    const fadeOut = () => {
        Animated.timing(
            ypos,
            {
                toValue: (top) ? -params.height : params.height,
                duration: params.fadeDuration,
                useNativeDriver: true,
            }
        ).start(() => {
            onDismount();
        })
    }

    useEffect(() => {
        fadeIn();

        timer.current = setTimeout(() => {
            fadeOut();
        }, params.lifeDuration)

    }, [])

    return (
        <Animated.View style={{
            ...styles.messageContainer,
            top: (top) ? 0 : getDeviceDimensions('screen', 'height', true) - params.height - params.statusBarHeight * 2,
            translateY: ypos,
        }}>
            <MessageBody />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    messageContainer: {
        position: "absolute",
        left: 0,
        height: params.height,
        width: getDeviceDimensions('window', 'width'),
    },

    messageCloseIcon: {
        position: "absolute",
        right: 8,
        top: 8,
        width: 36,
        height: 36,
    },

    messageBody: {
        height: params.height,
        width: getDeviceDimensions('window', 'width'),

        backgroundColor: '#fefefe',

        paddingTop: 5,
        paddingHorizontal: 5,

        borderTopColor: '#ddd',
        borderTopWidth: 2,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 15,



    },
})

export default FirebaseMessageUI;
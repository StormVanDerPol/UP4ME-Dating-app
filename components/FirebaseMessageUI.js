import React, { useRef, useEffect } from 'react';
import { StyleSheet, Animated, View, StatusBar } from 'react-native';
import getDeviceDimensions from '../functions/dimensions';
import TextQuicksand from './TextQuicksand';
import LinearGradient from 'react-native-linear-gradient';
import up4meColours from '../res/data/colours';

const params = {
    height: 100,
    statusBarHeight: StatusBar.currentHeight,
    fadeDuration: 1000,
    lifeDuration: 7000,
}

const FirebaseMessageUI = ({ data, top = false, onDismount = () => { } }) => {

    console.log(data);

    const MessageBody = () => {
        return (
            <LinearGradient
                colors={[up4meColours.gradOrange, up4meColours.gradPink]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={styles.messageBody}>

                <View style={styles.messageInner}>
                    <TextQuicksand>{data.notification.title}</TextQuicksand>
                    <TextQuicksand>{data.notification.body}</TextQuicksand>
                </View>

            </LinearGradient>
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

        setTimeout(() => {
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

    messageBody: {
        height: params.height,
        width: getDeviceDimensions('window', 'width'),

    },

    messageInner: {
        height: params.height - 5,
        width: getDeviceDimensions('window', 'width') - 5,
        marginTop: 2.5,
        marginHorizontal: 2.5,

        paddingTop: 5,
        paddingHorizontal: 5,

        backgroundColor: '#fff',
    },

})

export default FirebaseMessageUI;
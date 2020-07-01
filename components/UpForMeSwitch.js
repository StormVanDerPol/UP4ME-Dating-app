import React, { useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import up4meColours from '../res/data/colours';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const UpForMeSwitch = ({ active = false, onPress = () => { } }) => {

    const xpos = useRef(new Animated.Value(0)).current;

    // const active = useRef(false);

    const [fu, forceUpdate] = useState(0);

    const slideAnim = () => {

        console.log('nyanpasu')

        Animated.timing(
            xpos,
            {
                toValue: (active) ? 0 : 40,
                duration: 100,
                useNativeDriver: true,
            }
        ).start(
            () => {
                forceUpdate(fu + 1);
            }
        );

        (active) ? active = false : active = true
    }

    return (
        <TouchableWithoutFeedback onPress={() => { onPress() }}>
            <LinearGradient colors={(active) ? [up4meColours.gradPink, up4meColours.gradOrange] : ['#DDDDDD', '#DDDDDD']}
                style={styles.slideCheckbox}>

                <Animated.View style={[styles.slideCheckboxBall, {
                    transform: [{
                        translateX: xpos,
                    }],
                }]} />

            </LinearGradient>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    slideCheckbox: {
        borderRadius: 100,
        width: 80,

        margin: 10,
    },

    slideCheckboxBall: {

        borderRadius: 100,
        backgroundColor: "white",
        height: 40,
        width: 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

})

export default UpForMeSwitch;
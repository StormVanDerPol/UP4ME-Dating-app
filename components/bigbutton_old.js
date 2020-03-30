
import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { pallette, deviceWidth } from '../globals';


class BigButton extends Component {

    constructor(props) {
        super(props);

        console.log(this.props)
    }

    gradients() {

        let disabled = this.props.disabled;

        if (!disabled) {
            return [pallette[0], pallette[1]]
        }
        else {
            return ['#DDDDDD', '#DDDDDD']
        }
    }

    render() {
        return (
            <>
                <LinearGradient style={s.button} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={this.gradients()}>
                    <TouchableOpacity><Text style={s.buttonText}>{this.props.text}</Text></TouchableOpacity>
                </LinearGradient>
            </>
        );
    }
};

const s = StyleSheet.create({
    button: {
        paddingVertical: 15,
        borderRadius: 100,
        width: deviceWidth - 40,
        alignSelf: "center"
    },
    buttonText: {
        textAlign: "center",
        textTransform: "uppercase",
        color: "white",
        fontSize: 20
    }
});

export default BigButton;

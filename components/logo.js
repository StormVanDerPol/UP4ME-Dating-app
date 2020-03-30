
import React, { Component } from 'react';
import {
    StyleSheet, Text,
} from 'react-native';


class Logo extends Component {

    render() {
        return (
            <>
                <Text style={s.logo} >Up4Me</Text>
            </>
        );
    }
};

const s = StyleSheet.create({
    logo: {
        fontSize: 20,
        textAlign: "center"
    }
});

export default Logo;


import React, { Component } from 'react';

import {
    StyleSheet, TouchableOpacity, Text, View,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { pallette } from "../../globals";

class UserPropsRadioButton extends Component {

    constructor(props) {
        super(props)

        this.state = {
            selected: -1
        }

        this.btnSelect = this.btnSelect.bind(this);

    }


    btnGrad(id) {

        if (id == this.state.selected) {
            return [pallette[0], pallette[1]];
        }
        else {
            return ['#FFFFFF', '#FFFFFF'];
        }
    }

    btnInnerStyle(id) {
        if (id == this.state.selected) {
            return {
                color: "white"
            }
        }
    }

    btnSelect(id) {
        this.setState({
            selected: id
        });
    }

    render() {
        return (
            <>
                <View style={s.container}>
                    {
                        this.props.btnText.map((text, id) => {
                            return (

                                <TouchableOpacity style={s.btn} onPress={() => this.btnSelect(id)} >

                                    <LinearGradient style={s.btnGrad} colors={this.btnGrad(id)} >
                                        <Text style={[s.btnInner, this.btnInnerStyle(id)]}>{text}</Text>
                                    </LinearGradient>

                                </TouchableOpacity>

                            )
                        })
                    }
                </View>
            </>
        );
    }
};

const s = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center"
    },

    btn: {
        flex: 1,
    },

    btnGrad: {
        borderRadius: 100,
        paddingVertical: 16,
        marginHorizontal: 10
    },

    btnInner: {
        textAlign: "center",
        color: "gray"
    },
});

export default UserPropsRadioButton;

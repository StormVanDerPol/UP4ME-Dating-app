
import React, { Component } from 'react';
import {
    StyleSheet, View, Text
} from 'react-native';


class ListItem extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                <View style={s.listItem}>
                    <Text style={s.listItemSymbol}>{this.props.symbol}</Text>
                    <Text style={s.listItemContent}>{this.props.text}</Text>
                </View>
            </>
        );
    }
};

const s = StyleSheet.create({

    listItem: {
        flexDirection: "row"
    },

    listItemSymbol: {
        marginRight: 16
    }
});

export default ListItem;

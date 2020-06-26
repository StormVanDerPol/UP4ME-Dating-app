/*
Container that will scale to fit the screen, child must have flex: n, use StaticContent as a child as a shortcut.
*/


import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import getDeviceDimensions from '../functions/dimensions';

const Body = ({ children }) => {
    return (
        <SafeAreaView style={{
            ...styles.root,
            height: getDeviceDimensions('window', 'height'),
        }}>
            {children}
        </SafeAreaView>
    );
}

export const FlexSection = ({ children }) => {
    return (
        <View style={{
            flex: 1,
        }}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#fff',
    }
})

export default Body;
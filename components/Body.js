/*
Container that will scale to fit the screen, child must have flex: n, use StaticContent as a child as a shortcut.
*/


import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import getDeviceDimensions from '../functions/dimensions';
import { ScrollView } from 'react-native-gesture-handler';

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

export const FlexSection = ({ children, onLayout = (e) => { } }) => {
    return (
        <ScrollView
            onLayout={(e) => {
                onLayout(e);
            }}
            style={{
                flex: 1,
                // borderWidth: 2,
                // borderColor: 'green',
            }}>
            {children}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#fff',
    }
})

export default Body;
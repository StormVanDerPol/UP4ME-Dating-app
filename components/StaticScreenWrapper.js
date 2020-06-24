/*
Container that will scale to fit the screen, child must have flex: n, use StaticContent as a child as a shortcut.
*/


import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';

const StaticScreenWrapper = ({ children }) => {
    return (
        <SafeAreaView style={styles.root}>
            {children}
        </SafeAreaView>
    );
}

export const StaticContent = ({ children }) => {
    return (
        <View style={styles.root}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        // borderWidth: 2,
        // borderColor: 'red',
    }
})

export default StaticScreenWrapper;
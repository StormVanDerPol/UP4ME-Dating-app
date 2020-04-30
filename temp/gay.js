import React from 'react';

import {
    StyleSheet, Button,
} from 'react-native';

const SolidSnek = ({ navigation }) => {
    return (
        <>
            <Button title="traps aren't gay" onPress={() => navigation.navigate('Login')} />
            <Button title="Filter" onPress={() => navigation.navigate('Filter')} />
        </>
    );
}

const s = StyleSheet.create({

});

export default SolidSnek;
import React from 'react';

import {
    StyleSheet, Text, View,
} from 'react-native';

const MatchNoMatch = () => {
    return (
        <>
            <View style={s.contain}>
                <Text style={s.main}>Oops..!</Text>
                <Text style={[s.contain,]}>Helaas zijn er geen profielen meer die aan je filters voldoen. Pas je filters aan of wacht op nieuwe profielen.</Text>
            </View>
        </>
    );
}

const s = StyleSheet.create({
    contain: {
        width: 350,
        paddingHorizontal: 25,
    },
    main: {
        color: 'red',
        fontSize: 50,
    },


});

export default MatchNoMatch;
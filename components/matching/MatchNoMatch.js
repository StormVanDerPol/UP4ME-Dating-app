import React from 'react';

import {
    StyleSheet, Text, View,
} from 'react-native';
import { FlingGestureHandler, Directions, State } from 'react-native-gesture-handler';
import { gs, deviceHeight } from '../../globals';
import { rootNavigation } from '../../rootNavigation';

const MatchNoMatch = () => {
    return (
        <View style={[]}>
            <FlingGestureHandler
                direction={Directions.UP}
                onHandlerStateChange={({ nativeEvent }) => {
                    if (nativeEvent.state === State.ACTIVE) {
                        console.log('fling up');
                        rootNavigation.navigate('MatchScreenInitial');
                    }
                }}
            >
                <View style={s.contain}>
                    <Text style={s.main}>Oops..!</Text>
                    <Text style={[s.contain,]}>Helaas zijn er geen profielen meer die aan je filters voldoen. Pas je filters aan of wacht op nieuwe profielen.</Text>
                </View>
            </FlingGestureHandler>
        </View>
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

    ppsnek: {
        height: deviceHeight - 50,
        borderWidth: 1,
    },
});

export default MatchNoMatch;
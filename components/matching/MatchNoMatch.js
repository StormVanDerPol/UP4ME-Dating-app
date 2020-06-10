import React from 'react';

import {
    StyleSheet, Text, View,
} from 'react-native';
import { FlingGestureHandler, Directions, State } from 'react-native-gesture-handler';
import { gs, deviceHeight, deviceWidth } from '../../globals';
import { rootNavigation } from '../../rootNavigation';
import RNSVG_oops from '../../res/ui/rnsvg/rnsvg_oops';

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

                    <View style={{ width: 300, height: 200 }}>
                        <RNSVG_oops></RNSVG_oops>
                    </View>
                    <Text style={[s.textcenter]}>Helaas zijn er geen profielen meer die aan je filters voldoen. Pas je filters aan of wacht op nieuwe profielen.</Text>
                </View>
            </FlingGestureHandler>
        </View >
    );
}

const s = StyleSheet.create({
    contain: {
        width: 350,
        paddingHorizontal: 25,
        // justifyContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'center',
        // flexDirection: 'row',
    },
    main: {
        color: 'red',
        fontSize: 50,
    },

    ppsnek: {
        height: deviceHeight - 50,
        borderWidth: 1,
    },
    textcenter: {
        textAlign: 'center',
        fontSize: 21,
    },
});

export default MatchNoMatch;
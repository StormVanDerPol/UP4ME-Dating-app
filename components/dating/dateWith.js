import React from 'react';

import { StyleSheet, Image } from "react-native";
import { gs } from '../../globals';

const DateWith = () => {

    return (
        <View style={gs.body}>

            <Image
                source={require('../../res/pepe.jpg')} />

        </View>
    );

}

const s = StyleSheet.create({

});

export default DateWith;
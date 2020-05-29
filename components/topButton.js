import React, { useRef, useState } from 'react';

import { StyleSheet, View, Text } from "react-native";
import { rootNavigation } from '../rootNavigation';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import RNSVG_edit from '../res/ui/rnsvg/rnsvg_edit';


function TopButton(p) {

    const [topBtnHeight, setTopBtnHeight] = useState(0);


    return (

        <View onLayout={(e) => {

            setTopBtnHeight(e.nativeEvent.layout.height);

        }}>

            <TouchableWithoutFeedback style={[s.topButtonWrapper]} onPress={() => rootNavigation.navigate(p.route)}>
                <View style={[s.iconWrapper, { top: topBtnHeight / 2 - 10 }]}>
                    <RNSVG_edit />
                </View>
                <Text style={[s.topText]}>{p.header}</Text>
            </TouchableWithoutFeedback>

        </View>
    );

}

const s = StyleSheet.create({

    topButtonWrapper: {
        padding: 15,
        paddingLeft: 25,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },

    iconWrapper: {
        width: 20,
        height: 20,
        position: "absolute",
        left: 20,
    },

    topText: {
        textAlign: 'center',
        fontSize: 25,
        color: 'gray',
    },
});

export default TopButton;
import React, { useState } from 'react';
import { navigationProxy } from '../navigation/navigationProxy';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';
import UpForMeIcon, { iconIndex } from './UpForMeIcon';
import TextQuicksand from './TextQuicksand';

export const ArrowButtonRight = ({ header, route }) => {

    return (
        <TouchableOpacity style={styles.button} onPress={() => navigationProxy.navigate(route)}>
            <TextQuicksand style={styles.header}>{header}</TextQuicksand>
            <UpForMeIcon style={styles.icon} icon={iconIndex.arrow_right} />
        </TouchableOpacity>
    );
}

export const ArrowButtonTop = ({ header, route }) => {

    const [topBtnHeight, setTopBtnHeight] = useState(0);

    return (

        <View onLayout={(e) => {

            setTopBtnHeight(e.nativeEvent.layout.height);

        }}>
            <TouchableOpacity style={[styles.topButtonWrapper]} onPress={() => navigationProxy.navigate(route)}>

                <UpForMeIcon
                    icon={iconIndex.arrow_left}
                    style={{
                        ...styles.iconWrapper,
                        top: topBtnHeight / 2 - 10,
                    }} />
                <TextQuicksand style={styles.topText}>{header}</TextQuicksand>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({

    button: {
        flexDirection: 'row',
        padding: 15,
        paddingLeft: 25,
        alignContent: 'space-around',
        justifyContent: 'space-between',

        borderTopWidth: 1,
        borderTopColor: '#666'
    },
    header: {
        fontSize: 15,
    },
    icon: {
        width: 25,
        height: 25,
    },

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
        fontSize: 20,
        color: '#666',
    },
});

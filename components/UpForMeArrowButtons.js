import React, { useState } from 'react';
import { navigationProxy } from '../navigation/navigationProxy';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';
import UpForMeIcon, { iconIndex } from './UpForMeIcon';
import TextQuicksand from './TextQuicksand';

export const ArrowButtonRight = ({ header, onPress = () => { }, end = false, start = true }) => {

    return (
        <TouchableOpacity style={[styles.button, { borderTopWidth: (start) ? 1 : 0, borderBottomWidth: (end) ? 1 : 0 }]} onPress={() => onPress()}>
            <TextQuicksand style={styles.header}>{header}</TextQuicksand>
            <UpForMeIcon style={styles.icon} icon={iconIndex.arrow_right} />
        </TouchableOpacity>
    );
}

export const ArrowButtonTop = ({ header, onPress = () => { } }) => {

    const [topBtnHeight, setTopBtnHeight] = useState(0);

    return (

        <View onLayout={(e) => {

            setTopBtnHeight(e.nativeEvent.layout.height);

        }}>
            <TouchableOpacity style={[styles.topButtonWrapper]} onPress={() => onPress()}>

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

export const ArrowButtonDropDown = ({ header, children, end = false, start = true }) => {

    const [down, setDown] = useState(false);

    return (
        <View style={[styles.dropDown, { borderTopWidth: (start) ? 1 : 0, borderBottomWidth: (end) ? 1 : 0 }]}>
            <TouchableOpacity style={styles.dropDownBtn} onPress={() => setDown((down) ? false : true)}>
                <TextQuicksand style={styles.header}>{header}</TextQuicksand>
                <UpForMeIcon style={styles.icon} icon={(down) ? iconIndex.arrow_down : iconIndex.arrow_right} />
            </TouchableOpacity>
            <View>
                {
                    (down) ? <>
                        {children}
                    </> : <></>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    dropDown: {
        borderColor: '#666'
    },

    dropDownBtn: {
        flexDirection: 'row',
        padding: 15,
        paddingLeft: 25,
        alignContent: 'space-around',
        justifyContent: 'space-between',
    },

    button: {
        flexDirection: 'row',
        padding: 15,
        paddingLeft: 25,
        alignContent: 'space-around',
        justifyContent: 'space-between',

        borderTopWidth: 1,
        borderColor: '#666'
    },
    header: {
        fontSize: 18,
        color: '#333',
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

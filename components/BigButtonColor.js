import React from 'react';
import up4meColours from '../res/data/colours';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TextQuicksand from './TextQuicksand';
import { StyleSheet } from 'react-native';
import getDeviceDimensions from '../functions/dimensions';

const BigButtonColor = ({ style = {}, active = true, header = '', onPress = () => { } }) => {
    return (
        <LinearGradient colors={(active) ? [up4meColours.gradPink, up4meColours.gradOrange] : ['#FFF', '#FFF']}
            style={[styles.outer, style]}>
            <TouchableOpacity style={[styles.inner]}
                onPress={() => onPress()}>
                <TextQuicksand>{header}</TextQuicksand>
            </TouchableOpacity>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    outer: {
        width: getDeviceDimensions('window', 'width') - 36,
        borderRadius: 100,
        padding: 4
    },

    inner: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 100,
        width: getDeviceDimensions('window', 'width') - 40,
        alignSelf: "center",
        borderColor: up4meColours.darkGray,
        borderWidth: 1,
    },
})

export default BigButtonColor;
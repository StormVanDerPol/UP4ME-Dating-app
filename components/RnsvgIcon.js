import React from 'react';
import { View } from 'react-native';

const RnsvgIcon = ({ icon, style = { height: 50, width: 50, } }) => {
    return (
        <View style={style}>
            {icon}
        </View>
    );
}

export default RnsvgIcon;
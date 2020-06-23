import React from 'react';
import { Text } from 'react-native';

const TextQuicksand = ({ type = 'Regular', style = {}, children }) => {
    return (
        <Text style={{
            ...style,
            fontFamily: `Quicksand-${type}`
        }}>{children}</Text>
    );
}

export default TextQuicksand;
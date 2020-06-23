import React from 'react';
import { Text } from 'react-native';

const TextQuicksand = ({ type = 'Regular', style = {}, children, tap = () => { } }) => {
    return (
        <Text
            onPress={tap}
            style={{
                ...style,
                fontFamily: `Quicksand-${type}`
            }}>{children}</Text>
    );
}

export default TextQuicksand;
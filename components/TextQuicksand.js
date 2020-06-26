import React from 'react';
import { Text } from 'react-native';

const TextQuicksand = ({ type = 'Medium', style = { color: '#000', fontSize: 16 }, children, onPress = () => { } }) => {
    return (
        <Text
            onPress={onPress}
            style={{
                ...style,
                fontFamily: `Quicksand-${type}`
            }}>{children}</Text>
    );
}

export default TextQuicksand;
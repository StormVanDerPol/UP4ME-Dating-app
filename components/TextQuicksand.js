import React from 'react';
import { Text } from 'react-native';

const TextQuicksand = ({ shadow = false, type = 'Medium', style = { color: '#000', fontSize: 16 }, children, onPress = () => { } }) => {

    const _shadow = (shadow) ? {
        textShadowOffset: {
            width: 1,
            height: 1,
        },
        textShadowColor: '#000',
        textShadowRadius: 1,
    } : {};

    return (
        <Text
            onPress={onPress}
            style={{
                ...style,
                fontFamily: `Quicksand-${type}`,
                ..._shadow,
            }}>{children}</Text>
    );
}

export default TextQuicksand;
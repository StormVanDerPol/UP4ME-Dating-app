import React from 'react';
import TextQuicksand from './TextQuicksand';

const WaitIndicator = ({ style = {}, visible = true }) => {
    return (
        <TextQuicksand
            style={(visible) ? { opacity: 1, ...style } : { opacity: 0, ...style }}
        >
            Please wait...
        </TextQuicksand>
    );
}

export default WaitIndicator;
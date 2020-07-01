import React from 'react';
import TextQuicksand from './TextQuicksand';
import up4meColours from '../res/data/colours';

export const networkFeedbackMessages = {
    wait: 'Please wait...',
    err: 'Network Error, please try again!'
}

const NetworkFeedBackIndicator = ({ style = {}, message = networkFeedbackMessages.wait }) => {

    let color = '';

    switch (message) {
        case networkFeedbackMessages.wait:
            color = up4meColours.darkGray
            break;

        case networkFeedbackMessages.err:
            color = 'red';
            break;

        default:
            color = 'orange';
    }

    return (
        <TextQuicksand
            style={{
                ...style,
                color: color
            }}
        >
            {message}
        </TextQuicksand>
    );
}

export default NetworkFeedBackIndicator;
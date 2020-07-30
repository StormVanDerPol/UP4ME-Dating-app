import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import TextQuicksand from '../../../components/TextQuicksand';
import getDeviceDimensions from '../../../functions/dimensions';

const WebViewContainer = ({ route }) => {

    return (
        <>
            <TextQuicksand>{route.params.uri}</TextQuicksand>
            <WebView

                // onNavigationStateChange={(e) => { console.log('webview event', e) }}
                userAgent={'Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1'}
                style={{
                    width: getDeviceDimensions('window', 'width'),
                    height: 200,
                    borderWidth: 2,
                }}
                source={{
                    uri: route.params.uri
                }}
            />

        </>
    );
}

export default WebViewContainer;
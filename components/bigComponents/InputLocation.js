import React, { useState, useEffect } from 'react';
import getDeviceDimensions from '../../functions/dimensions';
import Axios from 'axios';
import FastImage from 'react-native-fast-image';
import { Button } from 'react-native';

const MapsApiRootUrl = 'https://maps.googleapis.com/maps/api/staticmap?';
const GOOGLE_MAPS_API_KEY = ***REMOVED***;

const InputLocation = () => {

    const [mapParams, setMapParams] = useState({
        zoom: 13,
        width: 100,
        height: 100,
        type: 'roadmap',

        location: 'amsterdam',
    });


    return (
        <>
            <FastImage
                style={{
                    width: 100,
                    height: 100,
                }}
                source={{
                    uri: `${MapsApiRootUrl}center=${mapParams.location}&scale=2&zoom=${mapParams.zoom}&size=${mapParams.width}x${mapParams.height}&maptype=${mapParams.type}&key=${GOOGLE_MAPS_API_KEY}`,
                }}
            />
        </>
    );
}

export default InputLocation;
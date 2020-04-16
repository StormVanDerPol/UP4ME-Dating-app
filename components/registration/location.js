import React, { useState, useEffect } from 'react';

import { WebView } from 'react-native-webview';

import {
    StyleSheet,
    View,
    Text,
    Image,
    Button,
} from 'react-native';

import {
    deviceHeight,
    gs,
    mx,
    MapsApiRootUrl,
    deviceWidth,
} from '../../globals';
import Logo from '../logo';
import BigButton from '../bigbutton';

import { GOOGLE_MAPS_API_KEY } from '../../temp/keys';

const Location = ({ route, navigation }) => {

    const [data] = useState(route.params);

    const [lat, setLat] = useState(52.3667);
    const [lon, setLon] = useState(4.8945);

    const zoom = 10;
    const mapWidth = deviceWidth - mx * 2;
    const mapHeight = deviceHeight / 2;
    const mapType = 'roadmap'

    return (
        <>
            <View style={gs.screenWrapper}>

                <View>
                    <Logo />
                    <Text style={[s.header, gs.mainHeader]}>Location</Text>
                </View>

                <View style={gs.bottom}>

                    <View style={s.map}>
                        <Image style={{ width: '100%', height: '100%' }} source={
                            {
                                uri: `${MapsApiRootUrl}center=${lat},${lon}&zoom=${zoom}&size=${mapWidth}x${mapHeight}&maptype=${mapType}&key=${GOOGLE_MAPS_API_KEY}`
                            }
                        } />
                    </View>

                    <BigButton n={navigation} component="Gender" text="doorgaan"
                        data={Object.assign(data, {})}
                    />
                </View>
            </View>
        </>
    );
};

const s = StyleSheet.create({
    map: {
        height: deviceHeight / 2,
        marginHorizontal: -mx,
        marginVertical: 15,
        borderWidth: 2,
    },
});

export default Location;

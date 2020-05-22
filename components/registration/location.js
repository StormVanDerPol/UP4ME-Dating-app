import React, { useState } from 'react';

import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
} from 'react-native';

import {
    deviceHeight,
    gs,
    mx,
    MapsApiRootUrl,
    deviceWidth,
    up4meColours,
} from '../../globals';

import Logo from '../logo';
import BigButton from '../bigbutton';

import { GOOGLE_MAPS_API_KEY } from '../../keys';
import { TextInput, ScrollView } from 'react-native-gesture-handler';

import RNSVG_location from '../../res/ui/rnsvg/rnsvg_location';

import { reqLocationPermission, updateGPSData } from '../../updategps';
import { debugMode } from '../../debugmode';
import Axios from 'axios';

const Location = () => {

    const zoom = 13;
    const mapWidth = Math.round(deviceWidth - mx * 2);
    // const mapHeight = deviceHeight / 2;
    const [mapHeight, setMapHeight] = useState();
    const mapType = 'roadmap'

    const [init, setInit] = useState(false);

    if (!init) {

        if (debugMode.gps)
            console.log('got new coords because my man youre kinda gay');

        reqLocationPermission();
        updateGPSData();
        setInit(true);
    }

    const [placeNameEdit, setPlaceNameEdit] = useState('Amsterdam');
    const [placeName, setPlaceName] = useState('Amsterdam');

    const handleData = () => {
        global.registData.placeName = placeName;

        if (debugMode.general)
            console.log('saved data: ', global.registData);
    }

    Axios.get(`${MapsApiRootUrl}center=${placeName}&scale=2&zoom=${zoom}&size=${mapWidth}x${mapHeight}&maptype=${mapType}&key=${GOOGLE_MAPS_API_KEY}`)
        .then((res) => {

            console.log(res);
        })
        .catch((pp) => {
            console.log(`${MapsApiRootUrl}center=${placeName}&scale=2&zoom=${zoom}&size=${mapWidth}x${mapHeight}&maptype=${mapType}&key=${GOOGLE_MAPS_API_KEY}`);
            console.log(pp);
        })
        .finally(() => {

        })

    return (
        <ScrollView>
            <View style={gs.screenWrapper}>
                <View>
                    <Logo />
                    <Text style={[s.header, gs.mainHeader]}>Mijn locatie</Text>
                </View>

                <View style={s.contentWrapper}>

                    <View style={s.locationSearchBar}>
                        <View style={s.locationIcon}>
                            <RNSVG_location />
                        </View>
                        <View>
                            <Text style={s.curLocationText}>Mijn huidige locatie:</Text>
                            <TextInput
                                style={s.inputLocation}
                                defaultValue="Amsterdam" onChangeText={(input) => setPlaceNameEdit(input)} onEndEditing={() => { setPlaceName(placeNameEdit) }} placeholder="Vul uw locatie in..." />
                        </View>
                        <View style={s.searchIcon}>
                            <RNSVG_location />
                        </View>
                    </View>

                    <View onLayout={(e) => {
                        setMapHeight(Math.round(e.nativeEvent.layout.height));
                        console.log('peeenis', e.nativeEvent.layout.height);
                    }} style={s.map}>
                        <Image style={{ width: '100%', height: '100%' }} source={
                            {
                                uri: `${MapsApiRootUrl}center=${placeName}&scale=2&zoom=${zoom}&size=${mapWidth}x${mapHeight}&maptype=${mapType}&key=${GOOGLE_MAPS_API_KEY}`
                            }
                        } />
                    </View>

                    <View style={s.bottom}>
                        <BigButton component="Gender" text="doorgaan"
                            callBack={handleData}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const s = StyleSheet.create({
    map: {
        flex: 2,
        width: Dimensions.get('window').width,
        marginVertical: 15,
    },

    locationSearchBar: {

        paddingHorizontal: 10,
        paddingVertical: 5,
        width: deviceWidth - mx,

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: up4meColours.darkGray,
    },

    bottom: {
        marginBottom: 25,
    },

    locationIcon: {
        height: 16,
        width: 16
    },

    curLocationText: {
        fontSize: 16,
    },

    inputLocation: {
        fontSize: 16,
        margin: 0,
        padding: 0,
    },

    searchIcon: {
        height: 32,
        width: 32
    },

    contentWrapper: {
        flex: 1,
        alignItems: "center",
    }

});

export default Location;

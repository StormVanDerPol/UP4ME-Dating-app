import React, { useState, useEffect } from 'react';

import Geolocation from '@react-native-community/geolocation';

import {
    StyleSheet,
    View,
    Text,
    Image,
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
import { TextInput } from 'react-native-gesture-handler';
import RNSVG_location from '../../res/ui/rnsvg/rnsvg_location';

import { reqLocationPermission, updateGPSData } from '../../updategps';

const Location = ({ route, navigation }) => {

    // const [data] = useState(route.params);

    const zoom = 10;
    const mapWidth = deviceWidth - mx * 2;
    const mapHeight = deviceHeight / 2;
    const mapType = 'roadmap'

    const [init, setInit] = useState(false);

    if (!init) {

        console.log('got new coords because my man youre kinda gay');

        reqLocationPermission();
        updateGPSData();
        setInit(true);
    }

    const [placeNameEdit, setPlaceNameEdit] = useState('Amsterdam');

    const [placeName, setPlaceName] = useState('Amsterdam');

    const save = () => {
        global.registData.placeName = placeName;
        console.log('saved data: ', global.registData);
    }

    return (
        <>
            <View style={gs.screenWrapper}>

                <View>
                    <Logo />
                    <Text style={[s.header, gs.mainHeader]}>Location</Text>
                </View>

                <View style={s.locationSearchBar}>
                    <View style={s.locationIcon}>
                        <RNSVG_location />
                    </View>
                    <TextInput defaultValue="Amsterdam" onChangeText={(input) => setPlaceNameEdit(input)} onEndEditing={() => { setPlaceName(placeNameEdit) }} placeholder="Vul uw locatie in..." />
                </View>

                <View style={gs.bottom}>

                    <View style={s.map}>
                        <Image style={{ width: '100%', height: '100%' }} source={
                            {
                                uri: `${MapsApiRootUrl}center=${placeName}&zoom=${zoom}&size=${mapWidth}x${mapHeight}&maptype=${mapType}&key=${GOOGLE_MAPS_API_KEY}`
                            }
                        } />
                    </View>


                    <BigButton n={navigation} component="Gender" text="doorgaan"
                        callBack={save}

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

    locationSearchBar: {
        padding: 5,
        backgroundColor: 'gray'
    },

    locationIcon: {
        height: 16,
        width: 16
    }
});

export default Location;

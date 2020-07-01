import React, { useState, useEffect, useRef } from 'react';
import getDeviceDimensions from '../../functions/dimensions';
import Axios from 'axios';
import FastImage from 'react-native-fast-image';
import { Button, View, StyleSheet } from 'react-native';
import TextQuicksand from '../TextQuicksand';
import { TextInput } from 'react-native-gesture-handler';
import { RegistStyles } from '../../styles/RegistStyles';
import UpForMeIcon, { iconIndex } from '../UpForMeIcon';
import up4meColours from '../../res/data/colours';
import { startWatchingGPS, requestPermission, getGPS, GPS_DATA } from '../../functions/gps';

const MapsApiRootUrl = 'https://maps.googleapis.com/maps/api/staticmap?';
const GOOGLE_MAPS_API_KEY = ***REMOVED***;

const InputLocation = ({ containerHeight = 350, onBlur = (placeName) => { } }) => {

    const loadedTimer = useRef(null);

    const [loaded, setLoaded] = useState(false);

    const mapParams = useRef({});

    const mapUri = useRef('');

    const placeName = useRef('');

    useEffect(() => {
        startWatchingGPS();

        loadedTimer.current = setInterval(() => {
            if (GPS_DATA.coords) {
                console.log('we got some coords', GPS_DATA.coords);

                mapParams.current = {
                    width: getDeviceDimensions('window', 'width'),
                    height: containerHeight,
                    scale: 2,
                    zoom: 11,
                    type: 'roadmap',
                    latitude: GPS_DATA.coords.latitude,
                    longitude: GPS_DATA.coords.longitude,
                },

                    mapUri.current = MapsApiRootUrl +
                    'center=' + mapParams.current.latitude + ',' + mapParams.current.longitude +
                    '&scale=' + mapParams.scale +
                    '&zoom=' + mapParams.current.zoom +
                    '&size=' + mapParams.current.width + 'x' + mapParams.current.width +
                    '&maptype=' + mapParams.current.type +
                    '&key=' + GOOGLE_MAPS_API_KEY;

                setLoaded(true);
                clearInterval(loadedTimer.current);
            }
            else {
                console.log('we got nothing', GPS_DATA.coords);
            }
        }, 1000)

    }, []);



    return (
        <>
            <View style={[RegistStyles.container, RegistStyles.botMargin, RegistStyles.topMargin]}>
                <TextQuicksand>Woonplaats</TextQuicksand>
                <TextInput style={[RegistStyles.inputText, RegistStyles.botMargin]}
                    onChangeText={(input) => {
                        placeName.current = input;
                    }}

                    onBlur={() => {
                        onBlur(placeName.current);
                    }}
                />
                <CurrentPlaceBar location={mapParams.location} />
            </View>

            {(loaded) ? <StaticMap params={mapParams.current} uri={mapUri.current} /> : <LoadingMap height={containerHeight} />}

        </>
    );
}

const LoadingMap = ({ height }) => {
    return (
        <View style={[styles.loadingMapContainer, {
            width: getDeviceDimensions('window', 'width'),
            height: height,
        }]}>
            <TextQuicksand>Loading</TextQuicksand>
        </View>
    )
}

const StaticMap = ({ params, uri }) => {


    console.log('on load static map', { params, uri })

    return (
        <View>
            <FastImage
                style={{
                    width: params.width,
                    height: params.height,
                }}
                source={{
                    uri: uri
                }}
            />

            <UpForMeIcon icon={iconIndex.location_pin} style={{
                ...styles.locationPin,
                left: params.width / 2 - 20,
                top: params.height / 2 - 60,
            }} />
        </View>
    )
}


const CurrentPlaceBar = () => {
    return (
        <View style={styles.currentPlaceBar}>
            <UpForMeIcon style={styles.currentPlaceBarIcon} icon={iconIndex.location} />
            <View style={styles.currentPlaceWrapper}>
                <TextQuicksand>Mijn huidige locatie:</TextQuicksand>
            </View>
            {/* <UpForMeIcon style={styles.currentPlaceBarIcon} icon={iconIndex.magnifying_glass} /> */}
        </View>
    )
}

const styles = StyleSheet.create({

    currentPlaceBar: {
        flexDirection: "row",
        padding: 12,
        backgroundColor: up4meColours.lightGray,
        alignItems: "center",
    },

    currentPlaceWrapper: {
        marginLeft: 10,
        flex: 1,
    },

    currentPlaceBarIcon: {
        width: 25,
        height: 25,
    },

    locationPin: {
        position: "absolute",
        width: 40,
        height: 40,
    },

    loadingMapContainer: {
        alignItems: "center",
        justifyContent: "center",
    }

})

export default InputLocation;
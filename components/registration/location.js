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
import RNSVG_ruler from '../../res/ui/rnsvg/rnsvg_ruler';
import RNSVG_vergroot from '../../res/ui/rnsvg/rnsvg_vergrottglas';
// import LinearGradient from 'react-native-linear-gradient';
import Svg, { Defs, Stop, Path, LinearGradient } from "react-native-svg"
import RNSVG_locatieding from '../../res/ui/rnsvg/rnsvg_locatieding';
import RNSVG_LocationPin from '../../res/ui/rnsvg/rnsvg_LocationPin';

const Location = () => {

    const zoom = 13;
    const mapWidth = Math.round(deviceWidth - mx * 2);
    // const mapHeight = deviceHeight / 2;
    const [mapHeight, setMapHeight] = useState(0);
    const mapType = 'roadmap'

    const [init, setInit] = useState(false);

    if (!init) {

        if (debugMode.gps)
            console.log('got new coords because my man youre kinda gay');

        reqLocationPermission();
        updateGPSData();
        setInit(true);
    }

    const [currentLocation, setCurrentLocation] = useState('Amsterdam');
    const [placeName, setPlaceName] = useState('');

    const handleData = () => {
        global.registData.placeName = placeName;

        if (debugMode.general)
            console.log('saved data: ', global.registData);
    }

    return (
        <ScrollView style={gs.body}>
            <View style={gs.screenWrapper}>
                <View>
                    <Logo />
                    <Text style={[s.header, gs.mainHeader]}>Mijn locatie</Text>
                </View>

                <View style={s.contentWrapper}>


                    <Text style={{ alignSelf: "flex-start" }}>Woonplaats</Text>

                    <TextInput onChangeText={(input) => { setPlaceName(input) }}
                        style={{
                            borderBottomColor: up4meColours.lineGray,
                            borderBottomWidth: 1,
                            width: deviceWidth - mx,
                            marginBottom: 30,
                        }}

                    />



                    <View style={s.locationSearchBar}>
                        <View style={s.locationIcon}>
                            <RNSVG_location />
                        </View>
                        <View>
                            <Text style={s.curLocationText}>Mijn huidige locatie:</Text>

                            {/* <Text style={[s.inputLocation]}>{currentLocation}</Text> */}

                            {/* <TextInput
                                style={s.inputLocation}
                                defaultValue="Amsterdam" onChangeText={(input) => setPlaceNameEdit(input)} onEndEditing={() => { setPlaceName(placeNameEdit) }} placeholder="Vul uw locatie in..." /> */}
                        </View>
                        <View style={s.searchIcon}>
                            <RNSVG_vergroot />
                        </View>
                    </View>

                    <View onLayout={(e) => {
                        setMapHeight(Math.round(e.nativeEvent.layout.height));
                        if (debugMode.general)
                            console.log('peeenis', e.nativeEvent.layout.height);
                    }} style={{ ...s.map, width: mapWidth + mx, height: mapHeight }}>
                        <Image style={{ width: '100%', height: '100%' }} source={
                            {
                                uri: `${MapsApiRootUrl}center=${currentLocation}&scale=2&zoom=${zoom}&size=${mapWidth}x${mapHeight}&maptype=${mapType}&key=${GOOGLE_MAPS_API_KEY}`
                            }
                        } />

                        <View style={{
                            // borderWidth: 2,
                            width: 50,
                            height: 50,
                            position: "absolute",
                            top: mapHeight / 2 - 50,
                            // bottom: 10,
                            left: mapWidth / 2 - 25,
                            // right: 10
                        }}>
                            {/* <RNSVG_locatieding></RNSVG_locatieding> */}
                            <RNSVG_LocationPin />

                            <View
                                style={{
                                    position: "absolute",
                                    top: '30%',
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    alignItems: "center",
                                }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: 16
                                }}>
                                    {/* {currentLocation} */}
                                </Text>
                            </View>

                        </View>

                        {/* <View style={{
                            position: "absolute",
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0
                        }}>
                            <LocationMarker title={currentLocation} />
                        </View> */}

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



// function LocationMarker({ title, width = 100, height = 100, style = {} }) {
//     return (

//         // <View style={style}>
//         <View style={{ ...style, borderWidth: 1 }}>
//             <Svg width={'100%'} height={'100%'} viewBox="0 0 131 38">
//                 <Defs>
//                     <LinearGradient x1="100%" y1="50%" x2="0%" y2="50%" id="prefix__a">
//                         <Stop stopColor="#F5CA23" offset="0%" />
//                         <Stop stopColor="#F5C423" offset="23.325%" />
//                         <Stop stopColor="#F5A623" offset="100%" />
//                     </LinearGradient>

//                 </Defs>
//                 <Path
//                     d="M116.653 0C124.577 0 131 6.423 131 14.347c0 7.924-6.423 14.347-14.347 14.347l-42.383-.001L65.5 38l-8.77-9.307H14.347C6.423 28.694 0 22.272 0 14.348S6.423 0 14.347 0h102.306z"
//                     fill="url(#prefix__a)"
//                     fillRule="evenodd"
//                 />
//             </Svg>
//             <View style={{
//                 position: "absolute",
//                 top: height / 5,
//                 left: 0,
//                 right: 0,
//                 bottom: 0,

//                 // justifyContent: "center",
//                 alignItems: "center",
//             }}>
//                 <Text style={{
//                     borderWidth: 1,
//                     fontSize: 20,
//                     color: '#f00',
//                 }}>{title}</Text>
//             </View>
//         </View>
//     )
// }


const s = StyleSheet.create({
    map: {
        flex: 2,
        // width: Dimensions.get('window').width,
        marginVertical: 15,
    },

    locationSearchBar: {

        paddingHorizontal: 10,
        paddingVertical: 5,
        width: deviceWidth - mx,

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: up4meColours.lightGray,
    },

    bottom: {
        marginBottom: 25,
    },

    locationIcon: {
        height: 16,
        width: 16,
        // color: "black",
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

import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import UpForMeIcon, { iconIndex } from '../UpForMeIcon';
import { DATA_STORE } from '../../stored/dataStore';
import TextQuicksand from '../TextQuicksand';
import { ArrowButtonDropDown } from '../UpForMeArrowButtons';
import { WheelPicker } from 'react-native-wheel-picker-android';
import { FlatList } from 'react-native-gesture-handler';
import { dodoFlight } from '../../functions/dodoAirlines';
import endpoints, { getEndpoint } from '../../res/data/endpoints';

const BigLocationList = () => {

    var places = Object.keys(DATA_STORE.locations)
    var parts = {};

    for (let place of places) {

        parts[place] = [];

        for (let part of Object.keys(DATA_STORE.locations[place])) {

            parts[place].push(part);

        }

    }

    console.log('this bs', places, parts);

    const [selected, setSelected] = useState({
        place: places[0],
        part: parts[places[0]][0],
    })

    console.log(parts[selected.place])

    return (
        <>
            <ArrowButtonDropDown
                end={selected.part == 'null'}
                header={selected.place}>

                <WheelPicker
                    initPosition={places.indexOf(selected.place)}
                    data={places}
                    onItemSelected={(i) => {
                        setSelected({
                            place: places[i],
                            part: parts[places[i]][0]
                        });
                    }}
                />

            </ArrowButtonDropDown>

            {
                (selected.part == 'null') ? <></> :
                    <ArrowButtonDropDown
                        end={true}
                        header={selected.part} >

                        <WheelPicker
                            initPosition={parts[selected.place].indexOf(selected.part)}
                            data={parts[selected.place]}
                            onItemSelected={(i) => setSelected({
                                ...selected,
                                part: parts[selected.place][i]
                            })}
                        />

                    </ArrowButtonDropDown>
            }

            <View>

                {/* {DATA_STORE.locations[selected.place][selected.part].map((location, i) => {


                    // console.log(selected);
                    // console.log(DATA_STORE.locations);
                    // console.log(location)

                    return <LocationItem key={i} item={location} />
                })} */}

                <FlatList
                    data={DATA_STORE.locations[selected.place][selected.part]}
                    renderItem={LocationItem}
                    initialNumToRender={1}
                    maxToRenderPerBatch={1}
                    windowSize={2}

                />

            </View>

        </>
    );
}


const LocationItem = ({ item }) => {

    return (
        <View style={resitemStyles.resitem}>

            <View style={resitemStyles.resitemImageSection}>
                <FastImage style={{ width: 125, height: 150, }}
                    source={{
                        uri: item.photo,
                    }}
                />
            </View>

            <View style={resitemStyles.resitemInfoSection}>

                <TextQuicksand>{item.id}</TextQuicksand>
                <TextQuicksand style={resitemStyles.resitemName}>{item.name}</TextQuicksand>
                <TextQuicksand>{item.address}</TextQuicksand>
                <TextQuicksand>{item.postalCode} {item.city}</TextQuicksand>

                {/* <View style={resitemStyles.resitemRatingContainer}>

                    {[1, 2, 3, 4, 5].map((i) => {

                        return (i <= rating) ?
                            <UpForMeIcon icon={iconIndex.restaurant_star} style={resitemStyles.resitemRatingIcon} /> :
                            <UpForMeIcon icon={iconIndex.restaurant_star_gray} style={resitemStyles.resitemRatingIcon} />
                    })}
                </View> */}
            </View>

            {/* {(fav) ? <UpForMeIcon style={resitemStyles.resitemFavIcon} icon={iconIndex.restaurant_fav_heart} /> : <></>} */}
        </View>
    )
}

const resitemStyles = StyleSheet.create({
    resitemRatingContainer: {
        justifyContent: "space-between",
        flexDirection: "row",
    },

    resitemFavIcon: {
        position: "absolute",
        right: 10,
        top: 10,
        width: 20,
        height: 20,
    },

    resitemRatingIcon: {
        marginTop: 25,
        width: 25,
        height: 25,
    },

    resitemName: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },

    resitem: {
        borderRadius: 25,
        backgroundColor: "white",
        overflow: "hidden",

        flexDirection: "row",

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.6,
        shadowRadius: 2,
        elevation: 5,

        marginHorizontal: 25,
        marginVertical: 12.5,
    },

    resitemContainer: {
        marginTop: 12.5,
    },

    resitemInfoSection: {
        padding: 25,
        flex: 1,
    },

    resitemImageSection: {
        // flex: 1,
        height: 150,
    },
})

export default BigLocationList;
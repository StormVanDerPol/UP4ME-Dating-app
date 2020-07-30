import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { DATA_STORE } from '../../stored/dataStore';
import TextQuicksand from '../TextQuicksand';
import { ArrowButtonDropDown } from '../UpForMeArrowButtons';
import { WheelPicker } from 'react-native-wheel-picker-android';
import { FlatList, TapGestureHandler, State } from 'react-native-gesture-handler';

const BigLocationList = ({ heightSubtract = 0, onPressItem = (resid) => { } }) => {

    var places = Object.keys(DATA_STORE.locations)
    var parts = {};

    for (let place of places) {

        parts[place] = [];

        for (let part of Object.keys(DATA_STORE.locations[place])) {
            parts[place].push(part);
        }
    }

    const [selected, setSelected] = useState({
        place: places[0],
        part: parts[places[0]][0],
    })

    const LocationItem = ({ item }) => {

        return (
            <TapGestureHandler onHandlerStateChange={({ nativeEvent }) => {
                if (nativeEvent.state === State.END) {
                    onPressItem(item.resid);
                }
            }}>
                <View style={styles.resitem}>

                    <View style={styles.resitemImageSection}>
                        <FastImage style={{ width: 150, height: 150, }}
                            source={{
                                uri: item.photo,
                            }}
                        />
                    </View>

                    <View style={styles.resitemInfoSection}>
                        <TextQuicksand style={styles.resitemName} type={'Bold'}>{item.name}</TextQuicksand>
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
            </TapGestureHandler>
        )
    }

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
                <FlatList
                    style={{ height: (selected.part == 'null') ? 580 - heightSubtract : 530 - heightSubtract }}
                    data={DATA_STORE.locations[selected.place][selected.part]}
                    renderItem={LocationItem}
                    initialNumToRender={10}
                    maxToRenderPerBatch={20}
                    windowSize={21}
                    keyExtractor={item => item.key}
                />
            </View>
        </>
    );
}


const styles = StyleSheet.create({
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
        marginBottom: 10,
    },

    resitem: {

        height: 150,

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
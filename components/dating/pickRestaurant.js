import React, { useState, useRef, useEffect } from 'react';

import { StyleSheet, View, Text, Image } from "react-native";

import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";

import { gs, mx, up4meColours } from "../../globals";

import TopButton from "../topButton";
import RNSVG_ruler from "../../res/ui/rnsvg/rnsvg_ruler";

import {
    WheelPicker,
    TimePicker,
    DatePicker
} from "react-native-wheel-picker-android";
import RNSVG_edit from '../../res/ui/rnsvg/rnsvg_edit';
import Axios from 'axios';
import { endpointGetRestaurantList } from '../../endpoints';

function PickRestaurant() {

    const [fu, forceUpdate] = useState(0);

    const [currentPlace, setCurrentPlace] = useState();
    const _selectedPlaceID = useRef(0);

    const [currentPlacePart, setCurrentPlacePart] = useState();
    const _selectedPlacePartID = useRef(0);

    const [dropdownActive, setDropdownActive] = useState(-1);

    const _init = useRef(false);

    const [loaded, setLoaded] = useState(false);

    const _restaurantData = useRef({});
    const _places = useRef([]);
    const _placeParts = useRef([]);

    const _imageHeight = useRef(0);

    if (!_init.current) {

        Axios.get(`${endpointGetRestaurantList}`)
            .then((res) => {

                for (restaurant of res.data) {


                    if (!_restaurantData.current[restaurant.stad]) {
                        _restaurantData.current[restaurant.stad] = {}
                    }

                    if (!_restaurantData.current[restaurant.stad][restaurant.stadsdeel]) {
                        _restaurantData.current[restaurant.stad][restaurant.stadsdeel] = [];
                    }


                    _restaurantData.current[restaurant.stad][restaurant.stadsdeel].push(
                        {
                            name: restaurant.naam,
                            address: restaurant.straat + ' ' + restaurant.huisnummer,
                            postalcode: restaurant.Postcode,
                            rating: 3,
                            favourite: true,
                            image: restaurant.foto1,
                        }
                    )

                    if (!_places.current.includes(restaurant.stad)) {
                        _places.current.push(restaurant.stad)

                        _placeParts.current[restaurant.stad] = [];
                    }

                    if (!_placeParts.current[restaurant.stad].includes(restaurant.stadsdeel)) {
                        _placeParts.current[restaurant.stad].push(restaurant.stadsdeel)
                    }

                }
            })
            .catch((err) => {
                console.log('error getting restaurant', err);
            })
            .finally(() => {

                setCurrentPlace(_places.current[0])
                setCurrentPlacePart(_placeParts.current[_places.current[0]][0]);

                console.log(_placeParts.current, _places.current, _restaurantData.current);

                setLoaded(true);
            });

        _init.current = true;
    }

    function toggleDropdown(id) {

        if (dropdownActive != id) {
            setDropdownActive(id);
        }
        else {
            setDropdownActive(-1);
        }
    }

    function renderPlacePicker() {
        if (dropdownActive == 0) {
            return (
                <View style={s.pickerContainer} >
                    <WheelPicker
                        selectedItem={_selectedPlaceID.current}
                        data={_places.current}
                        onItemSelected={(res) => {
                            setCurrentPlace(_places.current[res]);
                            setCurrentPlacePart(_placeParts.current[_places.current[res]][0]);
                            _selectedPlaceID.current = res;
                        }}
                    />
                </View>
            );
        }
        else {
            return (
                <></>
            );
        }
    }

    function renderPartPicker() {


        if (dropdownActive == 1) {
            return (
                <View style={s.pickerContainer} >
                    <WheelPicker
                        selectedItem={_selectedPlacePartID.current}
                        data={_placeParts.current[currentPlace]}
                        onItemSelected={(res) => {
                            setCurrentPlacePart(_placeParts.current[currentPlace][res])
                            _selectedPlacePartID.current = res;
                        }}
                    />
                </View>
            );
        }
        else {
            return (
                <></>
            );
        }
    }

    function renderPartDropdown() {

        console.log('should render part dropdown', (dropdownActive == -1 || dropdownActive == 1 && _placeParts.current[currentPlace][0]));

        console.log('bro what', _placeParts.current[currentPlace][0]);

        if ((dropdownActive == -1 || dropdownActive == 1) && _placeParts.current[currentPlace][0]) {
            return (
                <TouchableWithoutFeedback
                    style={s.dropdown}
                    onPress={() => {
                        toggleDropdown(1)
                    }}>
                    <Text>{currentPlacePart}</Text>
                    <View style={s.dropwdownIconWrapper}>
                        <RNSVG_ruler />
                    </View>
                </TouchableWithoutFeedback>
            );
        }
        else {
            return (
                <></>
            );
        }
    }

    function renderRestaurantItems() {
        if (dropdownActive == -1) {

            if (_restaurantData.current[currentPlace]) {

                let currentList = _restaurantData.current[currentPlace][currentPlacePart];

                console.log('currentList', currentList);

                if (currentList) {

                    if (currentList.length > 0) {

                        return (
                            <>
                                {_restaurantData.current[currentPlace][currentPlacePart].map((restaurant, i) => {
                                    return (
                                        <View key={i} style={s.restaurantItem}>

                                            <View style={s.restaurantItemImageSection}
                                                onLayout={(e) => {

                                                    if (_imageHeight.current != e.nativeEvent.layout.height) {
                                                        _imageHeight.current = e.nativeEvent.layout.height;

                                                        forceUpdate(fu + 1);
                                                    }
                                                }}>
                                                <Image
                                                    source={
                                                        {
                                                            uri: restaurant.image,
                                                            width: '100%',
                                                            height: _imageHeight.current,
                                                        }
                                                    }
                                                />

                                            </View>

                                            <View style={s.restaurantItemInfoSection}>

                                                <Text style={s.restaurantItemName}>{restaurant.name}</Text>
                                                <Text>{restaurant.address}</Text>
                                                <Text>{restaurant.postalcode} {currentPlace}</Text>

                                                <View style={s.restaurantItemRatingContainer}>

                                                    {[1, 2, 3, 4, 5].map((i) => {

                                                        if (i <= restaurant.rating) {

                                                            return (
                                                                <View key={i} style={s.restaurantItemStarIconWrapper}>
                                                                    <RNSVG_ruler />
                                                                </View>
                                                            );
                                                        }
                                                        else {
                                                            return (
                                                                <View key={i} style={s.restaurantItemStarIconWrapper}>
                                                                    <RNSVG_edit />
                                                                </View>
                                                            );
                                                        }
                                                    })}

                                                </View>
                                            </View>

                                            <View style={s.restaurantItemFavIconWrapper}>
                                                <RNSVG_ruler />
                                            </View>

                                        </View>
                                    )
                                })}
                            </>);
                    }

                    else {
                        return <Text>No restaurants</Text>;
                    }
                }
                else {
                    return <Text>Part undefined</Text>;
                }
            }
            else {
                return <Text>Place undefined</Text>;
            }
        }
        else {
            return <></>;
        }
    }

    function renderContent() {
        if (loaded) {
            return (
                <>
                    <View style={s.dropdownWrapper}>
                        <TouchableWithoutFeedback
                            style={s.dropdown}
                            onPress={() => {
                                toggleDropdown(0)
                            }}>
                            <Text>{currentPlace}</Text>
                            <View style={s.dropwdownIconWrapper}>
                                <RNSVG_ruler />
                            </View>
                        </TouchableWithoutFeedback>
                        {renderPlacePicker()}
                    </View>

                    <View style={s.dropdownWrapper}>
                        {renderPartDropdown()}

                        {renderPartPicker()}
                    </View>
                    <View style={s.restaurantItemContainer}>
                        {renderRestaurantItems()}
                    </View>
                </>
            );
        }
    }

    return (

        <ScrollView style={gs.body}>

            <TopButton header={'Date Plannen'} route={'DatesOverview'} />

            <View style={s.headerContainer} >
                <Text style={s.header}>Restaurants</Text>
                <View style={s.headerIconWrapper}>
                    <RNSVG_ruler />
                </View>
            </View>

            {renderContent()}

            {/* <View style={s.pickerContainer} >
                <DatePicker
                    format24={true}
                    hideAM={true}
                    hideHours={true}
                    hideMinutes={true}
                    onDateSelected={(res) => { }}
                />
            </View>

            <View style={s.pickerContainer} >
                <TimePicker
                    format24={true}
                    onTimeSelected={(res) => { }}
                />
            </View> */}


        </ScrollView >

    );
}

const s = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-around"
    },

    headerIconWrapper: {
        width: 40,
        height: 40,
    },

    header: {
        fontSize: 25,
    },

    pickerContainer: {
        marginHorizontal: mx,
    },

    dropdown: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: mx,
        paddingVertical: 10,
    },

    dropdownWrapper: {
        borderBottomWidth: 1,
        borderBottomColor: up4meColours.lineGray,
    },

    dropwdownIconWrapper: {
        width: 25,
        height: 25,
    },

    restaurantItemRatingContainer: {
        justifyContent: "space-between",
        flexDirection: "row",
    },

    restaurantItemFavIconWrapper: {
        position: "absolute",
        right: 10,
        top: 10,
        width: 20,
        height: 20,
    },

    restaurantItemStarIconWrapper: {
        marginTop: 25,
        width: 25,
        height: 25,
    },

    restaurantItemName: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },

    restaurantItem: {
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

    restaurantItemContainer: {
        marginTop: 12.5,
    },

    restaurantItemInfoSection: {
        padding: 25,
        flex: 1,
    },

    restaurantItemImageSection: {
        flex: 1,
    },
});

export default PickRestaurant;
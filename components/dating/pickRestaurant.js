import React, { useState, useRef } from 'react';

import { StyleSheet, View, Text } from "react-native";

import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";

import { gs, mx, up4meColours } from "../../globals";

import TopButton from "../topButton";
import RNSVG_ruler from "../../res/ui/rnsvg/rnsvg_ruler";

import {
    WheelPicker,
    TimePicker,
    DatePicker
} from "react-native-wheel-picker-android";

const tempPlaces = [
    'Amsterdam',
    'pp'
]


const tempPlaceParts = {
    Amsterdam: [
        'West',
        'Centrum',
        'Noord',
        'Zuid',
        'Oost',
    ],

    pp: [
        '1',
        '2',
        '3',
        '4',
    ]
}

const tempRestaurantList = {
    Amsterdam: {
        West: [
            {
                name: 'Abbey',
                address: 'Admiraal de Ruijterweg 404',
                postalcode: '1055 ND',
                rating: 5,
                favourite: true,
            },

            {
                name: "Fred's kitchen",
                address: 'Kraanspoor 5',
                postalcode: '1033 SC',
                rating: 3,
                favourite: false,
            }
        ],

        Noord: [

        ],
    }
}

function PickRestaurant() {

    const [currentPlace, setCurrentPlace] = useState(tempPlaces[0]);
    const _selectedPlaceID = useRef(0);

    const [currentPlacePart, setCurrentPlacePart] = useState(tempPlaceParts[tempPlaces[0]][0]);
    const _selectedPlacePartID = useRef(0);

    const [dropdownActive, setDropdownActive] = useState(-1);

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
                        data={tempPlaces}
                        onItemSelected={(res) => {
                            setCurrentPlace(tempPlaces[res]);
                            setCurrentPlacePart(tempPlaceParts[tempPlaces[res]][0]);
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
                        data={tempPlaceParts[currentPlace]}
                        onItemSelected={(res) => {
                            setCurrentPlacePart(tempPlaceParts[currentPlace][res])
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
        if (dropdownActive == -1 || dropdownActive == 1) {
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

            if (tempRestaurantList[currentPlace]) {

                let currentList = tempRestaurantList[currentPlace][currentPlacePart];

                if (currentList) {

                    if (currentList.length > 0) {

                        return (
                            <>
                                {tempRestaurantList[currentPlace][currentPlacePart].map((restaurant, i) => {
                                    return (
                                        <View>
                                            <Text>{restaurant.name}</Text>
                                            <Text>{restaurant.address}</Text>
                                            <Text>{restaurant.postalcode} {currentPlace}</Text>

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

    return (

        <ScrollView style={gs.body}>

            <TopButton header={'Date Plannen'} route={'DatesOverview'} />

            <View style={s.headerContainer} >
                <Text style={s.header}>Restaurants</Text>
                <View style={s.headerIconWrapper}>
                    <RNSVG_ruler />
                </View>
            </View>

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

            {renderRestaurantItems()}

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
    }
});

export default PickRestaurant;
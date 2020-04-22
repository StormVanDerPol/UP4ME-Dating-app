import React, { useState } from 'react';
import { SliderBox } from "react-native-image-slider-box";

import {
    StyleSheet, Text, View,
} from 'react-native';
import { deviceHeight } from '../../globals';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

const UserProfile = ({ navigation }) => {

    const [images, setImages] = useState([
        require('../../temp/img/mememe.png'),
        "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?water",
        "https://source.unsplash.com/1024x768/?girl",
        "https://source.unsplash.com/1024x768/?tree",
    ]);


    return (
        <>
            <ScrollView>

                <View style={s.container}>
                    <SliderBox
                        sliderBoxHeight={'100%'}
                        autoplay={'true'}
                        dotColor={"#ffd1f3"}
                        // dotStyle={{
                        //     width: 15,
                        // }}
                        paginationBoxVerticalPadding={'85%'}

                        images={images}
                        onCurrentImagePressed={index =>
                            console.warn(`image ${index} pressed`)
                        }
                    />
                    <View style={s.whiteContainer}>
                        <Text style={s.redText}>Name, age</Text>

                        <Text style={s.whiteText}>icon location</Text>
                        <Text style={s.whiteText}>icon thing</Text>
                    </View>

                </View>

                <View style={s.flexing}>
                    <Text>icon height</Text>
                    <Text>icon number</Text>
                </View>

                <View>
                    <Text style={s.des}>discription------Je kunt mij ’s ochtends wakker maken voor een kop koffie.</Text>

                    <View style={s.filter}>

                        <Text style={s.fillerBorder}>filter</Text>
                        <Text style={s.fillerBorder}>filter</Text>
                        <Text style={s.fillerBorder}>filter</Text>
                        <Text style={s.fillerBorder}>filter</Text>
                        <Text style={s.fillerBorder}>filter</Text>



                    </View>
                </View>

                <View style={s.matchView}>
                    <View style={s.matchFlex}>

                        <TouchableOpacity style={s.matchBTN}>
                            <Text style={s.line}>NO</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={s.matchBTN}>
                            <Text style={s.line}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>


        </>
    );
}

const s = StyleSheet.create({
    container: {
        height: deviceHeight - 300
    },
    whiteContainer: {
        position: 'absolute',
        left: 20,

        top: '70%',
        // color: 'red',
    },
    redText: {
        color: 'red',
        fontSize: 35,
        // position: 'relative',
    },
    whiteText: {
        fontSize: 18,
        color: 'red',
    },
    flexing: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: '5%',
    },

    des: {
        fontSize: 16,

        alignItems: 'center',
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingBottom: '5%',
    },
    filter: {
        // borderRadius: 20,
        // borderWidth: 1,
        // borderColor: 'black',
        marginBottom: '1%',
        justifyContent: 'space-around',
        flexDirection: 'row',
        paddingBottom: '5%',
        flexWrap: "wrap",
    },
    fillerBorder: {
        fontSize: 17,
        borderWidth: 2,
        borderColor: 'red',
        borderRadius: 20,
        paddingHorizontal: '2%',
        paddingTop: '1%',
        marginHorizontal: 20,
        marginVertical: 10
    },
    matchView: {
        // borderColor: '#AARRGGBB',
        // borderTopColor: 'pink',
        // borderWidthTop: 2,
    },
    matchFlex: {
        marginHorizontal: '15%',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    matchBTN: {
        width: 80,
        height: 80,
        borderRadius: 100,
        borderColor: 'pink',
        borderWidth: 2,
        backgroundColor: "white",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,


    },
    line: {
        lineHeight: 80,
        paddingLeft: '35%',
    }

});

export default UserProfile;
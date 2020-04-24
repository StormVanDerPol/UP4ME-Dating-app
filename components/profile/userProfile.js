import React, { useState } from 'react';
import { SliderBox } from "react-native-image-slider-box";

import {
    StyleSheet, Text, View,
} from 'react-native';

import { deviceHeight, apiUrl, addMimeType } from '../../globals';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

import Axios from 'axios';

import moment from 'moment';

const UserProfile = ({ route, navigation }) => {

    const [data] = useState(route.params);

    const [images, setImages] = useState([]);
    const [name, setName] = useState('Name');
    const [age, setAge] = useState(0);
    const [placeName, setPlaceName] = useState('Place');
    const [height, setHeight] = useState(0);
    const [job, setJob] = useState('');
    const [desc, setDesc] = useState('desc')
    const [profProps, setProfProps] = useState({});

    const retrieveProfileData = (userid) => {
        Axios.get(`${apiUrl}/retrieve/profile/of/${userid}`)
            .then((res) => {

                console.log(res.data[0]);

                // if (res.data[0].foto1)
                //     images.push(res.data[0].foto1);
                // if (res.data[0].foto2)
                //     images.push(res.data[0].foto2);
                // if (res.data[0].foto3)
                //     images.push(res.data[0].foto3);
                // if (res.data[0].foto4)
                //     images.push(res.data[0].foto4);
                // if (res.data[0].foto5)
                //     images.push(res.data[0].foto5);
                // if (res.data[0].foto6)
                //     images.push(res.data[0].foto6);


                let imagesToCheck = [
                    res.data[0].foto1,
                    res.data[0].foto2,
                    res.data[0].foto3,
                    res.data[0].foto4,
                    res.data[0].foto5,
                    res.data[0].foto6,
                ];

                for (let image of imagesToCheck) {

                    if (image) {
                        images.push(image);
                    }
                }

                setImages([...images]);

                setName(res.data[0].naam);

                setPlaceName(res.data[0].zoektin);

                setHeight(res.data[0].lengte / 100);

                setJob(res.data[0].beroep);

                setDesc(res.data[0].profieltext);

                setProfProps({
                    sport: res.data[0].sporten,
                    party: res.data[0].feesten,
                    smoking: res.data[0].roken,
                    alcohol: res.data[0].alcohol,
                    politics: res.data[0].stemmen,
                    work: res.data[0].uur40,
                    kids: res.data[0].kids,
                    kidWish: res.data[0].kidwens,
                    food: res.data[0].eten
                });

                setAge(calcAge(res.data[0].geboortedatum));

            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                console.log('images:', images);
            })
    }

    var pp = 'asa'.substr(0, 2)

    const calcAge = (bdateApi) => {

        let now = new Date;

        let bdateApiStr = bdateApi + '';

        let curdate = {
            year: now.getFullYear(),
            month: now.getMonth(),
            day: now.getDate()
        }

        console.log(curdate);

        let bdate = {
            year: parseInt(bdateApiStr.substring(0, 4), 10),
            month: Math.min(bdateApiStr.substring(4, 6), 12),
            day: Math.min(bdateApiStr.substring(6), 31)
        }

        console.log(bdate);

        let a = moment(`${bdate.day}/${bdate.month}/${bdate.year}`, 'D/M/YYYY')
        let b = moment(`${curdate.day}/${curdate.month}/${curdate.year}`, 'D/M/YYYY')

        let dateDiff = b.diff(a, 'years');

        console.log(dateDiff);

        return dateDiff;
    }

    const [init, setInit] = useState(false);

    if (!init) {
        retrieveProfileData(100)
        setInit(true);
    }


    return (
        <>
            <ScrollView>

                <View style={s.container}>
                    <SliderBox
                        sliderBoxHeight={'100%'}
                        autoplay={false}
                        dotColor={"#ffd1f3"}

                        // dotStyle={{
                        //     width: 15,
                        // }}

                        paginationBoxVerticalPadding={deviceHeight - 100}

                        resizeMode={'cover'}

                        images={images}
                        onCurrentImagePressed={index =>
                            console.warn(`image ${index} pressed`)
                        }
                    />
                    <View style={s.whiteContainer}>
                        <Text style={s.redText}>{name}, {age}</Text>

                        <Text style={s.whiteText}>icon {placeName}</Text>
                        <Text style={s.whiteText}>icon {job}</Text>
                    </View>

                </View>

                <View style={s.flexing}>
                    <Text>icon {height}</Text>
                    <Text>icon number</Text>
                </View>

                <View>
                    <Text style={s.des}>{desc}</Text>

                    <View style={s.filter}>

                        <Text style={s.fillerBorder}>{profProps.sport}</Text>
                        <Text style={s.fillerBorder}>{profProps.party}</Text>
                        <Text style={s.fillerBorder}>{profProps.smoking}</Text>
                        <Text style={s.fillerBorder}>{profProps.alcohol}</Text>

                        <Text style={s.fillerBorder}>{profProps.politics}</Text>
                        <Text style={s.fillerBorder}>{profProps.work}</Text>
                        <Text style={s.fillerBorder}>{profProps.kids}</Text>
                        <Text style={s.fillerBorder}>{profProps.kidWish}</Text>
                        <Text style={s.fillerBorder}>{profProps.food}</Text>

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

        height: deviceHeight - 50,
        // borderWidth: 2,
    },
    whiteContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20
        // color: 'red',
    },
    redText: {
        color: 'black',
        fontSize: 35,
        // position: 'relative',
    },
    whiteText: {
        fontSize: 18,
        color: 'black',
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
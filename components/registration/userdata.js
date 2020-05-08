
import React, { useState, useEffect } from 'react';

import {
    StyleSheet, Text, View, TextInput,
} from 'react-native';

import Slider from '@react-native-community/slider';

import { gs } from '../../globals';
import Logo from '../logo';
import BigButton from '../bigbutton';

import thumbSlider from '../../res/sliderThumb.png'


const UserData = ({ route, navigation }) => {

    const [data] = useState(route.params);

    const [name, setName] = useState('')
    const [height, setHeight] = useState(1.75);
    const [job, setJob] = useState('');

    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const [bday, setBday] = useState(0);

    const concatBday = () => {
        setBday(year + month + day);
    }

    return (
        <>
            <View style={gs.screenWrapper}>

                <View>
                    <Logo />
                    <Text style={[s.header, gs.mainHeader]}>Mijn gegevens</Text>
                </View>

                <Text style={s.subheader}>Mijn naam</Text>
                <TextInput style={s.input} onChangeText={(input) => setName(input)} />

                <Text style={s.subheader}>Mijn geboortedatum</Text>
                <View style={s.center}>

                    <TextInput keyboardType='numeric'
                        onChangeText={(input) => {
                            if (input.length == 2) {
                                setDay(input);
                            }
                        }}
                        maxLength={2} style={s.input} placeholder={'DAG'}
                    />

                    <TextInput keyboardType='numeric'
                        onChangeText={(input) => {
                            if (input.length == 2) {
                                setMonth(input);
                            }
                        }}
                        maxLength={2} style={s.input} placeholder={'MAAND'}
                    />

                    <TextInput keyboardType='numeric'
                        onChangeText={(input) => {
                            if (input.length == 4) {
                                setYear(input);
                            }
                        }}
                        maxLength={4} style={s.input} placeholder={'JAAR'}
                    />

                </View>


                <View style={s.spaceBetween}>
                    <Text style={s.subheader}>Mijn lengte</Text>
                    <Text style={s.heightIndicator}>{height}</Text>
                </View>

                <Slider style={s.slider}
                    onValueChange={(height) => setHeight(parseFloat(height.toFixed(2)))}
                    minimumValue={1.20}
                    maximumValue={2.50}
                    minimumTrackTintColor="#888888"
                    thumbImage={thumbSlider}
                    value={height}
                />

                <Text style={s.subheader}>Mijn beroep</Text>
                <TextInput style={s.input} maxLength={100} onChangeText={(input) => { setJob(input) }} />

                <View style={gs.bottom}>
                    <BigButton n={navigation} component="Location" text="doorgaan"
                        disabled={!(name && job && day.length == 2 && month.length == 2 && year.length == 4)}

                        callBack={concatBday}
                        data={Object.assign(data, { name, bday, day, month, year, height, job })}
                    />
                </View>
            </View>
        </>
    );

}

const s = StyleSheet.create({

    slider: {
        marginTop: 15
    },

    input: {
        // marginBottom: 25,
        borderBottomColor: "gray",
        borderBottomWidth: 1
    },

    inputSlash: {
        alignItems: "center"
    },

    header: {
        marginTop: 20
    },

    subheader: {
        marginTop: 25
    },

    heightIndicator: {
        marginTop: 25,
        color: "gray"
    },

    center: {
        flexDirection: "row",
        justifyContent: "center"
    },

    spaceBetween: {
        flexDirection: "row",
        justifyContent: "space-between"
    }

});

export default UserData;

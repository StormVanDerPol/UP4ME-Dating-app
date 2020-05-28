import React from 'react';
import { gs, up4meColours } from '../../globals';

import Nav from '../nav';

import {
    StyleSheet, View, Image, Text,
} from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

import RNSVG_ruler from '../../res/ui/rnsvg/rnsvg_ruler';
import BlepButton from '../blepButton';


const Overview = () => {
    return (

        <ScrollView style={[gs.body]}>

            <Nav currentSection={'Matches'} />

            <View style={s.underline}>
                <BlepButton active={0} title={['Matches', 'Dates']} route={[null, 'DatesOverview']} />
            </View>

            <MatchItem name={'Roeland'} age={'72'} city={'Berlin'} />
            <MatchItem name={'My neck'} age={'10'} city={'Berlin'} />
            <MatchItem name={'My pussy'} age={'43'} city={'Berlin'} />
            <MatchItem name={'My crack'} age={'49'} city={'Berlin'} />

        </ScrollView >
    );
}

function MatchItem(p) {

    return (
        <TouchableOpacity style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: up4meColours.lineGray }} >
            <View style={[s.container]}>
                <View style={{ flexDirection: 'row', }}>
                    <Image
                        style={[s.img]}
                        source={require('../../res/pepe.jpg')}
                    />

                    <View style={{ marginLeft: 10, width: 100 }}>
                        <Text>{p.name}, {p.age}</Text>
                        <Text>{p.city}</Text>
                    </View>
                </View>


                <View style={s.imgEnd}>
                    <RNSVG_ruler />
                </View>
            </View>
        </TouchableOpacity>
    );
}

const s = StyleSheet.create({
    container: {
        // backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'space-around',
        // height: 50,
    },
    img: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'red',

    },
    imgEnd: {
        // alignSelf: 'flex-end',
        height: 50,
        width: 50,
    },
    underline: {
        borderBottomWidth: 1,
        borderBottomColor: up4meColours.lineGray,
        paddingBottom: 15,
    },

});

export default Overview;
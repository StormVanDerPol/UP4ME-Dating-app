import React from 'react';
import { gs } from '../../globals';

import Nav from '../nav';

import {
    StyleSheet, View, Image, Text,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const overview = () => {
    return (
        <View style={[gs.body]}>

            <Nav currentSection={'Matches'} />

            <MatchItem name={'Roeland'} age={'72'} city={'Berlin'} />
            <MatchItem name={'My neck'} age={'10'} city={'Berlin'} />
            <MatchItem name={'My pussy'} age={'43'} city={'Berlin'} />
            <MatchItem name={'My crack'} age={'49'} city={'Berlin'} />

        </View >
    );
}

function MatchItem(p) {

    return (
        <TouchableOpacity style={{ paddingVertical: 10, borderBottomWidth: 1 }} >
            <View style={[s.container]}>
                <View style={{ flexDirection: 'row', }}>
                    <Image
                        style={[s.img]}
                        source={{ uri: '../../res/pepe.jpg' }}
                    />

                    <View style={{ marginLeft: 10, width: 100 }}>
                        <Text>{p.name}, {p.age}</Text>
                        <Text>{p.city}</Text>
                    </View>
                </View>


                <View style={s.imgEnd}>
                    <Image
                        source={{ source: '../../res/pepe.jpg' }} />
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
        backgroundColor: 'blue',
    }

});

export default overview;
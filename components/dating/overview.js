import React, { useState, useRef, useEffect } from 'react';
import { gs, up4meColours, calcAgeHet } from '../../globals';

import Nav from '../nav';

import {
    StyleSheet, View, Image, Text,
} from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

import BlepButton from '../blepButton';
import Axios from 'axios';
import { debugMode } from '../../debugmode';
import { endpointGetMatches } from '../../endpoints';
import RNSVG_arrow_right from '../../res/ui/rnsvg/rnsvg_arrow_right';


const Overview = () => {

    const [loaded, setLoaded] = useState(false);
    const _init = useRef(false);

    const _matches = useRef([]);

    if (!_init.current) {

        Axios.get(`${endpointGetMatches}${global.sessionUserId}`)
            .then((res) => {

                if (debugMode.networkRequests)
                    console.log('Matches', res.data);


                _matches.current = res.data;

            })
            .catch((err) => {

                if (debugMode.networkRequests)
                    console.log('Error getting matches', err);

            })
            .finally(() => {
                setLoaded(true);
            })

        _init.current = true;
    }

    const [renderMatchItems, setMatchItemsToRender] = useState(<Text>I'm loading u piece of trash</Text>);

    useEffect(() => {
        if (loaded) {

            if (_matches.current) {

                setMatchItemsToRender(
                    _matches.current.map((match, i) => {
                        return (
                            <MatchItem name={match.naam} age={match.leeftijd} city={match.woonplaats} key={i} />
                        )
                    })
                )
            }
            else {
                setMatchItemsToRender(
                    <Text>Honk honk no matches motherfucker</Text>
                )
            }
        }
    }, [loaded])

    return (

        <ScrollView style={[gs.body]}>

            <Nav currentSection={'Matches'} />

            <BlepButton active={0} title={['Matches', 'Dates']} route={[undefined, 'DatesOverview']} />

            {renderMatchItems}

        </ScrollView >
    );
}

function MatchItem(p) {


    const _age = useRef(calcAgeHet(p.age));

    return (
        <TouchableOpacity style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: up4meColours.lineGray }} >
            <View style={[s.container]}>
                <View style={{ flexDirection: 'row', }}>
                    <Image
                        style={[s.img]}
                        source={require('../../res/pepe.jpg')}
                    />

                    <View style={{ marginLeft: 10, width: 100 }}>
                        <Text>{p.name}, {_age.current}</Text>
                        <Text>{p.city}</Text>
                    </View>
                </View>

                <View style={s.imgEnd}>
                    <RNSVG_arrow_right />
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
        alignItems: "center",
        // height: 50,
    },
    img: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'red',

    },
    imgEnd: {
        height: 25,
        width: 25,
    },
    underline: {
        borderBottomWidth: 1,
        borderBottomColor: up4meColours.lineGray,
        paddingBottom: 15,
    },

});

export default Overview;
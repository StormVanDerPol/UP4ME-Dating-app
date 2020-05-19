
import React from 'react';

import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    FlatList
} from 'react-native';

import Logo from '../logo';

import { gs } from '../../globals';

import BigButton from '../bigbutton';

const PhotoGuidelines = ({ navigation }) => {

    return (
        <View style={gs.body}>
            <ScrollView>
                <Logo />
                <Text style={[s.header, gs.mainHeader]}>Richtlijnen foto's</Text>

                <View style={[gs.grayTextBox, s.textContainer]}>

                    <Text style={[s.section]}>Up4me staat voor een eerlijke en efficiënte manier van daten. De richtlijnen voor het uploaden van foto’s zijn:</Text>

                    <FlatList
                        data={[
                            { key: 'Geen filters' },
                            { key: 'Geen zwart wit foto’s' },
                            { key: 'Geen foto’s waarop je ogen niet zichtbaar zijn (zonnebril)' },
                            { key: 'Geen onscherpe/blurry foto’s' },
                            { key: 'Geen foto’s van meer dan een jaar oud' },

                        ]}
                        renderItem={({ item }) => <Text>{item.key}</Text>}
                    />

                    <Text style={[s.sections]}> Foto’s die we bij Up4me wél graag zien zijn:</Text>

                    <FlatList
                        data={[
                            { key: 'Foto’s van je hoofd' },
                            { key: 'Foto’s van je hele lichaam' },
                            { key: 'Foto’s tijdens je sport of hobby' },
                            { key: 'Foto’s met vrienden en/of familie' },
                            { key: 'Foto’s tijdens je vakantie' },
                        ]}
                        renderItem={({ item }) => <Text>{item.key}</Text>}
                    />
                </View>

                <View style={gs.bottom}>
                    <BigButton component="back" text="Terug" />
                </View>
                {/* <View style={{ marginBottom: 24 }} /> */}

            </ScrollView>
        </View>
    );
};

const s = StyleSheet.create({

    header: {
        marginHorizontal: 25,
        marginBottom: 100,
        marginTop: 50
    },
    section: {
        marginBottom: 25
    },
    sections: {
        marginBottom: 25,
        marginTop: 25
    },
    textContainer: {
        marginBottom: 25
    },
    item: {
        marginBottom: 25

    }
});

export default PhotoGuidelines;

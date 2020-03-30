
import React, { Component } from 'react';
import {
    StyleSheet, ScrollView, Text, View, FlatList
} from 'react-native';
import Logo from '../logo';
import { gs } from '../../globals';
import BigButton from '../bigbutton';

class Profiletext extends Component {

    render() {
        return (
            <>
                <ScrollView>
                    <Logo />
                    <Text style={[s.header, gs.mainHeader]}>Profieltekst</Text>
                    <View style={[gs.grayTextBox, s.textContainer]}>
                        <Text>Vertel hier wat jouw date over je moet weten. Heb jij een bijzondere of tijdrovende hobby? Een speciale wens, een niet alledaags beroep? Een handicap of een speciale levensstijl? Bij Up4me mag je direct jezelf zijn. Zo laat jij alles van je echte kan zien.</Text>
                    </View>
                    <BigButton text="doorgaan uwu" />
                </ScrollView>
            </>
        );
    }
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

export default Profiletext;

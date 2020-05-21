import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const ProfileTextField = (p) => {

    const [profText, setProfText] = useState(p.initProfText);

    const sendProfText = (data) => {
        p.getProfText(data);
    }

    useEffect(() => {
        sendProfText(profText);
    }, [profText])

    return (
        <View style={[s.textFieldContainer]}>

            <TextInput
                multiline={true}
                maxLength={500}
                placeholder="Vertel hier wat jouw date over je moet weten. Heb jij een bijzondere of tijdrovende hobby? Een speciale wens, een niet alledaags beroep? Een handicap of een speciale levensstijl? Bij Up4me mag je direct jezelf zijn. Zo laat jij alles van je echte kan zien."
                value={profText}
                onChangeText={(input) => setProfText(input)}
            />

        </View>
    );
}

const s = StyleSheet.create({
    textFieldContainer: {
        borderRadius: 25,
        borderColor: "gray",
        borderWidth: 1,
        padding: 20,
        marginBottom: 25
    }
});


export default ProfileTextField;
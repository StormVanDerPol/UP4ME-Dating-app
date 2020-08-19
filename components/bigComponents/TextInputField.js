import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { _FOCUSED_C } from '../KeyboardDismiss';


export const limitLines = (limit, input) => {
    let lb = input.split(/\r\n|\r|\n/).length;

    if (lb > limit) {
        input = input.replace(/\n$/, '');
    }

    return input;
}

const TextInputField = ({ initValue = '', onChange = (input) => { } }) => {

    const [tiValue, setTiValue] = useState(initValue);

    return (

        <View style={[styles.textFieldContainer]}>

            <TextInput
                onFocus={() => {
                    _FOCUSED_C.canSnap = false;
                }}
                style={{ height: 200 }}
                textAlignVertical={'top'}
                defaultValue={initValue}
                value={tiValue}
                onChangeText={(input) => {
                    let lb = input.split(/\r\n|\r|\n/).length;

                    if (lb > 10) {
                        input = input.replace(/\n$/, '');
                    }

                    setTiValue(input);

                    onChange(input);
                }}
                multiline={true}
                maxLength={500}
                placeholder="Vertel hier wat jouw date over je moet weten. Heb jij een bijzondere of tijdrovende hobby? Een speciale wens, een niet alledaags beroep? Een handicap of een speciale levensstijl? Bij Up4me mag je direct jezelf zijn. Zo laat jij alles van je echte kan zien."
            />

        </View>

    );
}

const styles = StyleSheet.create({
    textFieldContainer: {
        borderRadius: 14,
        borderColor: "gray",
        borderWidth: 1,
        padding: 20,
        marginBottom: 25
    }
});


export default TextInputField;
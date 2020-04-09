import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';

import BigButton from '../bigbutton';
import Logo from '../logo';
import { gs, regexEmail } from '../../globals';

const Email = ({ navigation }) => {

    const [email, setEmail] = useState('')

    return (
        <>
            <View style={gs.screenWrapper}>

                <View>
                    <Logo />
                    <Text style={[s.header, gs.mainHeader]}>Mijn emailadres</Text>
                </View>

                <View>
                    <TextInput style={s.input} onChangeText={(input) => setEmail(input)} />
                    <Text>We sturen je een email met een verificatiecode.</Text>
                </View>

                <View style={gs.bottom}>
                    <BigButton n={navigation} component="ConfirmationCode" text="doorgaan" disabled={!regexEmail.test(email)} data={{ email: email }} />
                </View>
            </View>
        </>
    );
};

const s = StyleSheet.create({

    input: {
        marginTop: 50,
        marginBottom: 50,
        borderBottomColor: "gray",
        borderBottomWidth: 1
    },

    header: {
        marginTop: 20
    },

});

export default Email;

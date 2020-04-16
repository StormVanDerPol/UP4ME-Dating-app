
import React, { useState } from 'react';

import {
    StyleSheet, View, Text, TextInput,
} from 'react-native';
import Logo from '../logo';

import { gs, apiUrl } from '../../globals';
import BigButton from '../bigbutton';

import Axios from 'axios';

const ConfirmationCode = ({ route, navigation }) => {

    const [data] = useState(route.params);
    const [confcode, setConfcode] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [validationFeedback, setValidationFeedback] = useState('');

    const handleChange = (input) => {
        setConfcode(input);
    }

    const validateCode = () => {

        console.log('validating code...');

        if (confcode.length == 6) {

            console.log('code is 6 chars');

            Axios.get(`${apiUrl}/test/checkcode/valid`)
                .then((res) => {
                    console.log('response: ', res);
                    setIsValid(res.data);

                    if (!res.data) {
                        setValidationFeedback('invalid confirmation code.');
                        setConfcode('');
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setIsValid(false);
                    setValidationFeedback('Sorry! Something went wrong! Please try again!');
                    setConfcode('');
                })
        }
        else {
            console.log('code < 6 chars, waiting...');
        }
    }


    return (
        <>
            <View style={gs.screenWrapper}>
                <View>
                    <Logo />
                    <Text style={[s.header, gs.mainHeader]}>Mijn code</Text>
                </View>

                <View style={s.inputWrapper}>
                    <TextInput keyboardType='numeric' maxLength={6} onChangeText={(input) => handleChange(input)} value={confcode} onEndEditing={() => validateCode()} style={s.input} />
                    <Text style={[s.feedback]}>{validationFeedback}</Text>
                </View>

                <View style={gs.bottom}>
                    <BigButton n={navigation} component="UserData" text="doorgaan" disabled={!(isValid)}
                        data={Object.assign(data, { confirmationCode: confcode })} />
                </View>
            </View>
        </>
    );
}

const s = StyleSheet.create({

    input: {
        marginBottom: 50,
        borderBottomColor: "gray",
        borderBottomWidth: 1,
        fontSize: 100
    },

    header: {
        marginTop: 20
    },

    feedback: {
        color: 'red'
    }

});

export default ConfirmationCode;

import React, { useState, useEffect } from 'react';

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

            if (confcode == targetConfCode) {
                setIsValid(true);
            }
            else {
                console.log('code is wrong')
                setIsValid(false);
            }
        }
        else {
            console.log('code < 6 chars, waiting...');
            setIsValid(false);
        }
    }

    const [targetConfCode, setTargetConfCode] = useState(999666);
    const [userid, setUserid] = useState(0);

    async function registerEmail() {

        console.log(`${apiUrl}/register/1/${data.email}`);

        await Axios.get(`${apiUrl}/register/1/${data.email}`)
            .then((res) => {

                console.log(res);

                setUserid(res.data.userid);
                setTargetConfCode(res.data.security);
            })
    }

    const [init, setInit] = useState(false);

    if (!init) {
        registerEmail();
        setInit(true);
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
                        data={Object.assign(data, { confirmationCode: confcode, userid: userid })} />
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
import React, { useState, useEffect } from 'react';

import {
    StyleSheet, View, Text, TextInput,
} from 'react-native';
import Logo from '../logo';

import { gs, up4meColours } from '../../globals';
import BigButton from '../bigbutton';

import Axios from 'axios';
import { endpointRegisterEmail } from '../../endpoints';

import { debugMode } from '../../debugmode';

const ConfirmationCode = () => {

    const [confcode, setConfcode] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [validationFeedback, setValidationFeedback] = useState('');
    const [nextRoute, setNextRoute] = useState('');

    const validateCode = () => {

        if (debugMode.confCodeValidation)
            console.log('validating code...');

        if (confcode.length == 6) {

            if (debugMode.confCodeValidation)
                console.log('code is 6 chars');

            if (confcode == targetConfCode) {
                setIsValid(true);
                setValidationFeedback('gj!')

            }
            else {
                if (debugMode.confCodeValidation)
                    console.log('code is wrong')
                setIsValid(false);
                setValidationFeedback('No.')
            }
        }
        else {
            if (debugMode.confCodeValidation)
                console.log('code < 6 chars, waiting...');
            setIsValid(false);
            setValidationFeedback('')
        }
    }

    const [targetConfCode, setTargetConfCode] = useState(null);
    const [userid, setUserid] = useState(0);

    async function registerEmail() {

        if (debugMode.general) {
            console.log('Email: ', `${endpointRegisterEmail}${global.registData.email}`);
        }

        setIsValid(false);
        validateCode();

        await Axios.get(`${endpointRegisterEmail}${global.registData.email}`)
            .then((res) => {

                if (debugMode.general) {
                    console.log('/register/1/ Response: ', res);
                    console.log("%c security code: " + `%c ${res.data.security}`, "color: #000; font-size: 1.5rem", "color: #f00; font-size: 2rem")
                }
                setUserid(res.data.userid);
                setTargetConfCode(res.data.security);

                if (res.data.registered == -1) {
                    setNextRoute('UserData');
                }
                else {
                    setNextRoute('MatchCatalog');
                }

                if (res.data.security == undefined) {
                    setIsValid(false);
                    setValidationFeedback("Something went wrong! Please click 'resend' and try again with a new code!");
                }
            })
    }

    useEffect(() => {
        validateCode();
    }, [confcode])

    const handleData = () => {
        global.sessionUserId = userid;
        global.registData.confirmationCode = confcode;

        if (debugMode.general) {
            console.log('created session', global.sessionUserId);
            console.log('saved data: ', global.registData);
        }
    }

    const feedbackColor = () => {
        if (isValid == true) {
            return { color: 'green' };
        }
        else {
            return { color: 'red' };
        }
    }

    const [resendFeedbackOpacity, setResendFeedbackOpacity] = useState(0);
    const [init, setInit] = useState(false);

    if (!init) {
        registerEmail();
        setInit(true);
    }

    return (
        <View style={gs.body}>
            <View style={gs.screenWrapper}>
                <View>
                    <Logo />
                    <Text style={[s.header, gs.mainHeader]}>Mijn code</Text>
                </View>

                <View style={s.inputWrapper}>
                    <TextInput keyboardType='numeric' maxLength={6}
                        onChangeText={(input) => {

                            setConfcode(input)
                            setIsValid(false);

                        }} value={confcode} onEndEditing={() => validateCode()} style={s.input} />
                    <Text style={[s.feedback, feedbackColor()]}>{validationFeedback}</Text>

                </View>

                <View style={gs.bottom}>
                    <Text style={[s.feedback, { opacity: resendFeedbackOpacity, alignSelf: 'center' }]}>code sent!</Text>
                    <Text style={[s.resendbutton, gs.underline]} onPress={() => { registerEmail(); setResendFeedbackOpacity(1) }}>resend code</Text>
                    <BigButton
                        component={nextRoute}
                        text="doorgaan"
                        disabled={!(isValid)}
                        callBack={handleData}
                    />
                </View>
            </View>
        </View>
    );
}

const s = StyleSheet.create({

    input: {
        marginBottom: 50,
        borderBottomColor: up4meColours.lineGray,
        borderBottomWidth: 1,
        fontSize: 100
    },

    header: {
        marginTop: 20
    },

    feedback: {
        color: 'green'
    },

    resendbutton: {
        alignSelf: "center",
        marginBottom: 16
    },

});

export default ConfirmationCode;
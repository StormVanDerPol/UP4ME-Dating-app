import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';

import BigButton from '../bigbutton';
import Logo from '../logo';
import { gs, regexEmail, editTimerMS, up4meColours } from '../../globals';
import Axios from 'axios';
import { endpointCheckEmail } from '../../endpoints';

import { debugMode } from '../../debugmode';

let editTimer = null;

const Email = () => {

    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState('');
    const [validationFeedback, setValidationFeedback] = useState('');

    const validateEmail = () => {

        // Axios.get(`https://block-temporary-email.com/check/email/${email}`)
        //     .then((res) => {
        //         console.log('check if temp email', res);
        //         if (!res.data.temporary) {


        Axios.get(`${endpointCheckEmail}${email}`)
            .then((res) => {
                console.log(`${endpointCheckEmail} response`, 'I AM DEFINITELY USEFUL TEEHEE~', res);

                if (res.data.exists == 0) {
                    setIsValid('VALID');
                }
                else {
                    setIsValid('VALID');
                }

            })
            .catch((err) => {
                console.log('Error', err)
                setIsValid('REQ_ERROR');
            })
            .finally(() => {
                setFeedback();
            })

        //     }
        //     else {
        //         setIsValid('TEMP')
        //     }
        // })
        // .catch((err) => {
        //     console.log('Error', err)
        //     setIsValid('REQ_ERROR');
        // })
        // .finally(() => {
        //     setFeedback();
        // });
    };

    const setFeedback = () => {

        switch (isValid) {
            case 'VALID':
                setValidationFeedback(
                    'Good to go!'
                );
                break;

            case 'INVALID':
                setValidationFeedback(
                    'Invalid E-Mail address.'
                );
                break;

            case 'TEMP':
                setValidationFeedback(
                    'We do not allow the use of temporary E-Mail providers.'
                );
                break;

            case 'EXISTS':
                setValidationFeedback(
                    'This E-Mail has already been used.'
                );
                break;

            case 'REQ_ERROR':
                setValidationFeedback(
                    'Sorry! Something went wrong! please try again later!'
                );
                break;

            default:
                setValidationFeedback(
                    ''
                );
        }
    }

    const feedbackColor = () => {
        if (isValid == 'VALID') {
            return { color: 'green' };
        }
        else {
            return { color: 'red' }
        }
    }

    const handleEndEditing = () => {

        if (regexEmail.test(email)) {
            validateEmail();
        }
        else {
            setIsValid('INVALID');
            setFeedback();
            if (debugMode.general)
                console.log('%cinvalid email', 'font-style: italic; color: red');
        }
    }

    useEffect(() => {
        setFeedback();
    }, [isValid]);

    const handleData = () => {
        global.registData.registering = true;
        global.registData.email = email;
        if (debugMode.general)
            console.log('saved data: ', global.registData);
    }

    return (
        <View style={gs.body}>
            <View style={gs.screenWrapper}>

                <View>
                    <Logo />
                    <Text style={[s.header, gs.mainHeader]}>Mijn emailadres</Text>
                </View>

                <View>
                    <TextInput style={s.input}
                        onChangeText={(input) => {

                            setEmail(input);

                            if (editTimer) {
                                clearTimeout(editTimer);
                                setIsValid('WORKING');
                                if (debugMode.endEditTimer)
                                    console.log('%ccleared edit timer', 'font-size: 0.5rem');
                            }
                            else {
                                if (debugMode.endEditTimer)
                                    console.log('%ceditTimer was null', 'font-size: 0.5rem');
                            }

                            if (debugMode.endEditTimer)
                                console.log('%cset new edit timer', 'font-size: 0.5rem');

                            editTimer = setTimeout(() => {
                                if (debugMode.endEditTimer)
                                    console.log('%cran handleEndEDiting()', 'font-size: 0.5rem');

                                handleEndEditing();
                            }, editTimerMS);
                        }}
                        onEndEditing={() => {
                            handleEndEditing();
                        }} />
                    <Text style={[s.feedback, feedbackColor()]}>{validationFeedback}</Text>

                    <Text>We sturen je een email met een verificatiecode.</Text>

                </View>

                <View style={gs.bottom}>
                    <BigButton
                        component="ConfirmationCode"
                        text="doorgaan"
                        disabled={!(isValid == 'VALID')}
                        callBack={handleData}
                    />
                </View>
            </View>
        </View>
    );
};

const s = StyleSheet.create({

    input: {
        marginTop: 50,
        marginBottom: 5,
        borderBottomColor: up4meColours.lineGray,
        borderBottomWidth: 1
    },

    header: {
        marginTop: 20
    },

    feedback: {
        marginBottom: 30,
    }

});

export default Email;

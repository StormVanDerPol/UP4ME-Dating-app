import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';

import BigButton from '../bigbutton';
import Logo from '../logo';
import { gs, regexEmail, apiUrl } from '../../globals';
import Axios from 'axios';
import { endpointCheckEmail } from '../../endpoints';

const Email = ({ navigation }) => {

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
            console.log('invalid email ', isValid);
        }
    }

    useEffect(() => {
        setFeedback();
    }, [isValid]);

    return (
        <>
            <View style={gs.screenWrapper}>

                <View>
                    <Logo />
                    <Text style={[s.header, gs.mainHeader]}>Mijn emailadres</Text>
                </View>

                <View>
                    <TextInput style={s.input}
                        onChangeText={(input) => {
                            setEmail(input);
                        }}
                        onEndEditing={() => {
                            handleEndEditing();
                        }} />
                    <Text style={[s.feedback, feedbackColor()]}>{validationFeedback}</Text>

                    <Text>We sturen je een email met een verificatiecode.</Text>

                </View>

                <View style={gs.bottom}>
                    <BigButton
                        n={navigation}
                        component="ConfirmationCode"
                        text="doorgaan"
                        disabled={!(isValid == 'VALID')}
                        data={{ email: email }}
                    />
                </View>
            </View>
        </>
    );
};

const s = StyleSheet.create({

    input: {
        marginTop: 50,
        marginBottom: 5,
        borderBottomColor: "gray",
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

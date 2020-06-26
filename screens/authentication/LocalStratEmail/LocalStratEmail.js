import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { RegistStyles } from '../../../styles/RegistStyles';

import Body, { FlexSection } from '../../../components/Body';
import RegistUp4MeLogo from '../../../components/LoginAndRegistration/RegistUp4MeLogo';
import RegistHeader from '../../../components/LoginAndRegistration/RegistHeader';
import TextQuicksand from '../../../components/TextQuicksand';
import UpForMeButton from '../../../components/UpForMeButton';
import KeyboardDismiss, { _FOCUSED_C } from '../../../components/KeyboardDismiss';

import { regex } from '../../../res/data/regex';

import { devMode } from '../../../dev/devConfig';

import Axios from 'axios';

import endpoints, { getEndpoint, requestFeedback } from '../../../res/data/endpoints';
import { navigationProxy } from '../../../navigation/navigationProxy';
import NetworkFeedBackIndicator, { networkFeedbackMessages } from '../../../components/waitIndicator';
import { timeouts } from '../../../res/data/requests';
import { DATA_STORE } from '../../../stored/dataStore';
import up4meColours from '../../../res/data/colours';

const LocalStratEmail = () => {

    const [email, setEmail] = useState('');

    const [feedback, setFeedback] = useState({
        valid: false,
        message: '',
        color: '#fff',
    });

    const [netFeedback, setNetFeedback] = useState({
        busy: false,
        message: '',
    });

    const validateEmail = (toCheck) => {

        if (devMode.enabled) {
            console.log(toCheck);
        }

        if (!regex.validEmail.test(toCheck)) {
            setFeedback({
                valid: false,
                message: 'Invalid email!',
                color: 'red'
            })
        }
        else {
            setFeedback({
                valid: true,
                message: 'Good to go!',
                color: 'green',
            })
        }
    }

    return (
        <>
            <KeyboardDismiss>
                <Body>
                    <FlexSection>
                        <RegistUp4MeLogo />
                        <RegistHeader>Mijn emailadres</RegistHeader>

                        <View style={RegistStyles.container}>
                            <TextInput style={[
                                styles.inputText,
                                RegistStyles.inputText
                            ]}

                                onFocus={() => {
                                    _FOCUSED_C.canSnap = false;
                                }}

                                onChangeText={(input) => {
                                    setFeedback({
                                        valid: false,
                                        message: '',
                                        color: '#fff',
                                    });

                                    setEmail(input);

                                }}

                                onBlur={() => {
                                    validateEmail(email);
                                }}
                            />
                            <TextQuicksand style={{ color: feedback.color }}>{feedback.message}</TextQuicksand>
                            <TextQuicksand>We sturen je een email met een verificatie code.</TextQuicksand>
                        </View>

                    </FlexSection>

                    <View style={RegistStyles.bottom}>

                        <NetworkFeedBackIndicator style={RegistStyles.waitIndicator} message={netFeedback.message} />

                        <UpForMeButton title={'doorgaan'} enabled={feedback.valid && !netFeedback.busy} onPress={async () => {

                            setNetFeedback({
                                busy: true,
                                message: networkFeedbackMessages.wait,
                            })

                            if (devMode.network) {
                                console.log('making call to:', getEndpoint(endpoints.get.registerEmail) + email);
                            }

                            await Axios.get(getEndpoint(endpoints.get.registerEmail) + email, {
                                timeout: timeouts.short,
                            })
                                .then((res) => {
                                    if (devMode.network) {
                                        console.log(res)
                                    }

                                    setNetFeedback({
                                        busy: false,
                                        message: '',
                                    })

                                    if (res.data.registered != undefined && res.status === 200) {

                                        DATA_STORE.registData.email = email;
                                        navigationProxy.navigate('ConfirmationCode');
                                    }
                                })
                                .catch((err) => {

                                    if (devMode.network) {
                                        console.warn(err);
                                    }

                                    setNetFeedback({
                                        busy: false,
                                        message: networkFeedbackMessages.err,
                                    })
                                })
                        }} />
                    </View>
                </Body>
            </KeyboardDismiss>
        </>
    );
}

const styles = StyleSheet.create({
    inputText: {
        marginTop: 75,
        marginBottom: 25,
    }
})

export default LocalStratEmail;
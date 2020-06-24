import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, ScrollView, } from 'react-native-gesture-handler';

import { RegistStyles } from '../../../styles/RegistStyles';

import Body, { FlexSection } from '../../../components/Body';
import RegistUp4MeLogo from '../../../components/LoginAndRegistration/RegistUp4MeLogo';
import RegistHeader from '../../../components/LoginAndRegistration/RegistHeader';
import TextQuicksand from '../../../components/TextQuicksand';
import UpForMeButton from '../../../components/UpForMeButton';
import KeyboardDismiss from '../../../components/KeyboardDismiss';
import { regex } from '../../../res/data/regex';
import { devMode } from '../../../dev/devConfig';
import Axios from 'axios';
import endpoints, { getEndpoint } from '../../../res/data/endpoints';
import { navigationProxy } from '../../../navigation/navigationProxy';
import UpForMeIcon, { iconIndex } from '../../../components/UpForMeIcon';

const LocalStratEmail = () => {

    const [email, setEmail] = useState('');

    const [feedback, setFeedback] = useState({
        valid: false,
        message: '',
        color: '#fff',
    })

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
                        <UpForMeButton title={'doorgaan'} enabled={feedback.valid} onPress={async () => {

                            if (devMode.network) {
                                console.log('making call to:', getEndpoint(endpoints.registerEmail) + email);
                            }

                            await Axios.get(getEndpoint(endpoints.registerEmail) + email)
                                .then((res) => {
                                    if (devMode.network) {
                                        console.log(res)
                                    }

                                    if (res.data.registered != undefined && res.status === 200) {
                                        navigationProxy.navigate('DevRouter');
                                    }
                                })
                                .catch((err) => {

                                    if (devMode.network) {
                                        console.warn(err);
                                    }

                                    setFeedback({
                                        valid: true,
                                        message: `Network Error... please try again!`,
                                        color: 'red'
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
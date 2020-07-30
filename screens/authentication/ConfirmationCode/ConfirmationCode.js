import React, { useRef, useState, useEffect } from 'react';

import { View, Keyboard, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import Body, { FlexSection } from '../../../components/Body';
import KeyboardDismiss, { _FOCUSED_C } from '../../../components/KeyboardDismiss';
import RegistUp4MeLogo from '../../../components/LoginAndRegistration/RegistUp4MeLogo';
import RegistHeader from '../../../components/LoginAndRegistration/RegistHeader';
import TextQuicksand from '../../../components/TextQuicksand';


import { RegistStyles } from '../../../styles/RegistStyles';
import UpForMeButton from '../../../components/UpForMeButton';
import NetworkFeedBackIndicator, { networkFeedbackMessages } from '../../../components/waitIndicator';
import Axios from 'axios';
import { devMode } from '../../../dev/devConfig';
import endpoints, { getEndpoint } from '../../../res/data/endpoints';
import { DATA_STORE } from '../../../stored/dataStore';
import { timeouts } from '../../../res/data/requests';
import { navigationProxy } from '../../../navigation/navigationProxy';

import { dodoFlight } from '../../../functions/dodoAirlines';
import { createSession } from '../../../functions/createSession';

const enableLogging = false;

const ConfirmationCode = () => {

    const [confCode, setConfCode] = useState('');
    const codeLength = 6;

    const [netFeedback, setNetFeedback] = useState({
        busy: false,
        message: '',
    })

    const [resendFeedback, setResendFeedback] = useState({
        color: 'green',
        message: ''
    })

    return (
        <KeyboardDismiss>
            <Body>
                <FlexSection>
                    <RegistUp4MeLogo />
                    <RegistHeader>Mijn code</RegistHeader>

                    <EnterConfCode onChangeCode={(input) => { setConfCode(input) }} codeLength={codeLength} />

                </FlexSection>

                <TextQuicksand
                    style={{ alignSelf: 'center' }}
                    onPress={async () => {
                        await Axios.post(getEndpoint(endpoints.post.authLocalReq, false), {
                            email: DATA_STORE.registData.email,
                        }, {
                            timeout: timeouts.short,
                        })
                            .then((res) => {
                                setResendFeedback({
                                    color: 'green',
                                    message: 'Code sent! Check your email!'
                                });

                                setTimeout(() => {
                                    setResendFeedback({
                                        color: 'green',
                                        message: ''
                                    });
                                }, 3500)

                            })
                    }}>
                    Resend code
                    </TextQuicksand>
                <TextQuicksand
                    style={{ alignSelf: 'center', color: resendFeedback.color }}>
                    {resendFeedback.message}
                </TextQuicksand>

                <View style={RegistStyles.bottom}>

                    <NetworkFeedBackIndicator style={RegistStyles.waitIndicator} message={netFeedback.message} />
                    <UpForMeButton style={RegistStyles.botButton} title={'doorgaan'} enabled={(confCode.length == codeLength && !netFeedback.busy)} onPress={async () => {

                        setNetFeedback({
                            busy: true,
                            message: networkFeedbackMessages.wait,
                        })


                        if (devMode.network) {
                            if (enableLogging)
                                console.log('request:', getEndpoint(endpoints.post.authLocal), { email: DATA_STORE.registData.email, security: confCode });
                        }

                        await Axios.post(getEndpoint(endpoints.post.authLocal, false), {
                            email: DATA_STORE.registData.email,
                            security: confCode,
                        }, {
                            withCredentials: true,
                            timeout: timeouts.short,
                        })
                            .then(async (res) => {

                                if (enableLogging) {
                                    console.log(res);
                                }

                                createSession(res.headers.authorization);


                                await dodoFlight({
                                    method: 'get',
                                    url: getEndpoint(endpoints.get.lastLogin) + DATA_STORE.userID,

                                    thenCallback: (res) => {

                                        if (res.data[0][0].actief == -1) {
                                            navigationProxy.navigate('RegistUserData');
                                        }
                                        else {
                                            navigationProxy.navigate('Landing');
                                        }

                                        setNetFeedback({
                                            busy: false,
                                            message: '',
                                        })

                                    },

                                    catchCallback: (err) => {
                                        setNetFeedback({
                                            busy: false,
                                            message: 'error getting last login timestamp',
                                        })
                                    }
                                })



                            })
                            .catch((err) => {
                                console.log(err);

                                setNetFeedback({
                                    busy: false,
                                    message: networkFeedbackMessages.err,
                                })
                            })
                    }} />
                </View>

            </Body>
        </KeyboardDismiss>
    );
}


const EnterConfCode = ({ codeLength = 6, onChangeCode = () => { } }) => {

    const numberRefs = useRef(new Array(codeLength));
    const confCode = useRef(new Array(codeLength));

    const _init = useRef(false);

    if (!_init.current) {
        numberRefs.current.fill(null);
        confCode.current.fill('');
        _init.current = true;
    }

    const [feedback, setFeedback] = useState({
        message: '',
        color: 'green',
    });

    return (
        <View style={[RegistStyles.container, styles.codeContainer]}>
            <View style={[styles.codeInputContainer]}>
                {numberRefs.current.map((ref, i) => {
                    return (
                        <TextInput
                            key={i}

                            keyboardType={'numeric'}

                            style={[RegistStyles.inputText, styles.inputText]}

                            ref={(elem) => { numberRefs.current[i] = elem }}

                            onFocus={() => {
                                _FOCUSED_C.canSnap = false;
                                numberRefs.current[i].clear();
                                confCode.current[i] = '';
                                onChangeCode(confCode.current.join(''));
                            }}

                            onChangeText={(input) => {

                                //if editing the first field and inputting a 0 clear since Rinaldo's security codes never start with a 0;
                                if (i == 0 && input == 0) {
                                    numberRefs.current[0].clear();
                                    confCode.current[0] = '';

                                    setFeedback({
                                        message: `Security code can't start with a zero!`,
                                        color: 'red',
                                    })
                                }
                                //clear if there's more than 1 character
                                else if (input.length > 1) {
                                    numberRefs.current[i].clear();
                                    confCode.current[i] = '';

                                    setFeedback({
                                        message: `Input only a single character!`,
                                        color: 'red',
                                    })
                                }
                                else {
                                    setFeedback({
                                        message: '',
                                        color: 'green',
                                    })

                                    confCode.current[i] = input;

                                    //if there is a next field
                                    if (numberRefs.current[i + 1]) {

                                        //If text input field has not been edited once
                                        if (confCode.current[i + 1].length == 0) {
                                            //focus on the next one
                                            numberRefs.current[i + 1].focus();
                                        }

                                        //If it has been edited, dismiss kb.
                                        else {
                                            Keyboard.dismiss();
                                        }
                                    }

                                    //if editing the last field, dismiss the kb.
                                    if (numberRefs.current.length - 1 == i) {
                                        Keyboard.dismiss();
                                    }
                                }

                                onChangeCode(confCode.current.join(''));
                            }}
                        />
                    );
                })}

            </View>

            <TextQuicksand style={{ color: feedback.color, fontSize: 16, }}>{feedback.message}</TextQuicksand>

            <TextQuicksand
                style={styles.clearButton}
                onPress={() => {
                    for (ref of numberRefs.current) {
                        ref.clear();
                        confCode.current.fill('');
                        onChangeCode(confCode.current.join(''));
                    }
                }}>clear</TextQuicksand>

        </View>
    );

}

const styles = StyleSheet.create({
    codeInputContainer: {
        flexDirection: "row",
    },

    codeContainer: {
        marginTop: 75,
    },

    inputText: {
        flex: 1,
        marginHorizontal: 5,
        textAlign: "center",
        fontSize: 34,
        fontWeight: "bold",
    },

    clearButton: {
        textDecorationLine: "underline",
        alignSelf: "flex-end",
        fontSize: 16,
    }
});

export default ConfirmationCode;
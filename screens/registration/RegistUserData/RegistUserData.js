import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';

import { RegistStyles } from '../../../styles/RegistStyles';

import Body, { FlexSection } from '../../../components/Body';
import NetworkFeedBackIndicator, { networkFeedbackMessages } from '../../../components/waitIndicator';
import UpForMeButton from '../../../components/UpForMeButton';
import RegistUp4MeLogo from '../../../components/LoginAndRegistration/RegistUp4MeLogo';
import RegistHeader from '../../../components/LoginAndRegistration/RegistHeader';
import TextQuicksand from '../../../components/TextQuicksand';

import KeyboardDismiss from '../../../components/KeyboardDismiss';
import InputUserData from '../../../components/bigComponents/InputUserData';
import Axios from 'axios';
import endpoints, { getEndpoint, requestFeedback } from '../../../res/data/endpoints';
import { DATA_STORE } from '../../../stored/dataStore';
import { timeouts } from '../../../res/data/requests';
import { devMode } from '../../../dev/devConfig';
import { MemeMath } from '../../../functions/math';
import { navigationProxy } from '../../../navigation/navigationProxy';
import { getYearIndex } from '../../../res/data/time';

const RegistUserData = () => {

    const [userData, setUserData] = useState({
        name: '',
        job: '',
        birthday: null,
        height: null,
    });

    const [netFeedback, setNetFeedback] = useState({
        busy: false,
        message: '',
    });

    return (
        <KeyboardDismiss>
            <Body>
                <FlexSection>
                    <RegistUp4MeLogo />
                    <RegistHeader>Mijn gegevens</RegistHeader>

                    <View style={[RegistStyles.container]}>

                        <InputUserData

                            // initValues={{
                            //     name: 'bitch',
                            //     job: 'lamler',
                            //     birthday: { day: 20, month: 2, year: 1996, yearIndex: getYearIndex(1996) },
                            //     height: 167,
                            // }}

                            onChange={(input) => {
                                setUserData({ ...input });
                            }} />


                    </View>

                </FlexSection>

                <View style={RegistStyles.bottom}>
                    <NetworkFeedBackIndicator style={RegistStyles.waitIndicator} message={netFeedback.message} />
                    <UpForMeButton style={RegistStyles.botButton} title={'doorgaan'} enabled={
                        (userData.job.length > 0 && userData.name.length > 0 && !netFeedback.busy)
                    }
                        onPress={async () => {

                            setNetFeedback({
                                busy: true,
                                message: networkFeedbackMessages.wait,
                            });

                            if (devMode.network) {
                                console.log('request:', getEndpoint(endpoints.post.setUserData), {
                                    data: {
                                        userid: DATA_STORE.userToken,
                                        naam: userData.name,
                                        geboortedatum: userData.birthday.year + '' + userData.birthday.month + '' + userData.birthday.day + '',
                                        beroep: userData.job,
                                        lengte: userData.height,
                                    },
                                    headers: {
                                        authorization: DATA_STORE.userToken,
                                    }
                                });
                            }

                            if (DATA_STORE.userToken != null) {

                                Axios.post(getEndpoint(endpoints.post.setUserData), {
                                    userid: DATA_STORE.userToken,
                                    naam: userData.name,
                                    geboortedatum: userData.birthday.year + userData.birthday.month + userData.birthday.day,
                                    beroep: userData.job,
                                    lengte: MemeMath.roundTwoDecimals(userData.height),
                                }, {
                                    headers: {
                                        authorization: DATA_STORE.userToken,
                                    },
                                    timeout: timeouts.short,
                                })
                                    .then((res) => {
                                        console.log(res);

                                        if (res.data) {
                                            navigationProxy.navigate('RegistLocation');
                                            netFeedback.message = ''
                                        }

                                        else {
                                            netFeedback.message = networkFeedbackMessages.err
                                        }

                                        setNetFeedback({
                                            busy: false,
                                            ...netFeedback,
                                        });
                                    })
                                    .catch((err) => {
                                        console.log(err)

                                        setNetFeedback({
                                            busy: false,
                                            message: networkFeedbackMessages.err,
                                        });
                                    })
                            }
                            else {
                                setNetFeedback({
                                    busy: false,
                                    message: 'No token found',
                                });

                                Alert.alert(
                                    'No token found',
                                    'Quitting the registrtation process',
                                    [
                                        {
                                            text: 'OK', onPress: () => {
                                                navigationProxy.navigate('Landing');
                                            }
                                        }
                                    ],
                                    { cancelable: false }
                                );
                            }
                        }} />
                </View>
            </Body>
        </KeyboardDismiss>
    );
}


const styles = StyleSheet.create({

});

export default RegistUserData;
import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';

import { RegistStyles } from '../../../styles/RegistStyles';

import Body, { FlexSection } from '../../../components/Body';
import NetworkFeedBackIndicator, { networkFeedbackMessages } from '../../../components/waitIndicator';
import UpForMeButton from '../../../components/UpForMeButton';
import RegistUp4MeLogo from '../../../components/LoginAndRegistration/RegistUp4MeLogo';
import RegistHeader from '../../../components/LoginAndRegistration/RegistHeader';

import KeyboardDismiss from '../../../components/KeyboardDismiss';
import InputUserData from '../../../components/bigComponents/InputUserData';
import endpoints, { getEndpoint, requestFeedback, host } from '../../../res/data/endpoints';
import { DATA_STORE } from '../../../stored/dataStore';
import { timeouts } from '../../../res/data/requests';
import { MemeMath } from '../../../functions/math';
import { navigationProxy } from '../../../navigation/navigationProxy';
import { getYearIndex, toAPIDate } from '../../../res/data/time';
import { dodoFlight } from '../../../functions/dodoAirlines';

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


                            await dodoFlight({
                                method: 'post',
                                url: getEndpoint(endpoints.post.setUserData),
                                timeout: timeouts.short,
                                data: {
                                    userid: DATA_STORE.userID,
                                    naam: userData.name,
                                    geboortedatum: toAPIDate(userData.birthday),
                                    beroep: userData.job,
                                    lengte: MemeMath.roundTwoDecimals(userData.height),
                                },

                                thenCallback: (res) => {

                                    if (res.data == true) {
                                        navigationProxy.navigate('RegistLocation');
                                        netFeedback.message = '';
                                    }
                                    else {
                                        netFeedback.message = networkFeedbackMessages.err;
                                    }
                                    setNetFeedback({
                                        ...netFeedback,
                                        busy: false,
                                    });
                                },

                                catchCallback: () => {
                                    setNetFeedback({
                                        busy: false,
                                        message: networkFeedbackMessages.err,
                                    });
                                }
                            })
                        }} />
                </View>
            </Body>
        </KeyboardDismiss>
    );
}


const styles = StyleSheet.create({

});

export default RegistUserData;
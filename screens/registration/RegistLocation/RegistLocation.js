import React, { useState } from 'react';
import { View } from 'react-native';

import { RegistStyles } from '../../../styles/RegistStyles';

import endpoints, { getEndpoint } from '../../../res/data/endpoints';

import Body, { FlexSection } from '../../../components/Body';
import UpForMeButton from '../../../components/UpForMeButton';
import RegistUp4MeLogo from '../../../components/LoginAndRegistration/RegistUp4MeLogo';
import RegistHeader from '../../../components/LoginAndRegistration/RegistHeader';
import NetworkFeedBackIndicator, { networkFeedbackMessages } from '../../../components/waitIndicator';
import InputLocation from '../../../components/bigComponents/InputLocation';
import { DATA_STORE } from '../../../stored/dataStore';
import { navigationProxy } from '../../../navigation/navigationProxy';
import { dodoFlight } from '../../../functions/dodoAirlines';

const RegistLocation = () => {

    const [netFeedback, setNetFeedback] = useState({
        busy: false,
        message: '',
    });

    const [placeName, setPlaceName] = useState('')

    return (
        <Body>
            <FlexSection>
                <RegistUp4MeLogo />
                <RegistHeader>Mijn locatie</RegistHeader>

                <InputLocation onBlur={(input) => {
                    setPlaceName(input)
                }} />

            </FlexSection>

            <View style={RegistStyles.bottom}>
                <NetworkFeedBackIndicator style={RegistStyles.waitIndicator} message={netFeedback.message} />
                <UpForMeButton style={RegistStyles.botButton} title={'doorgaan'} enabled={(placeName.length > 0 && !netFeedback.busy)} onPress={async () => {
                    setNetFeedback({
                        busy: true,
                        message: networkFeedbackMessages.wait,
                    })

                    await dodoFlight({
                        method: 'post',
                        url: getEndpoint(endpoints.post.setPlace),
                        data: {
                            userid: DATA_STORE.userID,
                            woontin: placeName,
                        },

                        thenCallback: (res) => {

                            if (res.data) {

                                setNetFeedback({
                                    busy: false,
                                    message: '',
                                });

                                navigationProxy.navigate('RegistGender');
                            }
                        },

                        catchCallback: (err) => {
                            setNetFeedback({
                                busy: false,
                                message: networkFeedbackMessages.err,
                            });
                        },
                    })

                }} />
            </View>

        </Body>
    );
}

export default RegistLocation;
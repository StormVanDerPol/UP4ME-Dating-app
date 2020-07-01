import React, { useState } from 'react';
import { View } from 'react-native';

import { RegistStyles } from '../../../styles/RegistStyles';

import endpoints, { getEndpoint } from '../../../res/data/endpoints';
import { devMode } from '../../../dev/devConfig';

import Body, { FlexSection } from '../../../components/Body';
import UpForMeButton from '../../../components/UpForMeButton';
import RegistUp4MeLogo from '../../../components/LoginAndRegistration/RegistUp4MeLogo';
import RegistHeader from '../../../components/LoginAndRegistration/RegistHeader';
import NetworkFeedBackIndicator, { networkFeedbackMessages } from '../../../components/waitIndicator';
import InputLocation from '../../../components/bigComponents/InputLocation';
import Axios from 'axios';
import { DATA_STORE } from '../../../stored/dataStore';
import { timeouts } from '../../../res/data/requests';
import { navigationProxy } from '../../../navigation/navigationProxy';

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

                    if (devMode.network) {
                        console.log('request:', getEndpoint(endpoints.post.setPlace));
                    }

                    Axios.post(getEndpoint(endpoints.post.setPlace), {
                        userid: DATA_STORE.userToken,
                        woontin: placeName,
                    }, {
                        timeout: timeouts.short,
                        headers: {
                            authorization: DATA_STORE.userToken,
                        },
                    })
                        .then((res) => {
                            if (devMode.network)
                                console.log(res);

                            setNetFeedback({
                                busy: false,
                                message: '',
                            });

                            navigationProxy.navigate('RegistGender')
                        })
                        .catch((err) => {
                            if (devMode.network)
                                console.log(err);

                            setNetFeedback({
                                busy: false,
                                message: networkFeedbackMessages.err,
                            });
                        });

                }} />
            </View>

        </Body>
    );
}

export default RegistLocation;
import React, { useState } from 'react';
import { View } from 'react-native';

import { RegistStyles } from '../../../styles/RegistStyles';

import endpoints from '../../../res/data/endpoints';
import { devMode } from '../../../dev/devConfig';

import Body, { FlexSection } from '../../../components/Body';
import UpForMeButton from '../../../components/UpForMeButton';
import RegistUp4MeLogo from '../../../components/LoginAndRegistration/RegistUp4MeLogo';
import RegistHeader from '../../../components/LoginAndRegistration/RegistHeader';
import NetworkFeedBackIndicator, { networkFeedbackMessages } from '../../../components/waitIndicator';


const RegistTemplate = () => {

    const [netFeedback, setNetFeedback] = useState({
        busy: false,
        message: '',
    });

    return (
        <Body>
            <FlexSection>
                <RegistUp4MeLogo />
                <RegistHeader>Mijn locatie</RegistHeader>

                <View style={RegistStyles.container}>

                </View>
            </FlexSection>

            <View style={RegistStyles.bottom}>
                <NetworkFeedBackIndicator style={RegistStyles.waitIndicator} message={netFeedback.message} />
                <UpForMeButton title={'doorgaan'} enabled={false} onPress={async () => {
                    setNetFeedback({
                        busy: true,
                        message: networkFeedbackMessages.wait,
                    })

                    if (devMode.network) {
                        console.log('request:', getEndpoint(endpoints.something));
                    }
                }} />
            </View>

        </Body>
    );
}

export default RegistTemplate;
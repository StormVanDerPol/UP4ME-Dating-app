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
import SelectGender from '../../../components/bigComponents/SelectGender';


const RegistGender = () => {

    const [netFeedback, setNetFeedback] = useState({
        busy: false,
        message: '',
    });

    const [gender, setGender] = useState(-1);

    return (
        <Body>
            <FlexSection>
                <RegistUp4MeLogo />
                <RegistHeader>Ik ben een</RegistHeader>

                <View style={RegistStyles.container}>

                    <SelectGender onChange={(penis) => {
                        setGender(penis);
                    }} />

                </View>
            </FlexSection>

            <View style={RegistStyles.bottom}>
                <NetworkFeedBackIndicator style={RegistStyles.waitIndicator} message={netFeedback.message} />
                <UpForMeButton style={RegistStyles.botButton} title={'doorgaan'} enabled={(gender != -1 && !netFeedback.busy)} onPress={async () => {
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

export default RegistGender;
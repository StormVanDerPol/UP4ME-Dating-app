import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { RegistStyles } from '../../../styles/RegistStyles';

import Body, { FlexSection } from '../../../components/Body';
// import WaitIndicator from '../../../components/waitIndicator';
import UpForMeButton from '../../../components/UpForMeButton';
import RegistUp4MeLogo from '../../../components/LoginAndRegistration/RegistUp4MeLogo';
import RegistHeader from '../../../components/LoginAndRegistration/RegistHeader';
import TextQuicksand from '../../../components/TextQuicksand';
import NetworkFeedBackIndicator from '../../../components/waitIndicator';

const RegistProfileText = () => {

    const [netFeedback, setNetFeedback] = useState({
        busy: false,
        message: '',
    });

    return (
        <Body>
            <FlexSection>
                <RegistUp4MeLogo />
                <RegistHeader>Profieltekst</RegistHeader>

                <View style={[RegistStyles.container,]}>


                </View>
            </FlexSection>

            <View style={RegistStyles.bottom}>
                <NetworkFeedBackIndicator style={RegistStyles.waitIndicator} message={netFeedback.message} />
                <UpForMeButton style={RegistStyles.botButton} title={'doorgaan'} enabled={false} onPress={async () => {
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
const styles = StyleSheet.create({

    underline: {
        textDecorationLine: "underline",

    },
});

export default RegistProfileText;
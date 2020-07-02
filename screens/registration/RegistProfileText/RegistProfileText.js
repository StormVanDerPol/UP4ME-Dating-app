import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { RegistStyles } from '../../../styles/RegistStyles';

import Body, { FlexSection } from '../../../components/Body';
// import WaitIndicator from '../../../components/waitIndicator';
import UpForMeButton from '../../../components/UpForMeButton';
import RegistUp4MeLogo from '../../../components/LoginAndRegistration/RegistUp4MeLogo';
import RegistHeader from '../../../components/LoginAndRegistration/RegistHeader';
import TextQuicksand from '../../../components/TextQuicksand';
import NetworkFeedBackIndicator, { networkFeedbackMessages } from '../../../components/waitIndicator';
import KeyboardDismiss from '../../../components/KeyboardDismiss';
import TextInputField from '../../../components/bigComponents/TextInputField';
import endpoints, { getEndpoint } from '../../../res/data/endpoints';

const RegistProfileText = () => {

    const [netFeedback, setNetFeedback] = useState({
        busy: false,
        message: '',
    });

    const [profileText, setProfileText] = useState('')

    return (
        <KeyboardDismiss>
            <Body>
                <FlexSection>
                    <RegistUp4MeLogo />
                    <RegistHeader>Profieltekst</RegistHeader>

                    <View style={[RegistStyles.container, styles.flexinput]}>

                        <TextInputField
                            // initValue={whatever we got from the backend}
                            onChange={(input) => {
                                setProfileText(input);
                            }}
                        />


                    </View>
                </FlexSection>

                <View style={RegistStyles.bottom}>
                    <NetworkFeedBackIndicator style={RegistStyles.waitIndicator} message={netFeedback.message} />
                    <UpForMeButton style={RegistStyles.botButton} title={'doorgaan'} enabled={(profileText.length > 4 && !netFeedback.busy)} onPress={async () => {
                        setNetFeedback({
                            busy: true,
                            message: networkFeedbackMessages.wait,
                        })

                        if (devMode.network) {
                            console.log('request:', getEndpoint(endpoints.post.login));
                        }
                    }} />
                </View>

            </Body>
        </KeyboardDismiss>
    );
}
const styles = StyleSheet.create({

    flexinput: {
        marginVertical: 25,
    },


});

export default RegistProfileText;
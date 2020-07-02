import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { RegistStyles } from '../../../styles/RegistStyles';

import Body, { FlexSection } from '../../../components/Body';
import UpForMeButton from '../../../components/UpForMeButton';
import RegistUp4MeLogo from '../../../components/LoginAndRegistration/RegistUp4MeLogo';
import RegistHeader from '../../../components/LoginAndRegistration/RegistHeader';
import TextQuicksand from '../../../components/TextQuicksand';
import NetworkFeedBackIndicator from '../../../components/waitIndicator';
import { openBrowser } from '../../../functions/bowser';
import UploadPictures from '../../../components/bigComponents/UploadPictures';

const RegistPhotos = () => {

    const [netFeedback, setNetFeedback] = useState({
        busy: false,
        message: '',
    });

    return (
        <Body>
            <FlexSection>
                <RegistUp4MeLogo />
                <RegistHeader>Foto's toevoegen</RegistHeader>

                <View style={[RegistStyles.container]}>

                    <UploadPictures />

                    <TextQuicksand style={styles.underline} onPress={() => { openBrowser('https://www.uptodates.nl/richtlijnen-veiligheid') }}>Lees de richtlijnen</TextQuicksand>
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

export default RegistPhotos;
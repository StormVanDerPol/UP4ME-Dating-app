import React, { useState } from 'react';
import { View } from 'react-native';

import { RegistStyles } from '../../../styles/RegistStyles';

import Body, { FlexSection } from '../../../components/Body';
import WaitIndicator from '../../../components/waitIndicator';
import UpForMeButton from '../../../components/UpForMeButton';
import RegistUp4MeLogo from '../../../components/LoginAndRegistration/RegistUp4MeLogo';
import RegistHeader from '../../../components/LoginAndRegistration/RegistHeader';

const RegistUserProperties = () => {

    const [busy, setBusy] = useState(false);

    return (
        <Body>
            <FlexSection>
                <RegistUp4MeLogo />
                <RegistHeader>Eigenschappen</RegistHeader>

                <View style={RegistStyles.container}>

                </View>
            </FlexSection>

            <View style={RegistStyles.bottom}>
                <WaitIndicator style={RegistStyles.waitIndicator} visible={busy} />
                <UpForMeButton style={RegistStyles.botButton} title={'doorgaan'} enabled={false} onPress={async () => { }} />
            </View>

        </Body>
    );
}

export default RegistUserProperties;
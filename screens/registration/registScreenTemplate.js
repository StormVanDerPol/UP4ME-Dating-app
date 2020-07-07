import React, { useState } from 'react';
import { View } from 'react-native';


import Body, { FlexSection } from '../../../components/Body';
import UpForMeButton from '../../../components/UpForMeButton';
import RegistUp4MeLogo from '../../../components/LoginAndRegistration/RegistUp4MeLogo';
import RegistHeader from '../../../components/LoginAndRegistration/RegistHeader';
import NetworkFeedBackIndicator from '../../../components/waitIndicator';
import { dodoFlight } from '../../functions/dodoAirlines';
import endpoints, { getEndpoint } from '../../res/data/endpoints';
import { DATA_STORE } from '../../stored/dataStore';
import { networkFeedbackMessages } from '../../components/waitIndicator';
import { RegistStyles } from '../../styles/RegistStyles';


const RegistTemplate = () => {

    const [netFeedback, setNetFeedback] = useState({
        busy: false,
        message: '',
    });

    return (
        <Body>
            <FlexSection>
                <RegistUp4MeLogo />
                <RegistHeader>Template</RegistHeader>

                <View style={RegistStyles.container}>

                </View>
            </FlexSection>

            <View style={RegistStyles.bottom}>
                <NetworkFeedBackIndicator style={RegistStyles.waitIndicator} message={netFeedback.message} />
                <UpForMeButton style={RegistStyles.botButton} title={'doorgaan'} enabled={false} onPress={async () => {
                    setNetFeedback({
                        busy: true,
                        message: networkFeedbackMessages.wait,
                    })

                    await dodoFlight({
                        method: 'post',
                        url: getEndpoint(endpoints.post.something),
                        data: {
                            userid: DATA_STORE.userID,
                        },

                        thenCallback: (res) => {
                            setNetFeedback({
                                busy: false,
                                message: '',
                            })
                        },

                        catchCallback: (err) => {
                            setNetFeedback({
                                busy: false,
                                message: networkFeedbackMessages.err
                            })
                        }
                    })
                }} />
            </View>

        </Body>
    );
}

export default RegistTemplate;
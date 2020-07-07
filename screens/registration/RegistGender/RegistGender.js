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
import SelectGender from '../../../components/bigComponents/SelectGender';
import { dodoFlight } from '../../../functions/dodoAirlines';
import { DATA_STORE } from '../../../stored/dataStore';
import { navigationProxy } from '../../../navigation/navigationProxy';


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

                    await dodoFlight({
                        method: 'post',
                        url: getEndpoint(endpoints.post.setGender),
                        data: {
                            userid: DATA_STORE.userID,
                            geslacht: gender + 1,
                        },
                        thenCallback: (res) => {
                            if (res.data == true) {
                                setNetFeedback({
                                    busy: false,
                                    message: '',
                                })

                                navigationProxy.navigate('RegistPhotos');
                            }
                            else {
                                setNetFeedback({
                                    busy: false,
                                    message: networkFeedbackMessages.err,
                                })
                            }
                        },

                        catchCallback: (err) => {
                            setNetFeedback({
                                busy: false,
                                message: networkFeedbackMessages.err,
                            })
                        }
                    })

                }} />
            </View>

        </Body>
    );
}

export default RegistGender;
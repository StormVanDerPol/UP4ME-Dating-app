import React, { useState } from 'react';
import { RegistStyles } from '../../styles/RegistStyles';
import Body, { FlexSection } from '../../components/Body';
import SelectGender from '../../components/bigComponents/SelectGender';
import { View } from 'react-native';
import NetworkFeedBackIndicator, { networkFeedbackMessages } from '../../components/waitIndicator';
import UpForMeButton from '../../components/UpForMeButton';
import { dodoFlight } from '../../functions/dodoAirlines';
import endpoints, { getEndpoint } from '../../res/data/endpoints';
import { navigationProxy } from '../../navigation/navigationProxy';
import { DATA_STORE } from '../../stored/dataStore';
import NavBar, { nbroutes } from '../../components/navBar/NavBar';

const EditGender = () => {

    const [netFeedback, setNetFeedback] = useState({
        busy: false,
        message: '',
    });

    const [gender, setGender] = useState(DATA_STORE.profileCache[DATA_STORE.userID].geslacht - 1);

    return (
        <Body>

            <NavBar route={nbroutes.profile} />
            <FlexSection>

                <View style={RegistStyles.container}>

                    <SelectGender initValue={gender} onChange={(penis) => {
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

                                DATA_STORE.profileCache[DATA_STORE.userID].geslacht = gender + 1;

                                navigationProxy.goBack();
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

export default EditGender;
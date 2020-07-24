import React, { useState } from 'react';
import Body, { FlexSection } from '../../components/Body';
import InputLocation from '../../components/bigComponents/InputLocation';
import { DATA_STORE } from '../../stored/dataStore';
import { RegistStyles } from '../../styles/RegistStyles';
import NetworkFeedBackIndicator, { networkFeedbackMessages } from '../../components/waitIndicator';
import UpForMeButton from '../../components/UpForMeButton';
import { View } from 'react-native';
import { navigationProxy } from '../../navigation/navigationProxy';
import { dodoFlight } from '../../functions/dodoAirlines';
import endpoints, { getEndpoint } from '../../res/data/endpoints';
import NavBar, { nbroutes } from '../../components/navBar/NavBar';

const EditLocation = () => {

    const [placeName, setPlaceName] = useState(DATA_STORE.profileCache[DATA_STORE.userID].zoektin);

    const [netFeedback, setNetFeedback] = useState({
        busy: false,
        message: '',
    });

    return (
        <Body>

            <NavBar route={nbroutes.profile} />
            <FlexSection>
                <InputLocation initVal={placeName} onBlur={(output) => {
                    setPlaceName(output);
                    DATA_STORE.profileCache[DATA_STORE.userID].zoektin = output;
                }} />
            </FlexSection>

            <View style={RegistStyles.bottom}>
                <NetworkFeedBackIndicator style={RegistStyles.waitIndicator} message={netFeedback.message} />
                <UpForMeButton style={RegistStyles.botButton} title={'opslaan'} enabled={(placeName.length > 0 && !netFeedback.busy)} onPress={async () => {
                    setNetFeedback({
                        busy: true,
                        message: networkFeedbackMessages.wait,
                    })

                    await dodoFlight({
                        method: 'post',
                        url: getEndpoint(endpoints.post.setPlace),
                        data: {
                            userid: DATA_STORE.userID,
                            woontin: placeName,
                        },

                        thenCallback: (res) => {

                            if (res.data) {

                                setNetFeedback({
                                    busy: false,
                                    message: '',
                                });

                                navigationProxy.reset({
                                    index: 1,
                                    routes: [
                                        {
                                            name: 'ProfileHub',
                                            params: {},
                                        },
                                        {
                                            name: 'Settings',
                                            params: {},
                                        },
                                    ]
                                });
                            }
                        },

                        catchCallback: (err) => {
                            setNetFeedback({
                                busy: false,
                                message: networkFeedbackMessages.err,
                            });
                        },
                    })

                }} />
            </View>

        </Body>
    );
}

export default EditLocation;
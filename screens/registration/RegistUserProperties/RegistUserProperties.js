import React, { useState, useRef } from 'react';

import { View, StyleSheet } from 'react-native';

import { RegistStyles } from '../../../styles/RegistStyles';

import { dodoFlight } from '../../../functions/dodoAirlines';
import endpoints, { getEndpoint } from '../../../res/data/endpoints';

import { DATA_STORE } from '../../../stored/dataStore';

import Body, { FlexSection } from '../../../components/Body';
import RegistHeader from '../../../components/LoginAndRegistration/RegistHeader';
import NetworkFeedBackIndicator, { networkFeedbackMessages } from '../../../components/waitIndicator';
import UpForMeButton from '../../../components/UpForMeButton';
import { navigationProxy } from '../../../navigation/navigationProxy';
import RegistUp4MeLogo from '../../../components/LoginAndRegistration/RegistUp4MeLogo';
import InputProperties from '../../../components/bigComponents/InputProperties';
import TextQuicksand from '../../../components/TextQuicksand';
import up4meColours from '../../../res/data/colours';


const RegistUserProperties = () => {

    const [netFeedback, setNetFeedback] = useState({
        busy: false,
        message: '',
    });

    const userProperties = useRef({
        sport: 0,
        party: 0,
        smoking: 0,
        alcohol: 0,
        politics: 0,
        work: 0,
        kids: 0,
        kidWish: 0,
        food: 0,
    });

    return (
        <Body>
            <FlexSection>
                <RegistUp4MeLogo />
                <RegistHeader>Eigenschappen</RegistHeader>


                <View style={RegistStyles.container}>
                    <TextQuicksand style={{
                        ...styles.info,
                        ...RegistStyles.topMargin,
                    }}>Hoe meer informatie je invult, hoe groter de kans op een match, Je potentiële matchen kunnen hier op filteren.</TextQuicksand>

                    <InputProperties

                        initValues={userProperties.current}

                        onChange={(output) => {
                            userProperties.current = output;
                        }} />
                </View>

            </FlexSection>

            <View style={RegistStyles.bottom}>
                <NetworkFeedBackIndicator style={RegistStyles.waitIndicator} message={netFeedback.message} />
                <UpForMeButton style={RegistStyles.botButton} title={'doorgaan'} enabled={true} onPress={async () => {
                    setNetFeedback({
                        busy: true,
                        message: networkFeedbackMessages.wait,
                    })

                    await dodoFlight({
                        method: 'post',
                        url: getEndpoint(endpoints.post.setProperties),
                        data: {
                            userid: DATA_STORE.userID,
                            sport: userProperties.current.sport,
                            feesten: userProperties.current.party,
                            roken: userProperties.current.smoking,
                            alcohol: userProperties.current.alcohol,
                            stemmen: userProperties.current.politics,
                            werken: userProperties.current.work,
                            kinderen: userProperties.current.kids,
                            kinderwens: userProperties.current.kidWish,
                            eten: userProperties.current.food,
                        },

                        thenCallback: (res) => {

                            if (res.data) {

                                setNetFeedback({
                                    busy: false,
                                    message: '',
                                });

                                navigationProxy.navigate('RegistCriteria');
                            }
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

const styles = StyleSheet.create({
    info: {
        color: '#666',
    }
})

export default RegistUserProperties;
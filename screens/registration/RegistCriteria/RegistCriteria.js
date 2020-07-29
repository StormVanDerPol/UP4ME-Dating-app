import React, { useState, useRef, useEffect } from 'react';
import { View } from 'react-native';

import NetworkFeedBackIndicator, { networkFeedbackMessages } from '../../../components/waitIndicator';
import { DATA_STORE } from '../../../stored/dataStore';
import { RegistStyles } from '../../../styles/RegistStyles';

import UpForMeButton from '../../../components/UpForMeButton';
import Body, { FlexSection } from '../../../components/Body';
import RegistUp4MeLogo from '../../../components/LoginAndRegistration/RegistUp4MeLogo';
import RegistHeader from '../../../components/LoginAndRegistration/RegistHeader';
import InputCriteria from '../../../components/bigComponents/InputCriteria';
import postCriteria from '../../../requests/postCriteria';

const RegistCriteria = () => {

    const [netFeedback, setNetFeedback] = useState({
        busy: false,
        message: '',
    });

    const userCriteria = useRef({
        sport: 4,
        party: 4,
        smoking: 4,
        alcohol: 4,
        politics: 5,
        work: 4,
        kids: 3,
        kidWish: 4,
        food: 4,

        ages: [25, 50],
        heights: [155, 175],
        distance: 125,

        gender: -1,
    })

    const [prevGender, setPrevGender] = useState(-1)

    return (
        <Body>
            <FlexSection>
                <RegistUp4MeLogo />
                <RegistHeader>Wie zoek je?</RegistHeader>

                <View style={RegistStyles.container}>

                    <InputCriteria
                        onChange={(output) => {
                            userCriteria.current = output;

                            if (userCriteria.current.gender != prevGender) {
                                setPrevGender(userCriteria.current.gender);
                            }
                            // console.log(userCriteria.current)
                        }}
                    />

                </View>
            </FlexSection>

            <View style={RegistStyles.bottom}>
                <NetworkFeedBackIndicator style={RegistStyles.waitIndicator} message={netFeedback.message} />
                <UpForMeButton style={RegistStyles.botButton} title={'doorgaan'} enabled={(userCriteria.current.gender != -1)} onPress={async () => {

                    setNetFeedback({
                        busy: true,
                        message: networkFeedbackMessages.wait,
                    })

                    await postCriteria(
                        DATA_STORE.userID,
                        userCriteria.current,
                        () => {
                            setNetFeedback({
                                busy: false,
                                message: '',
                            });
                        },
                        () => {
                            setNetFeedback({
                                busy: false,
                                message: networkFeedbackMessages.err
                            })
                        })
                }} />
            </View>

        </Body>
    );
}

export default RegistCriteria;
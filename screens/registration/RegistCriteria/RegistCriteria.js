import React, { useState, useRef, useEffect } from 'react';
import { View, Alert } from 'react-native';

import NetworkFeedBackIndicator, { networkFeedbackMessages } from '../../../components/waitIndicator';
import { DATA_STORE } from '../../../stored/dataStore';
import endpoints, { getEndpoint } from '../../../res/data/endpoints';
import { dodoFlight } from '../../../functions/dodoAirlines';
import { RegistStyles } from '../../../styles/RegistStyles';

import UpForMeButton from '../../../components/UpForMeButton';
import Body, { FlexSection } from '../../../components/Body';
import RegistUp4MeLogo from '../../../components/LoginAndRegistration/RegistUp4MeLogo';
import RegistHeader from '../../../components/LoginAndRegistration/RegistHeader';
import InputCriteria from '../../../components/bigComponents/InputCriteria';
import { useCompare } from '../../../hooks/hooks';

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

                    //POST CRITERIA
                    await dodoFlight({
                        method: 'post',
                        url: getEndpoint(endpoints.post.setCriteria),
                        data: {
                            userid: DATA_STORE.userID,
                            sport: userCriteria.current.sport,
                            feesten: userCriteria.current.party,
                            roken: userCriteria.current.smoking,
                            alcohol: userCriteria.current.alcohol,
                            stemmen: userCriteria.current.politics,
                            werken: userCriteria.current.work,
                            kinderen: userCriteria.current.kids,
                            kinderwens: userCriteria.current.kidWish,
                            eten: userCriteria.current.food,
                            afstand: userCriteria.current.distance,
                            geslacht: userCriteria.current.gender,
                            minlengte: userCriteria.current.heights[0],
                            maxlengte: userCriteria.current.heights[1],
                            leeftijdmin: userCriteria.current.ages[0],
                            leeftijdmax: userCriteria.current.ages[1],
                        },

                        thenCallback: async (res) => {

                            //if criteria posting successful, set last login timestamp
                            if (res.data) {

                                await dodoFlight({
                                    method: 'get',
                                    url: getEndpoint(endpoints.get.setLastLogin) + DATA_STORE.userID,

                                    thenCallback: async (res) => {

                                        //if timestamp set, get potential matches
                                        if (res.data) {
                                            await dodoFlight({
                                                method: 'get',
                                                url: getEndpoint(endpoints.get.potentialMatches) + DATA_STORE.userID,

                                                thenCallback: (res) => {

                                                    //if potential matches, go to home screen, registration complete!
                                                    if (res.data != false) {
                                                        setNetFeedback({
                                                            busy: false,
                                                            message: '',
                                                        });

                                                        navigationProxy.navigate('Landing');
                                                    }
                                                    else {
                                                        //if no potential matches, ask the user to soften up, else just continue as normal
                                                        Alert.alert(
                                                            'Geen potentiële matches!',
                                                            'Versoepel je criteria om te kunnen matchen met andere gebruikers.',
                                                            [
                                                                {
                                                                    text: 'Toch doorgaan', onPress: () => {
                                                                        navigationProxy.navigate('Landing');
                                                                    }
                                                                },
                                                                {
                                                                    text: 'Okay!', onPress: () => {
                                                                        setNetFeedback({
                                                                            busy: false,
                                                                            message: '',
                                                                        })
                                                                    }
                                                                },
                                                            ],
                                                            { cancelable: false }
                                                        );
                                                    }
                                                },

                                                catchCallback: (err) => {
                                                    //pot match error
                                                    setNetFeedback({
                                                        busy: false,
                                                        message: networkFeedbackMessages.err
                                                    })
                                                }
                                            })
                                        }
                                        else {
                                            // TimeStamp error
                                            setNetFeedback({
                                                busy: false,
                                                message: networkFeedbackMessages.err
                                            })
                                        }
                                    }
                                })
                            }
                            else {
                                //if criteria posting unsuccessful
                                setNetFeedback({
                                    busy: false,
                                    message: networkFeedbackMessages.err
                                })
                            }
                        },

                        catchCallback: (err) => {

                            //criteria posting error
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

export default RegistCriteria;
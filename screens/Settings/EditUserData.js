import React, { useState, useEffect } from 'react';
import Body, { FlexSection } from '../../components/Body';
import KeyboardDismiss from '../../components/KeyboardDismiss';
import { RegistStyles } from '../../styles/RegistStyles';
import { View } from 'react-native';
import InputUserData from '../../components/bigComponents/InputUserData';
import { getYearIndex, toNonRetardDate, toRetardDate } from '../../res/data/time';
import { DATA_STORE } from '../../stored/dataStore';
import NetworkFeedBackIndicator, { networkFeedbackMessages } from '../../components/waitIndicator';
import UpForMeButton from '../../components/UpForMeButton';
import { dodoFlight } from '../../functions/dodoAirlines';
import endpoints, { getEndpoint } from '../../res/data/endpoints';
import { timeouts } from '../../res/data/requests';
import { MemeMath } from '../../functions/math';
import { navigationProxy } from '../../navigation/navigationProxy';
import NavBar, { nbroutes } from '../../components/navBar/NavBar';

export const deRetardifyUserData = (userid) => {

    const data = DATA_STORE.profileCache[userid];

    const output = {
        name: data.naam,
        job: data.beroep,
        birthday: toNonRetardDate(data.geboortedatum),
        height: data.lengte,
    };

    output.birthday = {
        day: Number(output.birthday.day),
        month: Number(output.birthday.month),
        year: Number(output.birthday.year),
    }

    return output;
}

const EditUserData = () => {

    const initData = deRetardifyUserData(DATA_STORE.userID);



    const [userData, setUserData] = useState({
        job: initData.job,
        name: initData.name,
        birthday: initData.birthday,
        height: initData.height,
    });

    const [netFeedback, setNetFeedback] = useState({
        busy: false,
        message: '',
    })

    useEffect(() => {
        console.log(initData, userData)
    }, [userData])

    return (
        <KeyboardDismiss>
            <Body>
                <NavBar route={nbroutes.profile} />
                <FlexSection>
                    <View style={[RegistStyles.container]}>

                        <InputUserData

                            initValues={initData}

                            onChange={(input) => {
                                setUserData({ ...input });
                            }} />


                    </View>
                </FlexSection>

                <View style={RegistStyles.bottom}>
                    <NetworkFeedBackIndicator style={RegistStyles.waitIndicator} message={netFeedback.message} />
                    <UpForMeButton style={RegistStyles.botButton} title={'opslaan'} enabled={
                        (userData.job.length > 0 && userData.name.length > 0 && !netFeedback.busy)
                    }
                        onPress={async () => {

                            setNetFeedback({
                                busy: true,
                                message: networkFeedbackMessages.wait,
                            });

                            let newData = {
                                naam: userData.name,
                                geboortedatum: toRetardDate(userData.birthday),
                                beroep: userData.job,
                                lengte: MemeMath.roundTwoDecimals(userData.height),
                            }

                            DATA_STORE.profileCache[DATA_STORE.userID] = {
                                ...DATA_STORE.profileCache[DATA_STORE.userID],
                                ...newData,
                            }


                            await dodoFlight({
                                method: 'post',
                                url: getEndpoint(endpoints.post.setUserData),
                                timeout: timeouts.short,
                                data: {
                                    userid: DATA_STORE.userID,
                                    ...newData,
                                },

                                thenCallback: (res) => {

                                    if (res.data == true) {
                                        navigationProxy.reset({
                                            index: 2,
                                            routes: [
                                                {
                                                    name: 'Home',
                                                    params: {},
                                                },
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
                                        netFeedback.message = '';
                                    }
                                    else {
                                        netFeedback.message = networkFeedbackMessages.err;
                                    }
                                    setNetFeedback({
                                        ...netFeedback,
                                        busy: false,
                                    });
                                },

                                catchCallback: () => {
                                    setNetFeedback({
                                        busy: false,
                                        message: networkFeedbackMessages.err,
                                    });
                                }
                            })
                        }} />
                </View>
            </Body>
        </KeyboardDismiss>
    );
}

export default EditUserData;
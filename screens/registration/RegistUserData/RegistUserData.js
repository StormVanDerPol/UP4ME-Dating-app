import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { RegistStyles } from '../../../styles/RegistStyles';

import Body, { FlexSection } from '../../../components/Body';
import WaitIndicator from '../../../components/waitIndicator';
import UpForMeButton from '../../../components/UpForMeButton';
import RegistUp4MeLogo from '../../../components/LoginAndRegistration/RegistUp4MeLogo';
import RegistHeader from '../../../components/LoginAndRegistration/RegistHeader';
import TextQuicksand from '../../../components/TextQuicksand';

import KeyboardDismiss from '../../../components/KeyboardDismiss';
import InputUserData from '../../../components/bigComponents/InputUserData';
import Axios from 'axios';
import endpoints, { getEndpoint } from '../../../res/data/endpoints';
import { DATA_STORE } from '../../../stored/dataStore';
import { timeouts } from '../../../res/data/requests';
import { devMode } from '../../../dev/devConfig';

const RegistUserData = () => {

    const [busy, setBusy] = useState(false);

    const [userData, setUserData] = useState({
        name: '',
        job: '',
        birthday: null,
        height: null,
    });

    return (
        <KeyboardDismiss>
            <Body>
                <FlexSection>
                    <RegistUp4MeLogo />
                    <RegistHeader>Mijn gegevens</RegistHeader>

                    <View style={[RegistStyles.container]}>

                        <InputUserData onChange={(input) => {
                            setUserData({ ...input });
                        }} />


                    </View>

                    <View style={RegistStyles.bottom}>
                        <WaitIndicator style={RegistStyles.waitIndicator} visible={busy} />
                        <UpForMeButton title={'doorgaan'} enabled={
                            (userData.job.length > 0 && userData.name.length > 0)
                        }
                            onPress={async () => {

                                setBusy(true);

                                if (devMode.network) {
                                    console.log('request:', getEndpoint(endpoints.post.setUserData), {
                                        data: {
                                            userid: DATA_STORE.userToken,
                                            naam: userData.name,
                                            geboortedatum: userData.birthday.year + userData.birthday.month + userData.birthday.day,
                                            beroep: userData.job,
                                            lengte: userData.height,
                                        },
                                        headers: {
                                            authorization: DATA_STORE.userToken,
                                        }
                                    });
                                }

                                Axios.post(getEndpoint(endpoints.post.setUserData), {
                                    userid: DATA_STORE.userToken,
                                    naam: userData.name,
                                    geboortedatum: userData.birthday.year + userData.birthday.month + userData.birthday.day,
                                    beroep: userData.job,
                                    lengte: userData.height,
                                }, {
                                    headers: {
                                        authorization: DATA_STORE.userToken,
                                    },
                                    timeout: timeouts.short,
                                })
                                    .then((res) => {
                                        console.log(res);
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    })
                                    .finally(() => {
                                        setBusy(false);
                                    })
                            }} />
                    </View>

                </FlexSection>



            </Body>
        </KeyboardDismiss>
    );
}




const styles = StyleSheet.create({

});

export default RegistUserData;
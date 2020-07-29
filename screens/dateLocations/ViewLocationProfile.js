import React, { useEffect, useState } from 'react';
import { DATA_STORE } from '../../stored/dataStore';
import Body, { FlexSection } from '../../components/Body';
import { ArrowButtonTop } from '../../components/UpForMeArrowButtons';
import { navigationProxy } from '../../navigation/navigationProxy';
import { dodoFlight } from '../../functions/dodoAirlines';
import endpoints, { getEndpoint } from '../../res/data/endpoints';
import LocationProfile from '../../components/bigComponents/LocationProfile';
import AlbeitABitLate from '../../components/bigComponents/AlbeitABitLate';
import { networkFeedbackMessages } from '../../components/waitIndicator';
import { timeouts } from '../../res/data/requests';
import { Alert } from 'react-native';

const ViewLocationProfile = ({ route }) => {

    const [data, setData] = useState(null);

    const [netfeedback, setNetfeedback] = useState({
        message: '',
        busy: false,
    })

    useEffect(() => {
        dodoFlight({
            method: 'get',
            url: getEndpoint(endpoints.get.resProfile) + route.params.resid,

            thenCallback: (res) => {
                setData(res.data[0]);
            }
        })
    }, [])

    useEffect(() => {
        console.log(data);
    }, [data])

    return (
        <Body>
            <FlexSection>
                <ArrowButtonTop header={'Details locatie'}
                    onPress={() => {
                        navigationProxy.goBack();
                    }}
                />

                {(data != null) ? <LocationProfile data={data} /> : <></>}
            </FlexSection>

            <AlbeitABitLate title={'Plan een date'} enableCondition={(!netfeedback.busy)} onPress={
                async () => {
                    setNetfeedback({
                        message: networkFeedbackMessages.wait,
                        busy: true,
                    });

                    await dodoFlight({
                        method: 'get',
                        url: getEndpoint(endpoints.get.matches) + DATA_STORE.userID,
                        timeout: timeouts.short,

                        thenCallback: (res) => {
                            DATA_STORE.matches = res.data;

                            setNetfeedback({
                                message: '',
                                busy: false,
                            });

                            if (res.data) {
                                navigationProxy.navigate('MatchOverviewFromLocations');
                                DATA_STORE.currentResID = data.resid;

                                console.log(DATA_STORE.currentResID);
                            }
                            else
                                Alert.alert(
                                    'No matches, silly!',
                                    `Can't plan a date if you ain't got any matches, now get swiping!`,
                                    [
                                        {
                                            text: 'Yes master', onPress: () => {
                                                navigationProxy.reset({
                                                    index: 0,
                                                    routes: [
                                                        {
                                                            name: 'LoadHome',
                                                            params: {},
                                                        }
                                                    ]
                                                });
                                            },
                                        },
                                        {
                                            text: 'No no! I refuse!', onPress: () => {
                                                let crash = 0;
                                                while (crash == 0) {
                                                    alert('The app will now crash, this is a feature');
                                                }
                                            }
                                        }
                                    ]
                                )
                        }
                    });

                }
            } />

        </Body>
    );
}

export default ViewLocationProfile;
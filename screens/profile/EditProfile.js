import React, { useState } from 'react';
import Body, { FlexSection } from '../../components/Body';
import NavBar, { nbroutes } from '../../components/navBar/NavBar';
import UpForMeBigRadioButton from '../../components/UpForMeBigRadioButton';
import InputProperties from '../../components/bigComponents/InputProperties';
import TextInputField from '../../components/bigComponents/TextInputField';
import UploadPictures from '../../components/bigComponents/UploadPictures';
import TextQuicksand from '../../components/TextQuicksand';
import { View, StyleSheet, Alert } from 'react-native';
import { registParams, RegistStyles } from '../../styles/RegistStyles';
import NetworkFeedBackIndicator, { networkFeedbackMessages } from '../../components/waitIndicator';
import UpForMeButton from '../../components/UpForMeButton';
import { DATA_STORE } from '../../stored/dataStore';
import { navigationProxy } from '../../navigation/navigationProxy';
import endpoints, { getEndpoint } from '../../res/data/endpoints';
import { dodoFlight } from '../../functions/dodoAirlines';
import postProfileEdits from '../../requests/postProfileEdits';

export const deRetardifyEditProfile = (userid) => {

    const data = DATA_STORE.profileCache[userid];

    const output = {
        images: [],

        userProps: {
            sport: data.sporten,
            party: data.feesten,
            smoking: data.roken,
            alcohol: data.alcohol,
            politics: data.stemmen,
            food: data.eten,
            work: data.uur40,
            kids: data.kids,
            kidWish: data.kidwens
        },

        desc: data.profieltext,

        profilePicture: null,
    }

    let checkImages = [
        data.foto1,
        data.foto2,
        data.foto3,
        data.foto4,
        data.foto5,
        data.foto6,
    ];

    for (let image of checkImages) {
        output.images.push((image) ? image : '');
    }



    return output;
}

const EditProfile = () => {

    const data = deRetardifyEditProfile(DATA_STORE.userID);

    const [newData, setNewData] = useState(data);

    const [netFeedback, setNetFeedback] = useState({
        message: '',
        busy: false,
    })

    return (
        <Body>
            <NavBar route={nbroutes.profile} />
            <FlexSection>

                <View style={styles.container}>
                    <UpForMeBigRadioButton active={0} headers={['Bewerken', 'Voorbeeld']}
                        onChange={async (active) => {
                            if (active == 1 && !netFeedback.busy) {

                                setNetFeedback({
                                    busy: true,
                                    message: networkFeedbackMessages.wait,
                                })

                                await postProfileEdits({
                                    oldData: data,
                                    newData: newData,
                                    onSuccess: () => {

                                        setNetFeedback({
                                            busy: false,
                                            message: '',
                                        })

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
                                                    name: 'ExampleProfile',
                                                    params: {},
                                                },
                                            ]
                                        });
                                    },
                                    onFail: () => {

                                        setNetFeedback({
                                            busy: false,
                                            message: networkFeedbackMessages.err,
                                        })

                                        alert(`Error updating profile data`)
                                    }
                                })
                            }
                        }}
                    />
                </View>

                <View style={styles.container}>
                    <TextQuicksand style={styles.header}>Profieltekst</TextQuicksand>
                    <TextInputField
                        initValue={data.desc}
                        onChange={(output) => {
                            setNewData({
                                ...newData,
                                desc: output,
                            });
                        }} />
                </View>

                <View style={styles.container}>
                    <TextQuicksand style={styles.header}>Foto's</TextQuicksand>
                    <UploadPictures
                        initImages={data.images}
                        onChange={(output) => {
                            setNewData({
                                ...newData,
                                images: output.images,
                                profilePicture: output.profilePicture
                            })
                        }}
                    />
                </View>

                <View style={styles.containerProperties}>
                    <TextQuicksand style={styles.header}>Eigenschappen</TextQuicksand>
                    <TextQuicksand style={styles.subHeader}>Hoe meer informatie je invult, hoe groter de kans op een match. Je potentiële matches kunnen hier op filteren</TextQuicksand>
                </View>

                <InputProperties
                    initValues={data.userProps}
                    onChange={(output) => {
                        setNewData({
                            ...newData,
                            userProps: output,
                        });
                    }} />

            </FlexSection>

            <View style={RegistStyles.bottom}>
                <NetworkFeedBackIndicator style={RegistStyles.waitIndicator} message={netFeedback.message} />
                <UpForMeButton style={RegistStyles.botButton} title={'Opslaan'}
                    enabled={(!netFeedback.busy && newData.desc.length > 4 && (newData.images[0] != '' && newData.images[0]))} onPress={async () => {

                        setNetFeedback({
                            busy: true,
                            message: networkFeedbackMessages.wait,
                        });

                        //Handle all profile editing calls
                        await postProfileEdits({
                            oldData: data,
                            newData: newData,
                            onSuccess: async () => {
                                setNetFeedback({
                                    busy: false,
                                    message: '',
                                });

                                //If all calls succeed, call getpotentials.
                                await dodoFlight({
                                    method: 'get',
                                    url: getEndpoint(endpoints.get.potentialMatches) + DATA_STORE.userID,

                                    thenCallback: (res) => {
                                        //If potentials
                                        if (res.data != false) {
                                            DATA_STORE.pMatches.list = res.data;
                                            DATA_STORE.pMatches.timeStamp = Date.now();
                                            navigationProxy.reset({
                                                index: 1,
                                                routes: [
                                                    {
                                                        name: 'Home',
                                                        params: {},
                                                    },
                                                    {
                                                        name: 'ProfileHub',
                                                        params: {},
                                                    },
                                                ]
                                            })
                                        }
                                        else {
                                            //if no potential matches, ask the user to soften up, else just continue as normal
                                            Alert.alert(
                                                'Geen potentiële matches!',
                                                'Versoepel je criteria om te kunnen matchen met andere gebruikers.',
                                                [
                                                    {
                                                        text: 'Doorgaan', onPress: () => {

                                                            DATA_STORE.pMatches.list = res.data;
                                                            DATA_STORE.pMatches.timeStamp = Date.now();

                                                            navigationProxy.reset({
                                                                index: 1,
                                                                routes: [
                                                                    {
                                                                        name: 'Home',
                                                                        params: {},
                                                                    },
                                                                    {
                                                                        name: 'ProfileHub',
                                                                        params: {},
                                                                    }
                                                                ]
                                                            })
                                                        }
                                                    },
                                                    {
                                                        text: 'Okay!', onPress: () => {
                                                            setNetFeedback({
                                                                busy: false,
                                                                message: '',
                                                            });
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
                                            message: networkFeedbackMessages.err,
                                        });
                                    }
                                })
                            },
                            onFail: () => {
                                setNetFeedback({
                                    busy: false,
                                    message: networkFeedbackMessages.err,
                                });
                            }
                        })

                    }} />
            </View>
        </Body>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: registParams.xMargin,
        paddingVertical: 24,
        borderBottomWidth: 1,
        borderColor: '#666',
    },

    containerProperties: {
        paddingVertical: 24,
        paddingHorizontal: registParams.xMargin,
    },

    header: {
        fontSize: 24,
        color: '#333',
        marginBottom: 5,
    },

    subHeader: {
        fontSize: 16,
    }
})

export default EditProfile;
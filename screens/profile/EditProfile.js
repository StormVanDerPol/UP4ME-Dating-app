import React, { useState, useEffect } from 'react';
import Body, { FlexSection } from '../../components/Body';
import NavBar, { nbroutes } from '../../components/navBar/NavBar';
import UpForMeBigRadioButton from '../../components/UpForMeBigRadioButton';
import InputProperties from '../../components/bigComponents/InputProperties';
import TextInputField from '../../components/bigComponents/TextInputField';
import UploadPictures, { createProfilePicture } from '../../components/bigComponents/UploadPictures';
import TextQuicksand from '../../components/TextQuicksand';
import { View, StyleSheet } from 'react-native';
import { registParams, RegistStyles } from '../../styles/RegistStyles';
import NetworkFeedBackIndicator, { networkFeedbackMessages } from '../../components/waitIndicator';
import UpForMeButton from '../../components/UpForMeButton';
import { DATA_STORE } from '../../stored/dataStore';
import { postPhotos } from '../../requests/postPhotos';
import { navigationProxy } from '../../navigation/navigationProxy';
import endpoints, { getEndpoint } from '../../res/data/endpoints';
import { dodoFlight } from '../../functions/dodoAirlines';

export const deRetardifyEditProfile = (userid) => {


    const data = DATA_STORE.profileCache[userid];

    console.log(data);

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
    console.log(data)

    const [newData, setNewData] = useState(data);

    const [netFeedback, setNetFeedback] = useState({
        message: '',
        busy: false,
    })

    useEffect(() => {
        console.log(newData);
    }, [newData])

    return (
        <Body>
            <NavBar route={nbroutes.profile} />
            <FlexSection>

                <View style={styles.container}>
                    <UpForMeBigRadioButton active={0} headers={['Bewerken', 'Voorbeeld']}
                        onChange={(active) => {
                            if (active == 1) {
                                navigationProxy.reset({
                                    index: 1,
                                    routes: [
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
                        }} />
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

                        let profilePicture = newData.profilePicture;

                        if (!profilePicture) {
                            profilePicture = await createProfilePicture(newData.images[0]);
                        }

                        setNetFeedback({
                            busy: true,
                            message: networkFeedbackMessages.wait,
                        });

                        await postPhotos(
                            DATA_STORE.userID,
                            newData.images,
                            profilePicture,
                            async () => {

                                await dodoFlight({
                                    method: 'post',
                                    url: getEndpoint(endpoints.post.setProfileText),
                                    data: {
                                        userid: DATA_STORE.userID,
                                        profiletext: newData.desc,
                                    },

                                    thenCallback: async (res) => {

                                        if (res.data === true) {

                                            DATA_STORE.profileCache[DATA_STORE.userID].profieltext = newData.desc;

                                            const newProps = {
                                                userid: DATA_STORE.userID,
                                                sport: newData.userProps.sport,
                                                feesten: newData.userProps.party,
                                                roken: newData.userProps.smoking,
                                                alcohol: newData.userProps.alcohol,
                                                stemmen: newData.userProps.politics,
                                                werken: newData.userProps.work,
                                                kinderen: newData.userProps.kids,
                                                kinderwens: newData.userProps.kidWish,
                                                eten: newData.userProps.food,
                                            };

                                            await dodoFlight({
                                                method: 'post',
                                                url: getEndpoint(endpoints.post.setProperties),
                                                data: newProps,

                                                thenCallback: (res) => {

                                                    if (res.data) {

                                                        DATA_STORE.profileCache[DATA_STORE.userID].sporten = newProps.sport;
                                                        DATA_STORE.profileCache[DATA_STORE.userID].feesten = newProps.feesten;
                                                        DATA_STORE.profileCache[DATA_STORE.userID].roken = newProps.roken;
                                                        DATA_STORE.profileCache[DATA_STORE.userID].alcohol = newProps.alcohol;
                                                        DATA_STORE.profileCache[DATA_STORE.userID].stemmen = newProps.stemmen;
                                                        DATA_STORE.profileCache[DATA_STORE.userID].uur40 = newProps.werken;
                                                        DATA_STORE.profileCache[DATA_STORE.userID].kids = newProps.kinderen;
                                                        DATA_STORE.profileCache[DATA_STORE.userID].kidwens = newProps.kinderwens;
                                                        DATA_STORE.profileCache[DATA_STORE.userID].eten = newProps.eten;

                                                        setNetFeedback({
                                                            busy: false,
                                                            message: '',
                                                        });

                                                        navigationProxy.navigate('ProfileHub');
                                                    }
                                                },

                                                catchCallback: (err) => {
                                                    setNetFeedback({
                                                        busy: false,
                                                        message: networkFeedbackMessages.err
                                                    })
                                                }
                                            })
                                        }
                                    },

                                    catchCallback: (err) => {
                                        setNetFeedback({
                                            busy: false,
                                            message: networkFeedbackMessages.err,
                                        })
                                    },
                                })
                            },
                            () => {
                                setNetFeedback({
                                    busy: true,
                                    message: networkFeedbackMessages.err,
                                });
                            },
                        )

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
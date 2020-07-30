import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Body, { FlexSection } from '../../components/Body';
import NavBar, { nbroutes } from '../../components/navBar/NavBar';
import AlbeitABitLate from '../../components/bigComponents/AlbeitABitLate';
import UserProfile from '../../components/bigComponents/UserProfile';
import { ArrowButtonTop } from '../../components/UpForMeArrowButtons';
import UpForMeIcon, { iconIndex } from '../../components/UpForMeIcon';
import UpForMeModal from '../../components/UpForMeModal';
import UpForMeButton, { ButtonTypes } from '../../components/UpForMeButton';
import { DATA_STORE } from '../../stored/dataStore';
import { dodoFlight } from '../../functions/dodoAirlines';
import endpoints, { getEndpoint } from '../../res/data/endpoints';
import { navigationProxy } from '../../navigation/navigationProxy';
import { planThatDamnDate } from '../../functions/planThatDamnDate';

const InviteMatch = ({ route }) => {

    const userid = route.params.userid;

    const [modalVisible, setModalVisible] = useState(0);

    const myJobHereIsDone = () => {
        setModalVisible(0);

        navigationProxy.reset({
            index: 1,
            routes: [
                {
                    name: 'Home',
                    params: {},
                },
                {
                    name: 'LoadMatchOverview',
                    params: {},
                }
            ]
        })
    }

    return (
        <>
            <Body>
                <NavBar route={nbroutes.matches} />

                <FlexSection>

                    <View>
                        <ArrowButtonTop
                            icon={iconIndex.heart}
                            header={'Match'} onPress={() => {
                                navigationProxy.reset({
                                    index: 1,
                                    routes: [
                                        {
                                            name: 'Home',
                                            params: {},
                                        },
                                        {
                                            name: 'LoadMatchOverview',
                                            params: {},
                                        }
                                    ]
                                })
                            }} />
                        <UpForMeIcon style={styles.cancelMatchIcon} icon={iconIndex.match_dislike} touchable={true} onPress={() => {
                            setModalVisible(1);
                        }} />
                    </View>

                    <UserProfile userid={userid} hideReport={true} />

                    <AlbeitABitLate title={'Plan een date'} onPress={() => {

                        planThatDamnDate({
                            userid: userid,
                        });
                    }} />
                </FlexSection>
            </Body>

            <UpForMeModal
                onPressBackButton={() => {
                    setModalVisible(0);
                }}
                enabled={(modalVisible == 1)}>

                <View style={{ flex: 1 }} />

                <View style={styles.reportModal}>

                    <UpForMeButton style={styles.reportModalBtn} title={'Match opheffen'}
                        onPress={() => {
                            Alert.alert(
                                `Match opheffen`,
                                `Weet je zeker dat je niet meer will matchen met ${DATA_STORE.profileCache[userid].naam}?`,
                                [
                                    {
                                        text: 'Ja', onPress: () => {
                                            dodoFlight({
                                                method: 'post',
                                                url: getEndpoint(endpoints.post.setMatchResponses),
                                                data: {
                                                    userid1: DATA_STORE.userID,
                                                    userid2: userid,
                                                    interesse: -1,
                                                },

                                                thenCallback: (res) => {

                                                    myJobHereIsDone();
                                                },
                                            })
                                        }
                                    },
                                    {
                                        text: 'Anuleren', onPress: () => {

                                        }
                                    },
                                ],
                                { cancelable: true }
                            );

                        }}
                    />
                    <UpForMeButton style={styles.reportModalBtn} title={'Match raporteren'} buttonType={ButtonTypes.dimmed}
                        onPress={() => {
                            setModalVisible(3);
                        }}
                    />
                    <UpForMeButton style={styles.reportModalBtn} title={'Annuleren'} buttonType={ButtonTypes.white}
                        onPress={() => {
                            setModalVisible(0);
                        }} />
                </View>
            </UpForMeModal>

            <UpForMeModal
                onPressBackButton={() => {
                    setModalVisible(0);
                }}
                enabled={(modalVisible == 3)}>
                <View style={{ flex: 1 }} />

                <View style={styles.reportModal}>
                    <UpForMeButton style={styles.reportModalBtn} buttonType={ButtonTypes.dimmed} onPress={() => {

                        reportUser(1, DATA_STORE.userID, userid, () => {
                            myJobHereIsDone();
                        });

                    }} title={`Ongepaste foto's`} />
                    <UpForMeButton style={styles.reportModalBtn} buttonType={ButtonTypes.dimmed} onPress={() => {

                        reportUser(2, DATA_STORE.userID, userid, () => {
                            myJobHereIsDone();
                        });

                    }} title={'Catfish'} />
                    <UpForMeButton style={styles.reportModalBtn} buttonType={ButtonTypes.dimmed} onPress={() => {

                        reportUser(3, DATA_STORE.userID, userid, () => {
                            myJobHereIsDone();
                        });

                    }} title={'Lijkt op spam'} />

                    <UpForMeButton style={styles.reportModalBtn} onPress={() => {

                        reportUser(5, DATA_STORE.userID, userid, () => {
                            myJobHereIsDone();
                        });

                    }} title={'Reageert niet'} />

                    <UpForMeButton style={styles.reportModalBtn} onPress={() => {

                        reportUser(1, DATA_STORE.userID, userid, () => {
                            myJobHereIsDone();
                        });

                    }} title={'No show'} />
                    <UpForMeButton style={styles.reportModalBtn} title={'Annuleren'} buttonType={ButtonTypes.white}
                        onPress={() => {
                            setModalVisible(0)
                        }} />
                </View>
            </UpForMeModal>

        </>
    );
}

const styles = StyleSheet.create({
    cancelMatchIcon: {
        position: "absolute",
        right: 10,
        top: 15,
        height: 33,
        width: 33,
    },

    reportModal: {
        alignItems: "center",
        marginBottom: 24,
    },

    reportModalBtn: {
        marginVertical: 6,
    },
})

export default InviteMatch;
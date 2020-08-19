import React, { useState } from 'react';
import { DATA_STORE } from '../../stored/dataStore';
import { View, StyleSheet, Alert } from 'react-native';
import Body, { FlexSection } from '../../components/Body';
import FastImage from 'react-native-fast-image';
import NavBar, { nbroutes } from '../../components/navBar/NavBar';
import getDeviceDimensions from '../../functions/dimensions';
import TextQuicksand from '../../components/TextQuicksand';
import { writtenMonths } from '../../res/data/time';
import AlbeitABitLate from '../../components/bigComponents/AlbeitABitLate';
import LinearGradient from 'react-native-linear-gradient';
import up4meColours from '../../res/data/colours';
import UpForMeIcon, { iconIndex } from '../../components/UpForMeIcon';
import { ArrowButtonTop } from '../../components/UpForMeArrowButtons';
import { navigationProxy } from '../../navigation/navigationProxy';
import { dodoFlight } from '../../functions/dodoAirlines';
import { networkFeedbackMessages } from '../../components/waitIndicator';
import { openBrowser } from '../../functions/bowser';
import endpoints, { getEndpoint } from '../../res/data/endpoints';
import UpForMeModal from '../../components/UpForMeModal';
import checkCannedTuna from '../../functions/checkCannedTuna';
import UpForMeButton, { ButtonTypes } from '../../components/UpForMeButton';

const DateDetails = ({ route }) => {

    const dateData = route.params;

    console.log(dateData);

    const data = DATA_STORE.profileCache[dateData.userid];

    console.log(dateData);

    const [accept, setAccept] = useState(true);

    const [replyModalEnabled, setReplyModalEnabled] = useState(false);

    const [netFeedback, setNetFeedback] = useState({
        message: '',
        busy: false,
    })

    const callSetDate = async (status, redirect = true) => {
        setNetFeedback({
            busy: true,
            message: networkFeedbackMessages.wait,
        })

        let _tijd = ((dateData.dateData.tijd + '').length == 3) ? '0' + dateData.dateData.tijd : dateData.dateData.tijd;

        await dodoFlight({
            method: 'post',
            url: getEndpoint(endpoints.post.setDate),
            // url: `http:/192.168.1.10:8080/api/v1/set/date`,
            data: {
                userid1: DATA_STORE.userID,
                userid2: dateData.userid,
                status: status,
                date: dateData.dateData.datum,
                time: _tijd,
                resid: dateData.resData.resid,
                ronde: dateData.dateData.ronde,
            },

            thenCallback: () => {

                setNetFeedback({
                    busy: false,
                    message: '',
                })

                if (redirect)
                    navigationProxy.reset({
                        index: 1,
                        routes: [
                            {
                                name: 'Home',
                                params: {},
                            },
                            {
                                name: 'LoadDatesOverview',
                                params: {},
                            }
                        ],
                    })
            }
        })
    }

    const goToEdit = (canEditLocation = true) => {
        let _time = dateData.time.split(':');

        DATA_STORE.plannedDate = {
            userid: dateData.userid,
            time: {
                hr: _time[0],
                min: _time[1],
            },
            date: dateData.date,
            locationData: dateData.resData,
            phase: dateData.dateData.ronde
        }

        navigationProxy.navigate('EditDate', {
            canEdit: canEditLocation,
            // phase: dateData.dateData.ronde,
        })
    }

    const cannedTuna = (yourStatus, otherStatus, otherName, notisent) => {

        if (yourStatus == 1 || otherStatus == 1) {
            if (notisent == 1) {
                return {
                    type: 'reserved',
                    icons: false,
                    message: `Je hebt deze date afgewezen.`,
                }

            } else {
                return {
                    type: 'reserved',
                    icons: false,
                    message: `${otherName} heeft deze date afgewezen.`,
                }
            }
        }

        if (yourStatus == 3 || otherStatus == 3) {

            if (notisent == 1) {
                return {
                    type: 'reserved',
                    icons: false,
                    message: `Je hebt deze date gecancelled`,
                }

            } else {
                return {
                    type: 'reserved',
                    icons: false,
                    message: `${otherName} heeft deze date gecancelled`,
                }
            }

        }

        if (yourStatus == -1) {
            if (otherStatus == 2 || otherStatus == 4 || otherStatus == 5) {

                return {
                    type: 'change',
                    icons: false,
                    message: `${otherName} heeft een date voorgesteldt!`,
                }
            }
        }

        if (yourStatus == 2) {
            if (otherStatus == -1) {

                return {
                    type: 'change',
                    icons: false,
                    message: `Je hebt een date voorstel gedaan, wacht op ${otherName} zijn/haar reactie!`
                }
            }

            if (otherStatus == 4 || otherStatus == 5) {
                return {
                    type: 'change',
                    icons: false,
                    message: `${otherName} heeft de date aangepast.`
                }
            }

            if (otherStatus == 20) {
                return {
                    type: 'change',
                    icons: false,
                    message: `${otherName} heeft geaccepteerd!`
                }
            }
        }

        if (yourStatus == 4 || yourStatus == 5) {
            if (notisent == 1) {
                return {
                    type: 'change',
                    icons: false,
                    message: `Je hebt de date aangepast, wacht op ${otherName} zijn/haar reactie!`
                }
            }
            else {

                if (otherStatus == 20) {
                    return {
                        type: 'change',
                        icons: false,
                        message: `${otherName} heeft de date geaccepteerd. Jij bent nu verantwoordelijk voor de reservering. Type hierbij jullie beide voornamen en UP4ME.`,
                    }
                } else {
                    return {
                        type: 'change',
                        icons: false,
                        message: `${otherName} heeft de date aangepast.`
                    }
                }
            }
        }

        if (yourStatus == 6) {
            if (notisent == 1) {
                return {
                    type: 'change',
                    icons: false,
                    message: `${otherName} heeft de date geaccepteerd. Jij bent nu verantwoordelijk voor de reservering. Type hierbij jullie beide voornamen en UP4ME. Als het reserveren niet lukt is het mischien handig om een nieuw voorstel te doen.`
                }
            }
        }

        if (yourStatus == 60) {
            if (otherStatus == 20) {
                return {
                    type: 'reserved',
                    icons: false,
                    message: `Je hebt gereserveerd! Veel plezier met je date!`,
                }
            }
        }

        if (yourStatus == 20) {
            if (notisent == 1) {
                return {
                    type: 'change',
                    icons: false,
                    message: `Je hebt geaccepteerd!`
                }
            } else {

                if (otherStatus == 4) {
                    return {
                        type: 'change',
                        icons: false,
                        message: `${otherName} heeft de date aangepast.`
                    }
                }

                if (otherStatus == 6) {
                    return {
                        type: 'change',
                        icons: false,
                        message: `${otherName} is bezig met reserveren...!`
                    }
                }
                if (otherStatus == 60) {
                    return {
                        type: 'reserved',
                        icons: false,
                        message: `${otherName} heeft gereserveerd! Veel plezier met je date!`
                    }
                }
            }
        }

        if (yourStatus == 40 || yourStatus == 50) {
            if (notisent == -1) {
                if (otherStatus == 4 || otherStatus == 5) {
                    return {
                        type: 'change',
                        icons: false,
                        message: `${otherName} heeft de date aangepast.`
                    }
                }
            }
        }

        return {
            type: 'change',
            icons: false,
            message: `Steins;gate reached. you: ${yourStatus}, ${otherName}: ${otherStatus}, ${(notisent == -1) ? 'My turn' : otherName + ' turn'}`,
        }
    }

    const ultraTuna = cannedTuna(dateData.dateData.status, dateData.dateData.status2, data.naam, dateData.dateData.notisent);

    const muriDate = (dateData.dateData.status == 1 || dateData.dateData.status == 3 || dateData.dateData.status2 == 1 || dateData.dateData.status == 3);

    const TunaButton = ({ style = {}, title, newStatus }) => {
        return (
            <>
                {
                    (checkCannedTuna(
                        dateData.dateData.status,
                        dateData.dateData.status2,
                        newStatus,
                        dateData.dateData.datum,
                        dateData.dateData.tijd,
                        dateData.dateData.notisent,
                    ) == false) ? <></> : <UpForMeButton
                            style={style}
                            title={title}
                            onPress={async () => {

                                switch (true) {
                                    case (newStatus >= 1 && newStatus <= 3):
                                        callSetDate(newStatus);
                                        break;

                                    case (newStatus == 4):
                                        goToEdit();
                                        break;
                                    case (newStatus == 5):
                                        goToEdit(false);
                                        break;
                                    case (newStatus == 6):
                                        if (dateData.dateData.status != 6)
                                            await callSetDate(6, false);

                                        await openBrowser(dateData.resData.website).then(() => {
                                            Alert.alert(
                                                `Gereserveerd?`,
                                                `Alles gelukt met het reserven? Zo ja laat het ${data.naam} weten door op ja te drukken! Veel plezier met je date!`,
                                                [
                                                    {
                                                        text: 'Ja!',
                                                        onPress: async () => {
                                                            await callSetDate(6)
                                                        }
                                                    },
                                                    {
                                                        text: 'Nee',
                                                    }
                                                ],
                                                {
                                                    cancelable: true,
                                                }

                                            )
                                        });
                                        break;
                                }
                            }}
                        />
                }
            </>
        )
    }

    return (
        <>
            <Body>
                {/* <TextQuicksand>{dateData.dateData.status} - {dateData.dateData.status2} - {dateData.dateData.notisent}</TextQuicksand> */}
                <NavBar route={nbroutes.matches} />
                <FlexSection>

                    <ArrowButtonTop
                        icon={iconIndex.heart}
                        header={'Date'} onPress={() => {
                            navigationProxy.reset({
                                index: 1,
                                routes: [
                                    {
                                        name: 'Home',
                                        params: {}
                                    },
                                    {
                                        name: 'LoadDatesOverview',
                                        params: {},
                                    }
                                ]
                            })
                        }} />

                    <FastImage
                        style={styles.image}
                        source={{
                            uri: data.foto1,
                        }}
                    />

                    {(ultraTuna.message) ? <Notification
                        type={ultraTuna.type}
                        onChange={(output) => {
                            setAccept(output);
                        }}
                        icons={ultraTuna.icons}
                        message={ultraTuna.message}
                    /> : <></>}

                    <TextQuicksand style={styles.dateHeader}>Date met {data.naam}</TextQuicksand>

                    <View style={styles.infoItem}>
                        <UpForMeIcon style={styles.infoIcon} icon={iconIndex.calendar} />
                        <TextQuicksand style={styles.infoText}>{dateData.date.day} {writtenMonths[dateData.date.month - 1]} {dateData.date.year}</TextQuicksand>
                    </View>

                    <View style={styles.infoItem}>
                        <UpForMeIcon style={styles.infoIcon} icon={iconIndex.clock} />
                        <TextQuicksand style={styles.infoText}>{dateData.time}</TextQuicksand>
                    </View>
                    <View style={styles.infoItem}>
                        <UpForMeIcon style={styles.infoIcon} icon={iconIndex.location} />
                        <View>
                            <TextQuicksand style={styles.infoText}>{dateData.resData.naam}</TextQuicksand>
                            <TextQuicksand style={styles.infoText}>{dateData.resData.straat} {dateData.resData.huisnummer}</TextQuicksand>
                            <TextQuicksand style={styles.infoText}>{dateData.resData.Postcode} {dateData.resData.stad}</TextQuicksand>
                        </View>
                    </View>

                    {(muriDate) ? <></> : <AlbeitABitLate title={'Reageer'}
                        onPress={() => {
                            setReplyModalEnabled(true);
                        }}
                    />}
                </FlexSection>
            </Body>

            <UpForMeModal
                enabled={replyModalEnabled}
                onPressBackButton={() => {
                    setReplyModalEnabled(false);
                }}
            >
                <View style={{
                    flex: 1,
                }} />

                <View style={{
                    alignItems: 'center',
                    marginBottom: 24,
                }}>


                    <TunaButton style={styles.modalBtn} title={'Afwijzen'} newStatus={1} />
                    <TunaButton style={styles.modalBtn} title={'Accepteer'} newStatus={2} />
                    <TunaButton style={styles.modalBtn} title={'Cancel'} newStatus={3} />
                    <TunaButton style={styles.modalBtn} title={'Ander voorstel'} newStatus={4} />
                    <TunaButton style={styles.modalBtn} title={'Verander tijd en/of datum'} newStatus={5} />
                    <TunaButton style={styles.modalBtn} title={'Reserveren'} newStatus={6} />
                    <UpForMeButton style={styles.modalBtn} title={'Annuleren'} buttonType={ButtonTypes.white} onPress={() => {
                        setReplyModalEnabled(false);
                    }} />

                </View>

            </UpForMeModal>

        </>


    );
}

const Notification = ({ initActive = true, icons = true, message = 'Default', type = 'change', onChange = () => { } }) => {

    const [active, setActive] = useState(initActive);

    let colours;

    switch (type) {
        case 'change':
            colours = [
                up4meColours.gradYellow1,
                up4meColours.gradYellow2,
            ]
            break;
        case 'reserved':
            colours = [
                up4meColours.gradPink,
                up4meColours.gradOrange,
            ]
            break;
        default:
            colours = [
                '#000',
                '#000',
            ]
            break;
    }

    return (
        <LinearGradient colors={colours} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[styles.notification]}>
            <TextQuicksand style={{ ...styles.notificationMessage, maxWidth: (icons) ? 300 : null }}>{message}</TextQuicksand>
            {
                (!icons) ? <></> : <View style={styles.notificationIconsContainer}>
                    <UpForMeIcon style={{ ...styles.notificationIcons, opacity: (active) ? 1 : 0.5 }} touchable={true} onPress={() => {
                        setActive(true);
                        onChange(true);
                    }} icon={iconIndex.photo} />
                    <UpForMeIcon style={{ ...styles.notificationIcons, opacity: (!active) ? 1 : 0.5 }} touchable={true} onPress={() => {
                        setActive(false);
                        onChange(false);
                    }} icon={iconIndex.phone} />
                </View>
            }
        </LinearGradient>
    )
}

const styles = StyleSheet.create({

    dateHeader: {
        fontSize: 24,
        marginLeft: 12,
        marginVertical: 12,
    },

    infoItem: {
        flexDirection: 'row',
        margin: 10,
    },

    infoIcon: {
        width: 20,
        height: 20,
        marginTop: 5,
        marginRight: 12,
    },

    image: {
        width: getDeviceDimensions('window', 'width'),
        height: 300,
    },
    notification: {
        padding: 6,
        // height: 50,
        width: getDeviceDimensions('window', 'width'),
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
    },
    notificationMessage: {
        color: '#fff',
    },
    notificationIconsContainer: {
        flexDirection: "row",
    },
    notificationIcons: {
        marginLeft: 5,
        width: 50,
        height: 50,
    },
    modalBtn: {
        marginVertical: 5,
    }
})

export default DateDetails;
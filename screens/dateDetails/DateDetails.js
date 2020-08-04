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

const DateDetails = ({ route }) => {

    const dateData = route.params;

    const data = DATA_STORE.profileCache[dateData.userid];

    console.log(dateData);

    const [accept, setAccept] = useState(true);

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
            locationData: dateData.resData
        }

        navigationProxy.navigate('EditDate', {
            canEdit: canEditLocation,
        })
    }

    const cannedTuna = (yourStatus, otherStatus, otherName) => {

        let theTuna = {
            message: null,
            buttonTitle: `your status: ${yourStatus}, ${otherName}'s status: ${otherStatus}`,
            callback: () => { },
            icons: false,
            type: 'change'
        };

        switch (true) {
            //You're new to this
            case (yourStatus == -1):
                if (otherStatus == 2) {
                    theTuna = {
                        type: 'change',
                        icons: false,
                        message: `${otherName} proposed a date! Check the details below and decide wether you want to go or not! You can always suggest something else!`,
                        buttonTitle: `Antwoord`,
                        callback: () => {
                            Alert.alert(
                                `Antwoord`,
                                `Wil je op deze date met ${otherName}`,
                                [
                                    {
                                        text: 'Ja!',
                                        onPress: async () => {
                                            await callSetDate(2);
                                        }
                                    },
                                    {
                                        text: 'Nee',
                                        onPress: async () => {
                                            await callSetDate(1);
                                        }
                                    },
                                    {
                                        text: 'Stel iets anders voor',
                                        onPress: () => {
                                            goToEdit();
                                        }
                                    },
                                ],
                                { cancelable: true }
                            )
                        },
                    }
                }
                break;

            case (yourStatus == 1):
                switch (true) {
                    case (otherStatus == 2):
                        theTuna = {
                            type: 'reserved',
                            icons: false,
                            message: `Jij hebt deze date niet geaccepteerd.`,
                            buttonTitle: '',
                        }
                        break;
                }
                break;

            //You proposed
            case (yourStatus == 2 || yourStatus == 6):

                switch (true) {
                    //he's waiting
                    case (otherStatus == -1):
                        theTuna = {
                            type: 'change',
                            icons: false,
                            message: `${otherName} heeft jouw voorstel ontvangen en moet nog reageren.`,
                            buttonTitle: '',
                        }
                        break;
                    //he declined
                    case (otherStatus == 1):
                        theTuna = {
                            type: 'reserved',
                            icons: false,
                            message: `${otherName} heeft jouw date voorstel geweigerd.`,
                            buttonTitle: '',
                        }
                        break;
                    //He accepted
                    case (otherStatus == 20):
                        theTuna = {
                            type: 'change',
                            icons: false,
                            message: `${otherName} heeft de date geaccepteerd. Jij bent nu verantwoordelijk voor de reservering. Type hierbij jullie beide voornamen en UP4ME.`,
                            buttonTitle: 'reserveer nu',
                            callback: async () => {

                                if (yourStatus != 6)
                                    await callSetDate(6, false);

                                await openBrowser(dateData.resData.website).then(() => {
                                    Alert.alert(
                                        `Gereserveerd?`,
                                        `Alles gelukt met het reserven? Zo ja laat het ${otherName} weten door op ja te drukken! Veel plezier met je date!`,
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
                            }
                        }
                        break;
                }

                break;
            //You accepted
            case (yourStatus == 20):

                if (otherStatus == 60) {
                    theTuna = {
                        type: 'reserved',
                        icons: false,
                        message: `${otherName} heeft greserveerd, Veel plezier met je date!`,
                        buttonTitle: 'date wijzigen',
                        callback: () => {
                            goToEdit(false);
                        }
                    }
                }

                break;

            case (yourStatus == 60):
                if (otherStatus == 20) {
                    theTuna = {
                        type: 'reserved',
                        icons: false,
                        message: `Je hebt gereserveerd! Veel plezier met je date!`,
                        buttonTitle: 'date wijzigen',
                        callback: () => {
                            goToEdit(false);
                        }
                    }
                }
                break;
        }

        return theTuna;
    }

    const ultraTuna = cannedTuna(dateData.dateData.status, dateData.dateData.status2, data.naam);

    return (
        <Body>
            <TextQuicksand>{dateData.dateData.status} - {dateData.dateData.status2}</TextQuicksand>
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

                {(ultraTuna.buttonTitle.length == 0) ? <></> : <AlbeitABitLate title={ultraTuna.buttonTitle}

                    onPress={() => {
                        ultraTuna.callback()
                    }}
                />}
            </FlexSection>
        </Body>
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
    }
})

export default DateDetails;
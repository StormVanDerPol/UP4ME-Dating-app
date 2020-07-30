import React, { useState, useEffect } from 'react';
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
import endpoints, { getEndpoint } from '../../res/data/endpoints';
import { networkFeedbackMessages } from '../../components/waitIndicator';

const DateDetails = ({ route }) => {

    const dateData = route.params;

    const data = DATA_STORE.profileCache[dateData.userid];

    console.log(dateData);

    const [accept, setAccept] = useState(true);

    const [netFeedback, setNetFeedback] = useState({
        message: '',
        busy: false,
    })

    const callSetDate = async (status) => {
        setNetFeedback({
            busy: true,
            message: networkFeedbackMessages.wait,
        })

        await dodoFlight({
            method: 'post',
            // url: getEndpoint(endpoints.post.setDate),
            url: `http:/192.168.1.12:8080/api/v1/set/date`,
            data: {
                userid1: DATA_STORE.userID,
                userid2: dateData.userid,
                status: status,
                date: dateData.dateData.datum,
                time: dateData.dateData.tijd,
                resid: dateData.resData.resid,
            },

            thenCallback: () => {

                setNetFeedback({
                    busy: false,
                    message: '',
                })

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

    const cannedTuna = (yourStatus, otherStatus, otherName) => {

        let theTuna = {
            message: 'Honto baka da ne~',
            buttonTitle: 'Honto baka da ne~',
            callback: () => { },
            icons: true,
        };

        switch (yourStatus) {
            //You're new to this
            case -1:

                if (otherStatus == 2) {
                    theTuna = {
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
                                            await callSetDate(20);
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
                                                canEdit: true,
                                            })
                                        }
                                    },
                                ],
                                { cancelable: true }
                            )
                        },
                        icons: false,
                    }
                }

                break;
        }

        return theTuna;
    }

    return (
        <Body>
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

                {(dateData.dateData.notisent == -1) ? <Notification
                    onChange={(output) => {
                        setAccept(output);
                    }}
                    icons={cannedTuna(dateData.dateData.status, dateData.dateData.status2, data.naam).icons}
                    message={cannedTuna(dateData.dateData.status, dateData.dateData.status2, data.naam).message}
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

                <AlbeitABitLate title={cannedTuna(dateData.dateData.status, dateData.dateData.status2, data.naam).buttonTitle}

                    onPress={() => {
                        cannedTuna(dateData.dateData.status, dateData.dateData.status2, data.naam).callback()
                    }}
                />
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
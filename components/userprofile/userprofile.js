import React, { useState, useEffect } from 'react';

import {
    StyleSheet, Image, View, Text,
} from 'react-native';

import Axios from 'axios';

import Nav from '../nav';
import { endpointGetProfile } from '../../endpoints';
import { deviceWidth, up4meColours } from '../../globals';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { rootNavigation } from '../../rootNavigation';

const UserProfile = () => {

    const [userProfileData, setUserProfileData] = useState({});

    const getUserData = () => {
        Axios.get(`${endpointGetProfile}${global.sessionUserId}`)
            .then((res) => {

                setUserProfileData({
                    profilePicture: res.data.foto1,
                });

            })
            .catch((err) => {
                console.warn(`${endpointGetProfile}${global.sessionUserId} NETWORK ERROR`, err);
            })
    }

    const [init, setInit] = useState(false);

    if (!init) {
        getUserData();
        setInit(true);
    }

    const [fakeNotifications, setFakeNotifications] = useState(
        [

        ]);

    function getFakeNotifs() {

        const randUserCount = Math.ceil(Math.random() * 9);

        for (let i = 0; i < randUserCount; i++) {

            let randUser = Math.round(Math.random() * 100);
            let randType = Math.round(Math.random() * 4);

            Axios.get(`${endpointGetProfile}${randUser}`)
                .then((res) => {
                    fakeNotifications.push(
                        {
                            userid: randUser,
                            type: randType,
                            pfp: res.data.foto1,
                            read: false,
                        });
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    setFakeNotifications([...fakeNotifications]);
                })
        }
    }

    useEffect(() => {
        console.log('fake notifs :', fakeNotifications)
    }
        , [fakeNotifications])

    const [fakeNotifInit, setFakeNotifInit] = useState(false)

    if (!fakeNotifInit) {

        getFakeNotifs();
        setFakeNotifInit(true);
    }

    const notifMessage = (n) => {
        switch (n) {
            case 0:
                return 'notif message 0';

            case 1:
                return 'notif message 1';

            case 2:
                return 'notif message 2';

            case 3:
                return 'notif message 3';

            default:
                break;
        }
    }


    return (
        <>
            <Nav currentSection={'Profile'} />
            <View style={[s.pfpcontainer]}>
                <Image source={
                    {
                        uri: userProfileData.profilePicture,
                        width: '100%',
                        height: '100%',
                    }
                } />
            </View>

            <SectRouteBtn route={'somewhere'} btnText={'profiel bewerken'} />
            <SectRouteBtn route={'UserSettings'} btnText={'Instellingen'} />
            <SectRouteBtn route={'somewhere'} btnText={'Nodig vrienden uit'} />

            <View>
                <Text>Recente notificaties</Text>
            </View>

            <ScrollView horizontal={true}>

                {fakeNotifications.map((notif, i) => {
                    return (
                        <NotifItem key={i}
                            notifText={notifMessage(notif.type)}
                            pfp={notif.pfp} />
                    )
                })}

            </ScrollView>
        </>
    );
}

const SectRouteBtn = (p) => {

    return (
        <TouchableWithoutFeedback onPress={() => rootNavigation.navigate(p.route)}>
            <Text>{p.btnText}</Text>
        </TouchableWithoutFeedback>
    )
}

const sectRouteBtnStyles = StyleSheet.create({

});

const NotifItem = (p) => {
    return (
        <>
            <TouchableWithoutFeedback
                style={[NotifItemStyles.notifContainer]}
                onPress={() => rootNavigation.navigate(p.route)}>

                <LinearGradient
                    style={[NotifItemStyles.gradient]}
                    colors={[up4meColours.gradPink, up4meColours.gradOrange]}
                />

                <View style={[NotifItemStyles.pfpContainer]}>
                    <Image source={
                        {
                            uri: p.pfp,
                            width: '100%',
                            height: '100%',
                        }
                    } />
                </View>

                <Text style={[NotifItemStyles.notifText]}>
                    {p.notifText}
                </Text>

            </TouchableWithoutFeedback>
        </>
    )
}

const gradientRadius = 15;
const notifSize = 50;

const NotifItemStyles = StyleSheet.create({

    notifContainer: {
        marginHorizontal: 20,
    },

    pfpContainer: {
        width: notifSize,
        height: notifSize,
    },

    notifText: {
        width: notifSize,
    },

    gradient: {
        borderRadius: 100,
        width: gradientRadius,
        height: gradientRadius,
    },

});

const s = StyleSheet.create({
    pfpcontainer: {
        width: deviceWidth,
        height: 300,
    },
});

export default UserProfile;
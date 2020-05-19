import React, { useState, useEffect } from 'react';

import {
    StyleSheet, Image, View, Text, ImageBackground,
} from 'react-native';

import Axios from 'axios';

import Nav from '../nav';
import { endpointGetProfile } from '../../endpoints';
import { deviceWidth, up4meColours, gs } from '../../globals';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { rootNavigation } from '../../rootNavigation';

import ImageResizer from 'react-native-image-resizer';
import RNSVG_edit from '../../res/ui/rnsvg/rnsvg_edit';

const UserProfile = () => {

    const [userProfileData, setUserProfileData] = useState({});

    const getUserData = () => {
        Axios.get(`${endpointGetProfile}${global.sessionUserId}`)
            .then((res) => {

                setUserProfileData({
                    profilePicture: res.data.foto1,
                });


                getFakeNotifs();

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
                .then(async (res) => {

                    await ImageResizer.createResizedImage(res.data.foto1, 50, 50, 'JPEG', 100)
                        .then((IRres) => {
                            fakeNotifications.push(
                                {
                                    userid: randUser,
                                    type: randType,
                                    pfp: IRres.uri,
                                    read: false,
                                });
                        })
                        .catch((err) => {
                            dconsole.log(err);
                        })
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    setFakeNotifications([...fakeNotifications]);
                })
        }
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
                return 'my boi'
        }
    }


    return (
        <View style={[gs.body]}>
            <Nav currentSection={'Profile'} />
            <View style={[s.pfpcontainer]}>

                <Image source={
                    {
                        uri: userProfileData.profilePicture,
                        width: '100%',
                        height: '100%',
                        // resizeMode="cover",
                    }
                } />

                <TouchableWithoutFeedback style={[gs.iconwrap, s.sss]}>
                    <RNSVG_edit />
                </TouchableWithoutFeedback>

            </View>

            <SectRouteBtn route={'EditProfile'} btnText={'profiel bewerken'} />
            <SectRouteBtn route={'UserSettings'} btnText={'Instellingen'} />
            <SectRouteBtn route={'somewhere'} btnText={'Nodig vrienden uit'} />


            <View style={[s.noteYellow]}>
                <Text style={s.noteText}>Recente notificaties</Text>
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
        </View>
    );
}

const SectRouteBtn = (p) => {

    return (
        <TouchableWithoutFeedback style={sectRouteBtnStyles.btnSelect} onPress={() => rootNavigation.navigate(p.route)}>
            <Text>{p.btnText}</Text>
        </TouchableWithoutFeedback>
    )
}

const sectRouteBtnStyles = StyleSheet.create({

    btnSelect: {
        // backgroundColor: "red",
        padding: 10,
        paddingLeft: 25,

    },

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
        // borderRadius: 100,

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

    noteYellow: {
        // height: 60,
        width: deviceWidth,
        backgroundColor: up4meColours.gradYellow1,
        // paddingVertical: 5,
        paddingLeft: 25,
    },


    noteText: {
        color: 'white',
        lineHeight: 60,
        fontWeight: 'bold',
    },
    pfpcontainer: {
        width: deviceWidth,
        height: 300,
    },
    sss: {
        position: "absolute",
        top: 0,
        left: 0,
        borderWidth: 2,
        margin: 5,
    },
    //man im gonna do this at home RIGHT ITS LIKE HURR DUUR BTW  how do i know what is what icon? can i open? tx
    //love you
    //meeting im like 15 min i cry


});

export default UserProfile;
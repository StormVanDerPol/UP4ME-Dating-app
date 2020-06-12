import React, { useState, useEffect } from 'react';

import {
    StyleSheet, Image, View, Text, ImageBackground,
} from 'react-native';

import Axios from 'axios';

import Nav from '../nav';
import { endpointGetProfile } from '../../endpoints';
import { deviceWidth, up4meColours, gs, calcAgeHet } from '../../globals';
import { ScrollView, TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { rootNavigation } from '../../rootNavigation';

import ImageResizer from 'react-native-image-resizer';
import RNSVG_edit from '../../res/ui/rnsvg/rnsvg_edit';
import { debugMode } from '../../debugmode';
import { userPropStringSelector } from '../matching/MatchScreenUserPropStringSelector';
import RNSVG_arrow_right from '../../res/ui/rnsvg/rnsvg_arrow_right';

const UserProfile = () => {

    const [userProfileData, setUserProfileData] = useState({});

    const [loaded, setLoaded] = useState(false);

    const getUserData = async () => {

        let userData = {};

        if (global.sessionUserData.fetched == false) {

            Axios.get(
                `${endpointGetProfile}${global.sessionUserId}`
            )
                .then((res) => {

                    let fetchedData = {};

                    let fetchedImages = [
                        res.data.foto1,
                        res.data.foto2,
                        res.data.foto3,
                        res.data.foto4,
                        res.data.foto5,
                        res.data.foto6,
                    ];

                    let fetchedUserProps = {
                        sport: res.data.sporten,
                        party: res.data.feesten,
                        smoking: res.data.roken,
                        alcohol: res.data.alcohol,
                        politics: res.data.stemmen,
                        work: res.data.uur40,
                        kids: res.data.kids,
                        kidWish: res.data.kidwens
                    };

                    fetchedData = {
                        profilePictures: fetchedImages,
                        name: res.data.naam,
                        placeName: res.data.zoektin,
                        height: res.data.lengte / 100,
                        job: res.data.beroep,
                        desc: res.data.profieltext,
                        age: calcAgeHet(res.data.geboortedatum),
                        dist: Math.round(
                            Math.random() * 100
                        ),
                        userProperties: fetchedUserProps,
                        userPropertiesDesc: userPropStringSelector(fetchedUserProps),
                    }

                    userData = { ...fetchedData };

                    getFakeNotifs();
                })
                .catch((err) => {
                    if (debugMode.networkRequests) {
                        console.log('Network Error', err)
                    }
                })
                .finally(() => {

                    global.sessionUserData = {
                        ...global.sessionUserData,
                        ...userData,
                        fetched: true,
                    }

                    setUserProfileData({
                        profilePicture: userData.profilePictures[0],
                    });

                    setLoaded(true);
                })
        }
        else {

            setUserProfileData({
                profilePicture: global.sessionUserData.profilePictures[0],
            })

            getFakeNotifs();

            setLoaded(true);
        }
    }

    const [init, setInit] = useState(false);

    if (!init) {
        getUserData();
        setInit(true);
    }

    const [fakeNotifications, setFakeNotifications] = useState(
        [

        ]);

    async function getFakeNotifs() {

        const randUserCount = Math.ceil(Math.random() * 9);

        for (let i = 0; i < randUserCount; i++) {

            let randUser = Math.round(Math.random() * 100);
            let randType = Math.round(Math.random() * 4);

            if (debugMode.perfomance)
                console.log('Resize image start...', performance.now());

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
                            console.log(err);
                        })
                        .finally(() => {
                            if (debugMode.perfomance)
                                console.log('Resize image end...', performance.now());
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

                <View style={[gs.iconwrap, s.sss]}>
                    <TouchableOpacity onPress={() => { rootNavigation.navigate('EditProfile') }}>
                        <RNSVG_edit />
                    </TouchableOpacity>
                </View>

            </View>

            <SectRouteBtn route={'EditProfile'} btnText={'profiel bewerken'} />
            <SectRouteBtn route={'UserSettings'} btnText={'Instellingen'} />
            {/* <View style={s.picwrap}> */}
            <SectRouteBtn route={'somewhere'} btnText={'Nodig vrienden uit'} />
            {/* <View style={{ width: 50, height: 50, }}><RNSVG_edit /></View> */}
            {/* </View> */}


            <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={[s.noteYellow]} colors={[up4meColours.gradYellow1, up4meColours.gradYellow2]} >
                <Text style={s.noteText}>Recente notificaties</Text>
            </LinearGradient>




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

        <TouchableWithoutFeedback style={[sectRouteBtnStyles.btnSelect]} onPress={() => rootNavigation.navigate(p.route)}>
            <Text style={sectRouteBtnStyles.btnText}>{p.btnText}</Text>
            <View style={{ width: 25, height: 25, }}>
                <RNSVG_arrow_right></RNSVG_arrow_right>
            </View>
        </TouchableWithoutFeedback>

    )


}

const sectRouteBtnStyles = StyleSheet.create({

    btnSelect: {
        // backgroundColor: "red",
        flexDirection: 'row',
        padding: 15,
        paddingLeft: 25,
        borderBottomColor: up4meColours.lineGray,
        borderBottomWidth: 2,
        alignContent: 'space-around',
        justifyContent: 'space-between',
    },
    btnText: {
        fontSize: 15,

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
        width: deviceWidth,
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
        bottom: 10,
        right: 10,
        margin: 5,
    },
    //man im gonna do this at home RIGHT ITS LIKE HURR DUUR BTW  how do i know what is what icon? can i open? tx
    //love you
    //meeting im like 15 min i cry

    picwrap: {
        backgroundColor: "red",
    },


});

export default UserProfile;
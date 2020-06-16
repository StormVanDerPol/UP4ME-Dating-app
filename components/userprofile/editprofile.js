import React, { useState, useRef, useEffect } from 'react';

import {
    StyleSheet, Text, View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { up4meColours, gs, calcAgeHet } from '../../globals';
import ProfileTextField from '../registration/profileTextField';
import ProfilePictureUpload from '../registration/profilePictureUpload';
import Axios from 'axios';
import { endpointGetProfile, endpointSetProfileText, endpointSetPhotos, endpointSetProperties } from '../../endpoints';
import BigButton from '../bigbutton';
import UserPropsSelections from '../registration/userpropsSelections';
import { debugMode } from '../../debugmode';
import BlepButton from '../blepButton';
import { userPropStringSelector } from '../matching/MatchScreenUserPropStringSelector';
import Nav from '../nav';
import { rootNavigation } from '../../rootNavigation';

const EditProfile = () => {

    const _userData = useRef({});

    const _oldData = useRef({});

    const [hasFetched, setHasFetched] = useState(false);
    const _init = useRef(false);

    if (!_init.current) {

        console.log(`${endpointGetProfile}${global.sessionUserId}`)

        if (global.sessionUserData.fetched == false) {

            Axios.get(`${endpointGetProfile}${global.sessionUserId}`)
                .then((res) => {

                    if (debugMode.networkRequests)
                        console.log(`%cGET REQUEST FROM: ${endpointGetProfile}${global.sessionUserId}`, 'font-size: 1rem; color: red', res.data);

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

                    console.log(userPropStringSelector(fetchedUserProps));

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

                    _userData.current = { ...fetchedData };

                    _oldData.current = { profilePictures: fetchedData.profilePictures };
                    if (debugMode.general) {
                        console.log('WHY ARE YOU GAAAAAAAY', _userData.current);
                        console.log('Olddata', _oldData.current);
                    }

                }, (res) => { console.log('why bro', res) })
                .catch((err) => {
                    console.log('I want to die', err)
                })
                .finally(() => {
                    global.sessionUserData = {
                        ...global.sessionUserData,
                        ..._userData.current,
                        fetched: true,
                    }

                    setHasFetched(true);
                })

        }
        else {
            _userData.current = {
                profilePictures: global.sessionUserData.profilePictures,
                profileText: global.sessionUserData.profileText,
                userProperties: global.sessionUserData.userProperties,
            }

            _oldData.current = {
                profilePictures: global.sessionUserData.profilePictures,
            }

            setHasFetched(true)
        }

        _init.current = true;
    }



    const [toRender, setToRender] = useState(<Text> still loading </Text>);


    useEffect(() => {

        if (hasFetched) {

            setToRender(
                <>

                    <View style={s.thing}>
                        <Text style={s.textb}>Profiel tekst</Text>
                        <ProfileTextField initProfText={_userData.current.profileText} getProfText={getProfText} />
                    </View>

                    <View style={[s.thing, s.things]}>
                        <Text style={s.textb}>Profiel foto's</Text>
                        <ProfilePictureUpload initPics={_userData.current.profilePictures} getPictures={getPictures} checkValid={checkValid} />
                        <Text style={[gs.underline, s.textu]} onPress={() => rootNavigation.navigate('PhotoGuidelines')}>Lees hier de richtlijnen</Text>
                    </View>


                    <View style={s.eigen}>
                        <View style={{ marginHorizontal: 15, }}>
                            <Text style={s.textb}>Eigenschappen</Text>

                            <Text style={[s.summary]}>Hoe meer informatie je invult, hoe groter de kans op een match. Je potentiele matchen kunnen hier op filteren.</Text>
                        </View>
                    </View>

                    <UserPropsSelections initSelections={_userData.current.userProperties} getSelections={getSelections} />

                </>
            );
        }
    }, [hasFetched]);

    const getProfText = (data) => {
        _userData.current.profileText = data;
    }

    const _isValid = useRef(false);

    const getPictures = (data) => {
        _userData.current.profilePictures = data.pfpArray;

        compareValid(data.isValid)
    }

    const checkValid = (data) => {
        compareValid(data);
    }

    const compareValid = (isValid) => {
        let wasValid = _isValid.current;

        console.log('isValid', isValid);


        if (wasValid != _isValid.current) {
            _isValid.current = isValid;

            console.log('changeed isValid value to: ', _isValid.current);
        }
    }


    const getSelections = (data) => {
        _userData.current.userProperties = data;
    }

    function postData() {
        if (debugMode.general)
            console.log('brooooooo', _oldData.current.profilePictures);

        console.log('fuck u', _userData.current.profieltext);


        Axios.post(`${endpointSetProfileText}`,
            {
                profiletext: _userData.current.profileText,
                userid: global.sessionUserId,
            })
            .catch((err) => {
                console.log('Network Error', err);
            });


        let mustUpdatePhotos = false;

        _oldData.current.profilePictures.map((oldpic, i) => {

            if (oldpic != _userData.current.profilePictures[i]) {
                mustUpdatePhotos = true;
                return;
            }
        })

        if (mustUpdatePhotos) {

            let profilePicturesPost = {
                userid: global.sessionUserId,
                photo1: _userData.current.profilePictures[0],
                photo2: _userData.current.profilePictures[1],
                photo3: _userData.current.profilePictures[2],
                photo4: _userData.current.profilePictures[3],
                photo5: _userData.current.profilePictures[4],
                photo6: _userData.current.profilePictures[5],
            }

            Axios.post(`${endpointSetPhotos}`, profilePicturesPost)
                .catch((err) => {
                    console.log('Network Error', err);
                });
        }

        console.log({
            userid: global.sessionUserId,
            sport: _userData.current.userProperties.sport,
            feesten: _userData.current.userProperties.party,
            roken: _userData.current.userProperties.smoking,
            alcohol: _userData.current.userProperties.alcohol,
            stemmen: _userData.current.userProperties.politics,
            werken: _userData.current.userProperties.work,
            kinderen: _userData.current.userProperties.kids,
            kinderwens: _userData.current.userProperties.kidWish,
            eten: _userData.current.userProperties.food
        })

        Axios.post(`${endpointSetProperties}`, {
            userid: global.sessionUserId,
            sport: _userData.current.userProperties.sport,
            feesten: _userData.current.userProperties.party,
            roken: _userData.current.userProperties.smoking,
            alcohol: _userData.current.userProperties.alcohol,
            stemmen: _userData.current.userProperties.politics,
            werken: _userData.current.userProperties.work,
            kinderen: _userData.current.userProperties.kids,
            kinderwens: _userData.current.userProperties.kidWish,
            eten: _userData.current.userProperties.food
        })
            .then((res) => {
                console.log('kanker man', res);
            })
    }

    return (

        <>
            <Nav currentSection={'Profile'} />

            <ScrollView style={gs.body}>

                <View style={{ borderBottomWidth: 1, borderBottomColor: up4meColours.lineGray, paddingBottom: 10, }}>
                    <BlepButton active={0} title={['Bewerken', 'Voorbeeld']} route={[undefined, 'ExampleProfile']} />
                </View>

                {toRender}

                <BigButton component="UserProfile" text="opslaan" disabled={_isValid.current}
                    callBack={postData}
                />

            </ScrollView >

        </>
    );
}

const s = StyleSheet.create({

    summary: {
        color: up4meColours.textGray,
        // marginHorizontal: 15,
    },
    textb: {
        paddingBottom: 10,
        fontSize: 20,
    },
    thing: {
        marginVertical: 15,
        marginHorizontal: 15,
        // borderBottomColor: up4meColours.lineGray,
        // borderBottomWidth: 1,
    },
    things: {

    },
    textu: {
        textAlign: 'center',
    },
    eigen: {
        borderTopColor: up4meColours.lineGray,
        borderTopWidth: 1,
        paddingTop: 30,
        marginVertical: 15,
    },

});

export default EditProfile;
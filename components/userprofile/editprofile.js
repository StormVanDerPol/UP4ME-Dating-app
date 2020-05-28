import React, { useState, useRef, useEffect } from 'react';

import {
    StyleSheet, Text,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { up4meColours, gs, calcAgeHet } from '../../globals';
import ProfileTextField from '../registration/profileTextField';
import ProfilePictureUpload from '../registration/profilePictureUpload';
import Axios from 'axios';
import { endpointGetProfile, endpointSetProfileText, endpointSetPhotos } from '../../endpoints';
import BigButton from '../bigbutton';
import UserPropsSelections from '../registration/userpropsSelections';
import { debugMode } from '../../debugmode';
import BlepButton from '../blepButton';
import { userPropStringSelector } from '../matching/MatchScreenUserPropStringSelector';

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

                    console.log('WHY ARE YOU GAAAAAAAY', _userData.current);
                    console.log('Olddata', _oldData.current);

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
                    <Text>Profiel tekst</Text>
                    <ProfileTextField initProfText={_userData.current.profileText} getProfText={getProfText} />

                    <Text>Profiel foto's</Text>
                    <ProfilePictureUpload initPics={_userData.current.profilePictures} getPictures={getPictures} checkValid={checkValid} />

                    <Text>Eigenschappen</Text>
                    <Text style={[s.summary]}>Hoe meer informatie je invult, hoe groter de kans op een match. Je potentiele matchen kunnen hier op filteren.</Text>
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

        console.log('brooooooo', _oldData.current.profilePictures);

        Axios.post(`${endpointSetProfileText}`,
            {
                profiletext: _userData.current.profieltext,
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
    }

    return (
        <ScrollView style={gs.body}>

            <BlepButton active={0} title={['Bewerken', 'Voorbeeld']} route={[undefined, 'ExampleProfile']} />

            {toRender}

            <BigButton component="UserProfile" text="opslaan" disabled={_isValid.current}
                callBack={postData}
            />

        </ScrollView >
    );
}

const s = StyleSheet.create({

    summary: {
        color: up4meColours.textGray,
    },

});

export default EditProfile;
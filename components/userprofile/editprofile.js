import React, { useState, useRef, useEffect } from 'react';

import {
    StyleSheet, View, Text, Alert,
} from 'react-native';
import { TouchableWithoutFeedback, ScrollView } from 'react-native-gesture-handler';
import { up4meColours, deviceWidth, mx, gs } from '../../globals';
import LinearGradient from 'react-native-linear-gradient';
import ProfileTextField from '../registration/profileTextField';
import ProfilePictureUpload from '../registration/profilePictureUpload';
import Axios from 'axios';
import { endpointGetProfile, endpointSetProfile, endpointSetProfileText, endpointSetPhotos } from '../../endpoints';
import BigButton from '../bigbutton';

const EditProfile = () => {

    const _userData = useRef({});

    const _oldData = useRef({});

    const [hasFetched, setHasFetched] = useState(false);
    const _init = useRef(false);

    if (!_init.current) {

        console.log(`${endpointGetProfile}${global.sessionUserId}`);

        Axios.get(`${endpointGetProfile}${global.sessionUserId}`)
            .then((res) => {

                console.log('%cPenis', 'font-size: 2rem; color: red', res.data);

                _userData.current = {
                    profileText: res.data.profieltext,
                    profilePictures: [
                        res.data.foto1,
                        res.data.foto2,
                        res.data.foto3,
                        res.data.foto4,
                        res.data.foto5,
                        res.data.foto6,
                    ],
                };

                _oldData.current = {
                    profilePictures: [
                        res.data.foto1,
                        res.data.foto2,
                        res.data.foto3,
                        res.data.foto4,
                        res.data.foto5,
                        res.data.foto6,
                    ],
                }

            })
            .catch((err) => {

            })
            .finally(() => {
                setHasFetched(true);
            })

        _init.current = true;
    }

    const [toRender, setToRender] = useState(<Text> still loading </Text>);


    useEffect(() => {

        if (hasFetched) {

            setToRender(
                <>
                    <EditProfileButton />

                    <Text>Profiel tekst</Text>
                    <ProfileTextField initProfText={_userData.current.profileText} getProfText={getProfText} />

                    <Text>Profiel foto's</Text>
                    <ProfilePictureUpload initPics={_userData.current.profilePictures} getPictures={getPictures} checkValid={checkValid} />
                </>
            );
        }
    }, [hasFetched]);

    const getProfText = (data) => {

        _userData.current = {
            ..._userData.current,
            profieltext: data,
        }
    }

    const getPictures = (data) => {
        _userData.current.profilePictures = data.pfpArray;
        // setIsValid(data.isValid);
    }

    const checkValid = (data) => {
        console.log('isvalid', data)
        // setIsValid(data)
    }

    function postData() {
        Axios.post(`${endpointSetProfileText}`,
            {
                profiletext: _userData.current.profieltext,
                userid: global.sessionUserId,
            })
            .catch((err) => {
                console.log(err);
            });


        let mustUpdatePhotos = false;

        _oldData.current.profilePictures.map((oldpic, i) => {

            if (oldpic != _userData.current.profilePictures[i]) {
                mustUpdatePhotos = true;
                return;
            }
        })

        console.log('must update', mustUpdatePhotos)


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
                    console.log(err);
                });
        }
        else {
            console.log('no update needed');
        }
    }


    return (
        <ScrollView style={gs.body}>

            {toRender}

            <BigButton component="UserProfile" text="opslaan" disabled={false}
                callBack={postData}
            />

        </ScrollView >
    );
}

const s = StyleSheet.create({

});

const EditProfileButton = (p) => {
    return (
        <View style={editButtonStyles.editButtonContainer}>
            <TouchableWithoutFeedback
                onPress={() => {

                }}
            >

                <LinearGradient colors={[up4meColours.gradPink, up4meColours.gradOrange]} style={[editButtonStyles.editButton]} >
                    <Text style={[editButtonStyles.editButtonText, editButtonStyles.editButtonText_active]}>
                        Bewerken
                    </Text>
                </LinearGradient>

            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
                onPress={() => {

                }}
            >

                <View style={[editButtonStyles.editButton]}>
                    <Text style={[editButtonStyles.editButtonText, editButtonStyles.editButtonText_inactive]}>
                        Voorbeeld
                    </Text>
                </View>

            </TouchableWithoutFeedback>

        </View>
    )
}

const editButtonStyles = StyleSheet.create({

    editButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: up4meColours.picGray,
        borderRadius: 50,
    },

    editButton: {
        borderRadius: 50,
        paddingVertical: 20,
        width: ((deviceWidth - (mx * 2)) / 2),
        alignItems: "center",
    },

    editButtonText: {

    },

    editButtonText_active: {
        color: "white"
    },

    editButtonText_inactive: {
        color: "black"
    }
});

export default EditProfile;
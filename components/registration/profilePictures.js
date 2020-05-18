import React, { useState, useRef, useEffect } from 'react';

import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';

import { gs } from '../../globals';

import Logo from '../logo';
import BigButton from '../bigbutton';
import Axios from 'axios';
import { endpointSetPhotos, endpointGetProfile } from '../../endpoints';

import ProfilePictureUpload from './profilePictureUpload';

const ProfilePictures = ({ navigation }) => {

    const _pfpArray = useRef(new Array(6));
    const [isValid, setIsValid] = useState(false);

    const _init = useRef(false);

    const [imgFetched, setImgFetched] = useState(false);

    if (!_init.current) {
        Axios.get(`${endpointGetProfile}${sessionUserId}`)
            .then((res) => {

                let imagesToCheck = [
                    res.data.foto1,
                    res.data.foto2,
                    res.data.foto3,
                    res.data.foto4,
                    res.data.foto5,
                    res.data.foto6,
                ];

                imagesToCheck.map((image, id) => {
                    if (image) {
                        _pfpArray.current[id] = image;
                    }
                })
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setImgFetched(true);
            })

        _init.current = true;
    }

    const getPictures = (data) => {
        _pfpArray.current = data.pfpArray;
        setIsValid(data.isValid);
    }

    const checkValid = (data) => {
        console.log('isvalid', data)
        setIsValid(data)
    }

    const postData = () => {

        let toSend = {
            userid: global.sessionUserId,
            photo1: _pfpArray.current[0],
            photo2: _pfpArray.current[1],
            photo3: _pfpArray.current[2],
            photo4: _pfpArray.current[3],
            photo5: _pfpArray.current[4],
            photo6: _pfpArray.current[5]
        }

        console.log('POST to send', toSend);

        Axios.post(endpointSetPhotos, toSend)
            .then((res) => {
                console.log('POST response', res);
            })
            .catch((err) => {
                console.log('Error', err);
            });

        global.registData.profilePictures = _pfpArray.current;
        console.log('saved data: ', global.registData);
    }

    const _pfpUploadComponent = useRef(<></>);

    useEffect(() => {

        _pfpUploadComponent.current = <ProfilePictureUpload getPictures={getPictures} checkValid={checkValid} initPics={_pfpArray.current} />;

    }, [imgFetched])

    return (
        <View style={gs.body}>
            <ScrollView style={gs.screenWrapperScroll}>


                <Logo />
                <Text style={[gs.mainHeader]}>Foto's toevoegen</Text>

                {_pfpUploadComponent.current}
                {/* <ProfilePictureUpload getPictures={getPictures} initPics={pfpArray.current} /> */}

                <View style={[gs.bottom]}>
                    <BigButton component="ProfileText" text="doorgaan" disabled={!isValid}
                        callBack={postData}
                    />

                    <Text style={[gs.underline, s.guidelines]} onPress={() => navigation.navigate('PhotoGuidelines')}>Lees de richtlijnen</Text>
                </View>

            </ScrollView>
        </View>
    );
}

const s = StyleSheet.create({

    guidelines: {
        marginTop: 5,
        textAlign: "center",
    },

    iconContainer: {
        width: 50,
        height: 50,
    }
});

export default ProfilePictures;
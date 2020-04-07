import React, { useState } from 'react';
import ImagePicker from 'react-native-image-picker';

import {
    StyleSheet,
    Image,
} from 'react-native';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const ProfilePicItem = () => {

    const [src, setSrc] = useState('');

    const handleChoosePhoto = () => {
        const opt = {};

        ImagePicker.launchImageLibrary(opt, (res) => {
            console.log(res.uri);
            setSrc(res.uri);
        })
    }

    return (
        <>
            <TouchableWithoutFeedback
                style={[s.button]}
                onPress={() => handleChoosePhoto()}>
                <Image
                    style={[s.profilepic]}
                    source={{ uri: src }} />
            </TouchableWithoutFeedback>
        </>
    );
}

const picHeight = 250;

const s = StyleSheet.create({
    button: {
        height: '33%',
        width: '50%',
        backgroundColor: 'gray',
        borderWidth: 1,
        borderColor: "red",
    },
    profilepic: {

        height: 50,
    }
});

export default ProfilePicItem;
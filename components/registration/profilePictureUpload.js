import React, { useState, useRef, useEffect } from "react";

import { StyleSheet, View, Image, ImagePickerIOS } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

// import ImagePicker from 'react-native-image-picker';

import * as ImagePicker from 'expo-image-picker';
// import Constants from 'expo-constants';
// import * as permissions from 'expo-permissions';

import { deviceWidth, mx, up4meColours } from "../../globals";

const ProfilePictureUpload = (p) => {

    const [pfpArray, setPfpArray] = useState(p.initPics);

    const sendPictures = () => {
        p.getPictures({
            pfpArray: pfpArray,
            isValid: validatePictures()
        })
    }

    useEffect(() => {
        sendPictures(pfpArray);
    }, [pfpArray])

    const handleChoosePhoto = async (id) => {
        // const opt = {

        // };

        // ImagePicker.launchImageLibrary(opt, (res) => {
        //     console.log('Image URI on device', res.uri);

        //     pfpArray[id] = `data:${res.type};base64,${res.data}`;
        //     setPfpArray([...pfpArray]);

        //     console.log('ImagePicker response', res);
        // })

        try {

            let res = await ImagePicker.launchImageLibraryAsync(
                {
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 0.5,
                    base64: true,
                }
            );

            if (!res.cancelled) {
                console.log('res expo image picker', res);

                let fileExtension = res.uri.substr(res.uri.lastIndexOf('.') + 1);

                if (fileExtension == 'jpg') {
                    fileExtension = 'jpeg';
                }

                console.log(fileExtension);
                pfpArray[id] = `data:${res.type}/${fileExtension};base64,${res.base64}`;
                setPfpArray([...pfpArray]);
            }

        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        console.log(pfpArray);
    }, [pfpArray])


    const validatePictures = () => {

        for (let i = 0; i < pfpArray.length; i++) {
            if (pfpArray[i] != undefined && pfpArray[i] != "data:undefined;base64,undefined") {

                return true;
            }
        }

        return false;
    }

    const _init = useRef(false);

    if (!_init.current) {
        p.checkValid(validatePictures());
        _init.current = true;
    }

    return (
        <View style={[s.pfpContainer]}>
            <View>
                {
                    [...Array(3)].map((val, id) => <TouchableWithoutFeedback
                        key={id}
                        style={[s.pfpItem]}
                        onPress={() => handleChoosePhoto(id)}>
                        <Image
                            style={[s.pfpImage]}
                            source={{ uri: pfpArray[id] }} />
                    </TouchableWithoutFeedback>)
                }
            </View>

            <View >
                {
                    [...Array(3)].map((val, id) => <TouchableWithoutFeedback
                        key={id + 3}
                        style={[s.pfpItem]}
                        onPress={() => handleChoosePhoto(id + 3)}>
                        <Image
                            style={[s.pfpImage]}
                            source={{ uri: pfpArray[id + 3] }} />
                    </TouchableWithoutFeedback>)
                }
            </View>
        </View>
    );
}

const boxMarginX = 10;
const boxMarginY = 10;
const cols = 2;

const s = StyleSheet.create({
    pfpContainer: {

        flexDirection: "row",
        marginBottom: 24,

    },
    pfpItem: {

        width: ((deviceWidth - (mx * 2)) / cols) - (boxMarginX * 2),
        height: 270,
        marginHorizontal: boxMarginX,
        marginVertical: boxMarginY,
        backgroundColor: up4meColours.picGray,
        borderRadius: 15,
        overflow: 'hidden',

    },
    pfpImage: {
        width: '100%',
        height: '100%',
    },
});

export default ProfilePictureUpload;
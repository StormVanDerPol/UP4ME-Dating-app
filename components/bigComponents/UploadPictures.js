import React, { useState, useRef, useEffect, createRef } from 'react';
import TextQuicksand from '../TextQuicksand';
import { StyleSheet, View, Alert, Image } from 'react-native';
import { TouchableOpacity, TapGestureHandler, State, LongPressGestureHandler, FlingGestureHandler, Directions, TextInput } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';

import * as ExpoImagePicker from 'expo-image-picker';
import UpForMeIcon, { iconIndex } from '../UpForMeIcon';
import { openBrowser } from '../../functions/bowser';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { limitLines } from './TextInputField';
import { checkLewdFromBase64 } from '../../functions/RemovePr0nz';
import { DATA_STORE } from '../../stored/dataStore';


export const createProfilePicture = async (image) => {

    let res = await manipulateAsync(
        image,
        [{
            resize: { width: 200, height: 200 },
        }],
        {
            base64: true,
            format: SaveFormat.JPEG,
        }
    )
    return `data:image/jpeg;base64,${res.base64}`;
}


const UploadPictures = ({ initImages = [], initDescs = [], onChange = (images) => { }, onChangeText = (descriptions) => { } }) => {

    const [images, setImages] = useState((initImages.length == 0) ? new Array(6) : initImages);

    const [descs, setDescs] = useState((initDescs.length == 0) ? new Array(6) : initDescs);

    const profilePicture = useRef(null)

    const _init = useRef(false);

    if (!_init.current) {

        if (initImages.length == 0) {
            images.fill('');
        }

        setImages([...images]);

        _init.current = true;
    }


    const processImage = async (id, imagePickerResponse) => {

        let index = id;

        //Remove original image
        images[index] = '';
        setImages([...images])

        //Get file extension
        let fileExtension = imagePickerResponse.uri.substr(imagePickerResponse.uri.lastIndexOf('.') + 1);

        //Case its jpg replace with jpeg because reasons
        if (fileExtension == 'jpg') {
            fileExtension = 'jpeg';
        }

        //if profile picture slot is empty, handle that slot instead.
        if (images[0] == '')
            index = 0;

        //Concat base64 string into something useable.
        const base64image = `data:${imagePickerResponse.type}/${fileExtension};base64,${imagePickerResponse.base64}`;

        //Get lewd predictions
        const lewdPredictions = await checkLewdFromBase64(imagePickerResponse.base64, DATA_STORE.lewdmodel);

        //Handle predictions
        let isLewd = false;

        const lewdThreshold = 0.5; //%

        for (let prediction of lewdPredictions) {

            const cn = prediction.className;

            if (cn == 'Porn' || cn == 'Hentai' || cn == 'Sexy' || cn == 'Drawing') {
                if (prediction.probability > lewdThreshold) {
                    isLewd = true;
                    break;
                }
            }
        }

        if (isLewd) {
            //if picture happens to be lewd
            alert('Smells kind of fishy')
        } else {
            //if it ain't
            images[index] = base64image;
            profilePicture.current = await createProfilePicture(images[index]);
        }
        setImages([...images])
    }

    const handleChoosePhoto = async (id) => {

        try {
            let imagePickerResponse = await ExpoImagePicker.launchImageLibraryAsync(
                {
                    mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 0.5,
                    base64: true,
                }
            );

            if (!imagePickerResponse.cancelled) {

                //handle everything other than jpgs

                processImage(id, imagePickerResponse);
            }

        }
        catch (err) {
            console.log(err);
        }
    }

    const deletePhoto = async (id) => {
        images[id] = '';
        descs[id] = '';

        if (id == 0) {
            for (let a in images) {
                if (images[a] != '') {
                    [images[a], images[0]] = [images[0], images[a]];

                    [descs[a], descs[0]] = [descs[0], descs[a]];

                    profilePicture.current = await createProfilePicture(images[0])
                    break;
                }
            }
        }
        setImages([...images]);
        setDescs([...descs]);
    }

    const swapProfPic = async (id) => {
        [images[id], images[0]] = [images[0], images[id]];

        [descs[id], descs[0]] = [descs[0], descs[id]];


        profilePicture.current = await createProfilePicture(images[0]);
        setImages([...images]);
        setDescs([...descs]);
    }

    useEffect(() => {
        onChange({ images: images, profilePicture: profilePicture.current });
    }, [images]);

    useEffect(() => {
        onChangeText(descs)
    }, [descs]);

    const _longTapRef = createRef();

    return (
        <>
            <View style={styles.container}>

                {images.map((image, i) => {

                    return (
                        <TapGestureHandler
                            key={i}
                            onHandlerStateChange={(e) => {
                                if (e.nativeEvent.state == State.END) {

                                    if (image === '') {
                                        handleChoosePhoto(i);
                                    }
                                    else {
                                        Alert.alert(
                                            `What to do with image #${i + 1}?`,
                                            '',
                                            [
                                                {
                                                    text: 'Choose a different image', onPress: () => {
                                                        handleChoosePhoto(i);
                                                    }
                                                },
                                                {
                                                    text: 'Set as profile picture', onPress: () => {
                                                        swapProfPic(i);
                                                    }
                                                },
                                                {
                                                    text: 'Delete', onPress: () => {
                                                        deletePhoto(i);
                                                    }
                                                },
                                            ],
                                            { cancelable: true }
                                        );
                                    }
                                }
                            }}

                            waitFor={_longTapRef}
                        >
                            <LongPressGestureHandler
                                ref={_longTapRef}
                                onHandlerStateChange={(e) => {
                                    if (e.nativeEvent.state == State.ACTIVE) {
                                        deletePhoto(i);
                                    }
                                }}
                                minDurationMs={300}
                            >
                                <View style={styles.item}>

                                    <FastImage
                                        style={{
                                            width: '100%',
                                            height: 200,
                                            borderRadius: 25,
                                            backgroundColor: '#e0e0e0',
                                        }}
                                        source={{
                                            uri: image,
                                        }}
                                    />

                                    {(images[i] == '') ? <UpForMeIcon style={styles.icon} icon={iconIndex.paperplane} /> : <UpForMeIcon style={styles.icon} icon={iconIndex.edit} />}
                                    {(i == 0 && images[0] != '') ? <UpForMeIcon style={styles.favicon} icon={iconIndex.restaurant_star} /> : <></>}

                                    {/* {(images[i] != '') ? <TextInput
                                        placeholder={'Beschrijving'}
                                        defaultValue={descs[i]}
                                        onChangeText={(input) => {

                                            input = limitLines(2, input);

                                            descs[i] = input;
                                            setDescs([...descs]);
                                        }}
                                        multiline={true}
                                        style={{
                                            borderRadius: 12,
                                            borderColor: '#e0e0e0',
                                            borderWidth: 1,
                                            paddingHorizontal: 8,
                                            paddingVertical: 0,
                                            marginTop: 5,
                                        }}
                                    /> : <></>} */}

                                </View>

                            </LongPressGestureHandler>
                        </TapGestureHandler>
                    )

                })}

            </View>
            <TextQuicksand style={styles.guidelines} onPress={() => { openBrowser('https://www.uptodates.nl/richtlijnen-veiligheid') }}>Lees de richtlijnen</TextQuicksand>
        </>
    );
}

const styles = StyleSheet.create({

    guidelines: {
        textDecorationLine: "underline",
        alignSelf: "center",
    },

    favicon: {
        position: "absolute",
        top: 4,
        left: 4,
        width: 33,
        height: 33,
    },

    icon: {
        position: "absolute",
        top: 146,
        right: 4,
        width: 50,
        height: 50,
    },

    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: "space-between",
    },
    item: {
        width: '45%',
        // height: 200,

        marginVertical: 15,
        // overflow: "hidden",
    }
})

export default UploadPictures;
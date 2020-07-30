import React, { useState, useRef, useEffect, createRef } from 'react';
import TextQuicksand from '../TextQuicksand';
import { StyleSheet, View, Alert } from 'react-native';
import { TouchableOpacity, TapGestureHandler, State, LongPressGestureHandler, FlingGestureHandler, Directions } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';

import * as ImagePicker from 'expo-image-picker';
import UpForMeIcon, { iconIndex } from '../UpForMeIcon';
import { openBrowser } from '../../functions/bowser';
import ImageResizer from 'react-native-image-resizer';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';


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

const UploadPictures = ({ initImages = [], onChange = (images) => { } }) => {

    const [images, setImages] = useState((initImages.length == 0) ? new Array(6) : initImages);

    const profilePicture = useRef()

    const _init = useRef(false);

    if (!_init.current) {

        if (initImages.length == 0) {
            images.fill('');
        }
        // else {
        //     initImages.map((img, i) => {
        //         if (!img) {
        //             images[i] = '';
        //         }
        //     })
        // }

        setImages([...images]);

        _init.current = true;
    }

    const handleChoosePhoto = async (id) => {

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

                let fileExtension = res.uri.substr(res.uri.lastIndexOf('.') + 1);

                if (fileExtension == 'jpg') {
                    fileExtension = 'jpeg';
                }

                let index = id;

                if (images[0] == '')
                    index = 0;

                images[index] = `data:${res.type}/${fileExtension};base64,${res.base64}`;


                profilePicture.current = await createProfilePicture(images[index])

                setImages([...images])
            }

        }
        catch (err) {
            console.log(err);
        }
    }

    const deletePhoto = async (id) => {
        images[id] = '';

        if (id == 0) {
            for (let a in images) {
                if (images[a] != '') {
                    [images[a], images[0]] = [images[0], images[a]];
                    profilePicture.current = await createProfilePicture(images[0])
                    break;
                }
            }
        }
        setImages([...images])
    }

    const swapProfPic = async (id) => {
        [images[id], images[0]] = [images[0], images[id]];
        profilePicture.current = await createProfilePicture(images[0]);
        setImages([...images]);
    }

    useEffect(() => {
        onChange({ images: images, profilePicture: profilePicture.current });
    }, [images])


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
                                <View key={i} style={styles.item}>

                                    <FastImage
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            // borderWidth: 2
                                        }}
                                        source={{
                                            uri: image,
                                        }}
                                    />

                                    {(images[i] == '') ? <UpForMeIcon style={styles.icon} icon={iconIndex.paperplane} /> : <UpForMeIcon style={styles.icon} icon={iconIndex.edit} />}
                                    {(i == 0 && images[0] != '') ? <UpForMeIcon style={styles.favicon} icon={iconIndex.restaurant_star} /> : <></>}

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
        bottom: 4,
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
        height: 200,
        backgroundColor: '#e0e0e0',
        borderRadius: 25,
        marginVertical: 15,
        overflow: "hidden",
    }
})

export default UploadPictures;
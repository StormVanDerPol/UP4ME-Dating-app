import React, { useState, useRef } from 'react';
import TextQuicksand from '../TextQuicksand';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';

const UploadPictures = ({ initImages = [] }) => {

    const [images, setImages] = useState((initImages.length == 0) ? new Array(6) : initImages)

    const _init = useRef(false);

    if (!_init.current) {

        if (initImages.length == 0) {
            images.fill('');
        }

        _init.current = true;
    }

    return (
        <View style={styles.container}>
            {images.map((image, i) => {
                return (
                    <View key={i} style={styles.item}>
                        <TouchableOpacity>
                            <FastImage
                                source={{
                                    uri: image,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                )
            })}
        </View>
    );
}

const styles = StyleSheet.create({
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
    }
})

export default UploadPictures;
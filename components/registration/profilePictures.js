import React, { useState } from 'react';
import ImagePicker from 'react-native-image-picker';

import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';

import { TouchableWithoutFeedback, ScrollView } from 'react-native-gesture-handler';

import { gs, deviceWidth, deviceHeight, mx, apiUrl } from '../../globals';

import Logo from '../logo';
import BigButton from '../bigbutton';
import Axios from 'axios';

const ProfilePictures = ({ route, navigation }) => {

    const [data] = useState(route.params);

    const [src, setSrc] = useState([]);

    const [pfpArray, setPfpArray] = useState(new Array(6));

    const handleChoosePhoto = (id) => {
        const opt = {

        };

        ImagePicker.launchImageLibrary(opt, (res) => {
            console.log('Image URI on device', res.uri);

            src[id] = res.uri;
            setSrc([...src]);

            pfpArray[id] = `data:${res.type};base64,${res.data}`;
            setPfpArray([...pfpArray]);

            console.log('ImagePicker response', res);
        })
    }

    const validatePictures = () => {
        return false;
    }

    const postData = () => {

        let toSend = {
            userid: data.userid,
            photo1: pfpArray[0],
            photo2: pfpArray[1],
            photo3: pfpArray[2],
            photo4: pfpArray[3],
            photo5: pfpArray[4],
            photo6: pfpArray[5]
        }

        console.log('POST to send', toSend);

        Axios.post(`${apiUrl}/set/photos`, toSend)
            .catch((err) => {
                console.log('Error', err);
            });
    }

    return (
        <>
            <ScrollView style={gs.screenWrapperScroll}>


                <Logo />
                <Text style={[s.header, gs.mainHeader]}>Foto's toevoegen</Text>

                <View style={[s.pfpContainer]}>
                    <View>
                        {
                            [...Array(3)].map((val, id) => <TouchableWithoutFeedback
                                key={id}
                                style={[s.pfpItem]}
                                onPress={() => handleChoosePhoto(id)}>
                                <Image
                                    style={[s.pfpImage]}
                                    source={{ uri: src[id] }} />
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
                                    source={{ uri: src[id + 3] }} />
                            </TouchableWithoutFeedback>)
                        }
                    </View>

                </View>

                {/* <View style={{ paddingBottom: 15 }}> */}
                <View style={[gs.bottom]}>
                    <BigButton n={navigation} component="ProfileText" text="doorgaan" disabled={validatePictures()}
                        data={Object.assign(data, { profilePictures: pfpArray })}
                        callBack={postData}
                    />

                    <Text style={[gs.underline, s.guidelines]} onPress={() => navigation.navigate('PhotoGuidelines')}>Lees de richtlijnen</Text>
                </View>
                {/* </View> */}

            </ScrollView>
        </>
    );
}


const boxMarginX = 10;
const boxMarginY = 10;
const cols = 2

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
        backgroundColor: 'gray',
        borderRadius: 15,
        overflow: 'hidden',

    },
    pfpImage: {
        width: '100%',
        height: '100%',
    },

    guidelines: {
        textAlign: "center",
    },
});

export default ProfilePictures;
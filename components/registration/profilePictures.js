import React, { useState } from 'react';
import ImagePicker from 'react-native-image-picker';

import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';

import { TouchableWithoutFeedback, ScrollView } from 'react-native-gesture-handler';

import { gs, deviceWidth, deviceHeight, mx } from '../../globals';

import Logo from '../logo';
import BigButton from '../bigbutton';

const ProfilePictures = ({ route, navigation }) => {

    const [data] = useState(route.params);

    const [src, setSrc] = useState([]);

    const [pfpArray, setPfpArray] = useState([]);

    const handleChoosePhoto = (id) => {
        const opt = {

        };

        ImagePicker.launchImageLibrary(opt, (res) => {
            console.log(res.uri);

            src[id] = res.uri;
            setSrc([...src]);

            pfpArray.push(res.data);
            setPfpArray([...pfpArray]);

            console.log(res);

            // console.log(src);
        })
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
                    <BigButton n={navigation} component="ProfileText" text="doorgaan" disabled={!(pfpArray.length > 1)}
                        data={Object.assign(data, { profilePictures: pfpArray })} />

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
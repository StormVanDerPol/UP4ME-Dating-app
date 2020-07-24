import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';

import { RegistStyles } from '../../../styles/RegistStyles';

import ImageResizer from 'react-native-image-resizer';

import Body, { FlexSection } from '../../../components/Body';
import UpForMeButton from '../../../components/UpForMeButton';
import RegistUp4MeLogo from '../../../components/LoginAndRegistration/RegistUp4MeLogo';
import RegistHeader from '../../../components/LoginAndRegistration/RegistHeader';
import TextQuicksand from '../../../components/TextQuicksand';
import NetworkFeedBackIndicator, { networkFeedbackMessages } from '../../../components/waitIndicator';
import UploadPictures from '../../../components/bigComponents/UploadPictures';
import { dodoFlight } from '../../../functions/dodoAirlines';
import { DATA_STORE } from '../../../stored/dataStore';
import endpoints, { getEndpoint } from '../../../res/data/endpoints';
import { navigationProxy } from '../../../navigation/navigationProxy';
import { postPhotos } from '../../../requests/postPhotos';

const RegistPhotos = () => {

    const [netFeedback, setNetFeedback] = useState({
        busy: false,
        message: '',
    });

    const [images, setImages] = useState(new Array(6))

    const profilePicture = useRef('');

    const _init = useRef(false);

    if (!_init.current) {
        images.fill('');
        _init.current = true;
    }

    const [canContinue, setCanContinue] = useState(false);

    useEffect(() => {

        let _canContinue = false;

        for (let image of images) {
            if (image != '') {
                _canContinue = true;
                break;
            }
            else {
                _canContinue = false;
            }
        }

        setCanContinue(_canContinue);

    }, [images])

    return (
        <Body>
            <FlexSection>
                <RegistUp4MeLogo />
                <RegistHeader>Foto's toevoegen</RegistHeader>


                <View style={[RegistStyles.container]}>
                    <TextQuicksand>Voeg teminste één foto toe. De foto met het sterretje wordt gebruikt als profiel foto!</TextQuicksand>
                    <UploadPictures onChange={({ images: output, profilePicture: outputpfp }) => {
                        profilePicture.current = outputpfp;
                        console.log('pfp', outputpfp)
                        setImages(output);
                    }} />
                </View>
            </FlexSection>

            <View style={RegistStyles.bottom}>
                <NetworkFeedBackIndicator style={RegistStyles.waitIndicator} message={netFeedback.message} />
                <UpForMeButton style={RegistStyles.botButton} title={'doorgaan'} enabled={canContinue} onPress={async () => {

                    setNetFeedback({
                        busy: true,
                        message: networkFeedbackMessages.wait,
                    });

                    await postPhotos(
                        DATA_STORE.userID,
                        images,
                        profilePicture.current,
                        () => {
                            setNetFeedback({
                                busy: false,
                                message: '',
                            });

                            navigationProxy.navigate('RegistProfileText');
                        },
                        () => {
                            setNetFeedback({
                                busy: false,
                                message: networkFeedbackMessages.err,
                            })
                        },
                    )

                    //     let _photos = [];

                    //     for (let image of images) {
                    //         if (image != '') {
                    //             _photos.push(image)
                    //         }
                    //     }

                    //     while (_photos.length != 6) {
                    //         _photos.push('');
                    //     }

                    //     let toSend = {
                    //         userid: DATA_STORE.userID,
                    //         photo1: _photos[0],
                    //         photo2: _photos[1],
                    //         photo3: _photos[2],
                    //         photo4: _photos[3],
                    //         photo5: _photos[4],
                    //         photo6: _photos[5],
                    //     }

                    //     await dodoFlight({
                    //         url: getEndpoint(endpoints.post.setPhotos),
                    //         method: 'post',
                    //         data: toSend,

                    //         thenCallback: async (res) => {
                    //             await dodoFlight({
                    //                 url: getEndpoint(endpoints.post.setProfilePicture),
                    //                 method: 'post',
                    //                 data: {
                    //                     userid: DATA_STORE.userID,
                    //                     profpic: profilePicture.current,
                    //                 },

                    //                 thenCallback: (res) => {

                    //                     if (res.data === true) {

                    // setNetFeedback({
                    //     busy: false,
                    //     message: '',
                    // });

                    // navigationProxy.navigate('RegistProfileText');
                    //                     }
                    //                     else {
                    //                         setNetFeedback({
                    //                             busy: false,
                    //                             message: networkFeedbackMessages.err,
                    //                         });
                    //                     }
                    //                 },

                    //                 catchCallback: (err) => {
                    //                     setNetFeedback({
                    //                         busy: false,
                    //                         message: networkFeedbackMessages.err,
                    //                     });
                    //                 }
                    //             })
                    //         },

                    //         catchCallback: (err) => {
                    // setNetFeedback({
                    //     busy: false,
                    //     message: networkFeedbackMessages.err,
                    // })
                    //         }

                    //     })
                }} />
            </View>

        </Body>
    );
}
const styles = StyleSheet.create({


});

export default RegistPhotos;
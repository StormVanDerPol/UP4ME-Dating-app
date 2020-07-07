import React, { useState, useRef } from 'react';
import { Button, Platform, PermissionsAndroid, SafeAreaView, View, Linking, Alert } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import ImagePicker from 'react-native-image-crop-picker';
import FastImage from 'react-native-fast-image';
import MultiSlider from '@ptomasroos/react-native-multi-slider/MultiSlider';
import LinearGradient from 'react-native-linear-gradient';

import { ScrollView, TextInput, TapGestureHandler, State } from 'react-native-gesture-handler';

import Geolocation from '@react-native-community/geolocation';
import Carousel from 'react-native-snap-carousel';

import { WheelPicker, TimePicker, DatePicker } from 'react-native-wheel-picker-android'
import UpForMeButton, { ButtonTypes } from '../components/UpForMeButton';
import UpForMeModal from '../components/UpForMeModal';
import TextQuicksand from '../components/TextQuicksand';

import InAppBrowser from 'react-native-inappbrowser-reborn'
import { setDataStore, DATA_STORE } from '../stored/dataStore';
import { dodoFlight } from '../functions/dodoAirlines';

export default DevSandbox = () => {

    const [imgBase64, setImgBase64] = useState('');

    const [location, setLocation] = useState('location');

    const watchID = useRef('unset');

    const locUpdates = useRef(0);

    const [fu, forceUpdate] = useState(0);

    const inputAS = useRef('');

    const savedAS = useRef('');

    const runningOn = () => {
        switch (Platform.OS) {
            case 'ios':
                return 'Running on iOS!';
            case 'android':
                return 'Running on Android!';
            default:
                return 'Running on neither ios or android!';
        }
    }

    const storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value)
        } catch (e) {
            // saving error
        }
    }

    const getData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key)
            if (value !== null) {
                savedAS.current = value;
                forceUpdate(fu + 1);
            }
        } catch (e) {
            // error reading value
        }
    }

    const init = useRef(false);

    if (!init.current) {
        getData('test');
        init.current = true;
    }

    const _carousel = useRef();

    const [modalEnabled, setModalEnabled] = useState(true);

    const openBrowser = async (url) => {

        try {

            if (await InAppBrowser.isAvailable()) {
                const res = await InAppBrowser.open(url, {
                    // iOS Properties
                    dismissButtonStyle: 'cancel',
                    preferredBarTintColor: '#453AA4',
                    preferredControlTintColor: 'white',
                    readerMode: false,
                    animated: true,
                    modalPresentationStyle: 'overFullScreen',
                    modalTransitionStyle: 'partialCurl',
                    modalEnabled: true,
                    enableBarCollapsing: false,
                    // Android Properties
                    showTitle: true,
                    toolbarColor: '#6200EE',
                    secondaryToolbarColor: 'black',
                    enableUrlBarHiding: true,
                    enableDefaultShare: true,
                    forceCloseOnRedirection: false,
                    // Specify full animation resource identifier(package:anim/name)
                    // or only resource name(in case of animation bundled with app).
                    animations: {
                        startEnter: 'slide_in_right',
                        startExit: 'slide_out_left',
                        endEnter: 'slide_in_left',
                        endExit: 'slide_out_right'
                    },
                    headers: {
                        'my-custom-header': 'my custom header value'
                    }
                })
                Alert.alert(JSON.stringify(result))
            }
            else {
                Linking.openURL(url)
            }
        } catch (err) {
            Alert.alert(err.message)
        }
    }

    const inputUrl = useRef('');

    return (
        <>
            <SafeAreaView>
                <ScrollView>
                    <TextQuicksand>{runningOn()}</TextQuicksand>

                    <Button title={'force re-render'} onPress={() => { forceUpdate(fu + 1) }} />

                    <Button title={'react-native-image-crop-picker'}
                        onPress={() => {
                            ImagePicker.openPicker({
                                width: 300,
                                height: 400,
                                cropping: true,
                                includeBase64: true,
                            }).then(image => {
                                // console.log(image)
                                setImgBase64(`data:${image.mime};base64,${image.data}`);
                            });
                        }} />

                    <TextQuicksand>react-native-fast-image</TextQuicksand>
                    <FastImage
                        style={{
                            width: 300,
                            height: 400,
                        }}
                        source={{
                            uri: imgBase64,
                        }}
                    />

                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4c669f', '#3b5998', '#192f6a']}>
                        <TextQuicksand>
                            react-native-linear-gradient
                    </TextQuicksand>
                    </LinearGradient>


                    <TextQuicksand>@ptomasroos/react-native-multi-slider/MultiSlider</TextQuicksand>
                    <MultiSlider />

                    <Button title={'Request Location'} onPress={async () => {

                        if (Platform.OS == 'android') {
                            var granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
                        }

                        if (watchID.current == 'unset') {
                            watchID.current = Geolocation.watchPosition((pos) => {
                                locUpdates.current += 1;
                                setLocation(`${locUpdates.current} amount of updates. ${pos.coords.latitude} ${pos.coords.longitude}`)
                            }, (err) => {
                                setLocation('error')
                            }, {
                                timeout: 1000,
                                maximumAge: 2000,
                                enableHighAccuracy: true,
                                distanceFilter: 5000,
                                useSignificantChanges: false,
                            });
                        }
                    }} />

                    <TextQuicksand>{location}</TextQuicksand>

                    <TextInput onChangeText={(input) => {
                        inputAS.current = input;
                    }}
                        placeholder={'enter shit'} />

                    <Button title={'save string asyncStorage && to DATA_STORE as key "meme"'} onPress={async () => {
                        await storeData('test', inputAS.current);
                        getData('test');
                        // setDataStore('meme', inputAS.current);
                        DATA_STORE.meme = inputAS.current;
                    }} />
                    <TextQuicksand>asyncstorage stored value: {savedAS.current}</TextQuicksand>

                    <TextQuicksand>react-native-snap-carousel</TextQuicksand>
                    <TapGestureHandler onHandlerStateChange={(e) => {
                        if (e.nativeEvent.state == State.END) {
                            _carousel.current.snapToNext();
                        }
                    }}>
                        <Carousel
                            ref={(c) => {
                                _carousel.current = c;
                            }}


                            data={[
                                {
                                    name: 'The World',
                                    number: 21,
                                },
                                {
                                    name: 'The Star',
                                    number: 17,
                                },
                                {
                                    name: 'The Chariot',
                                    number: 7,
                                },
                                {
                                    name: 'The Hanged Man',
                                    number: 12
                                },
                            ]}

                            renderItem={(data, i) => {
                                return (
                                    <View
                                        key={i}
                                        style={{
                                            width: 200,
                                            height: 200,
                                            backgroundColor: '#f55',
                                            borderWidth: 2,
                                        }}>
                                        <TextQuicksand>{data.item.name}</TextQuicksand>
                                        <TextQuicksand>{data.item.number}</TextQuicksand>
                                    </View>
                                )
                            }}

                            sliderWidth={200}
                            itemWidth={200}

                            // layout={'tinder'}
                            // layoutCardOffset={`9`}

                            // enableMomentum={true}
                            loop={true}
                        />
                    </TapGestureHandler>

                    <WheelPicker
                        data={[
                            'it',
                            'just',
                            'works',
                            'tm',
                        ]}
                    />

                    <TimePicker />

                    <DatePicker />



                    <Button title={'show modal'} onPress={() => { setModalEnabled(true) }} />

                    <TextInput onChangeText={(input) => { inputUrl.current = input }} placeholder={'insert url'} />
                    <Button title={'Open url'} onPress={() => { openBrowser(inputUrl.current) }} />

                    <Button title={'Request 403'} onPress={() => { dodoFlight({ url: 'https://httpstat.us/403', method: 'get' }) }} />
                    <Button title={'Request 200'} onPress={() => { dodoFlight({ url: 'https://httpstat.us/200', method: 'get' }) }} />




                </ScrollView>

                <UpForMeModal enabled={modalEnabled}>
                    <UpForMeButton title={'Hello'} />
                    <UpForMeButton title={'Hello'} buttonType={ButtonTypes.white} />
                    <UpForMeButton title={'Hello'} buttonType={ButtonTypes.dimmed} onPress={() => { setModalEnabled(false) }} />
                </UpForMeModal>





            </SafeAreaView>
        </>
    );
}
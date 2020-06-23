import React, { useState, useRef } from 'react';
import { Text, Button, Platform, PermissionsAndroid, SafeAreaView, View } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import ImagePicker from 'react-native-image-crop-picker';
import FastImage from 'react-native-fast-image';
import MultiSlider from '@ptomasroos/react-native-multi-slider/MultiSlider';
import LinearGradient from 'react-native-linear-gradient';

import { ScrollView, TextInput, TapGestureHandler, State } from 'react-native-gesture-handler';

import Geolocation from '@react-native-community/geolocation';
import Carousel from 'react-native-snap-carousel';

import { WheelPicker, TimePicker, DatePicker } from 'react-native-wheel-picker-android'


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

    return (
        <>
            <SafeAreaView>
                <ScrollView>
                    <Text>{runningOn()}</Text>

                    <Button title={'force re-render'} onPress={() => { forceUpdate(fu + 1) }} />

                    <Button title={'react-native-image-crop-picker'}
                        onPress={() => {
                            ImagePicker.openPicker({
                                width: 300,
                                height: 400,
                                cropping: true,
                                includeBase64: true,
                            }).then(image => {
                                console.log(image)
                                setImgBase64(`data:${image.mime};base64,${image.data}`);
                            });
                        }} />

                    <Text>react-native-fast-image</Text>
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
                        <Text>
                            react-native-linear-gradient
                    </Text>
                    </LinearGradient>


                    <Text>@ptomasroos/react-native-multi-slider/MultiSlider</Text>
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

                    <Text>{location}</Text>

                    <TextInput onChangeText={(input) => {
                        inputAS.current = input;
                    }}
                        placeholder={'enter shit'} />

                    <Button title={'save string asyncStorage'} onPress={async () => {
                        await storeData('test', inputAS.current);
                        getData('test')
                    }} />
                    <Text>stored value: {savedAS.current}</Text>

                    <Text>react-native-snap-carousel</Text>
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
                                        <Text>{data.item.name}</Text>
                                        <Text>{data.item.number}</Text>
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

                </ScrollView>
            </SafeAreaView>
        </>
    );
}
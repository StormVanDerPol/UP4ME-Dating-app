import React, { useState } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';

import { navigationProxy } from '../navigation/navigationProxy';
import { TouchableOpacity, ScrollView, TextInput } from 'react-native-gesture-handler';

import { rnRGB, invertRGB } from '../functions/colors';
import { clearAsyncStorage, getData } from '../stored/handleData';
import { DATA_STORE } from '../stored/dataStore';
import TextQuicksand from '../components/TextQuicksand';

const devRoutes = [
    {
        name: 'DevSandbox',
        color: { r: 50, g: 200, b: 100 },
        header: 'Dev'
    },

    {
        name: 'DevEndpointTests',
        color: { r: 50, g: 200, b: 100 },
    },

    {
        name: 'StartUp',
        color: { r: 200, g: 50, b: 100 },
        header: 'Boot'
    },

    {
        header: 'Login and Registration',
        name: 'Landing',
        color: { r: 60, g: 60, b: 255 },
    },

    {
        name: 'LocalStratEmail',
        color: { r: 60, g: 60, b: 255 },
    },

    {
        name: 'ConfirmationCode',
        color: { r: 60, g: 60, b: 255 },
    },

    {
        name: 'RegistUserData',
        color: { r: 60, g: 60, b: 255 },
    },
    {
        name: 'RegistLocation',
        color: { r: 60, g: 60, b: 255 },
    },
    {
        name: 'RegistGender',
        color: { r: 60, g: 60, b: 255 },
    },
    {
        name: 'RegistPhotos',
        color: { r: 60, g: 60, b: 255 },
    },
    {
        name: 'RegistProfileText',
        color: { r: 60, g: 60, b: 255 },
    },
    {
        name: 'RegistUserProperties',
        color: { r: 60, g: 60, b: 255 },
    },
    {
        name: 'RegistCriteria',
        color: { r: 60, g: 60, b: 255 },
    },

    {
        name: 'LoadHome',
        color: { r: 60, g: 255, b: 60 },
        header: 'Home'
    },
    {
        name: 'LoadCriteria',
        color: { r: 255, g: 255, b: 60 },
        header: 'Criteria'
    },
    {
        name: 'LoadProfileHub',
        color: { r: 75, g: 200, b: 75 },
        header: 'Profile'
    },
]

const styles = StyleSheet.create({
    button: {
        padding: 10,
        margin: 10,
        borderRadius: 25,
        borderWidth: 2,
    },

    buttonWrapper: {
        paddingVertical: 10,
    }
});

export default DevRouter = () => {

    const [userData, setUserData] = useState([]);

    return (
        <ScrollView>

            <View style={styles.buttonWrapper}>
                <Button
                    title={'clear asyncstorage'}
                    onPress={() => {
                        clearAsyncStorage();
                    }}
                />
            </View>

            <View style={styles.buttonWrapper}>
                <Button
                    title={'load userID and Token'}
                    onPress={async () => {
                        let keys = [
                            'userID',
                            'userToken',
                        ];

                        for (key of keys) {
                            DATA_STORE[key] = await getData(key);
                        }

                        setUserData([
                            'userID: ' + DATA_STORE.userID,
                            'userToken: ' + DATA_STORE.userToken,
                        ])
                    }}
                />
            </View>

            <TextInput style={{ borderBottomWidth: 1 }} placeholder={'email...'} onChangeText={(input) => {
                DATA_STORE.registData.email = input;
            }} />

            {userData.map((val, i) => {
                return <TextQuicksand key={i}>{val}</TextQuicksand>
            })}

            {devRoutes.map((route, i) => {

                let headerJSX = <></>;

                if (route.header) {
                    headerJSX = <Text>{route.header}</Text>
                }

                return (
                    <View
                        key={i}>

                        {headerJSX}

                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: rnRGB(route.color), borderColor: rnRGB(invertRGB(route.color)) }]}
                            onPress={() => {
                                navigationProxy.navigate(route.name)
                            }}
                        >
                            <Text style={{ color: rnRGB(invertRGB(route.color)) }}>{route.name}</Text>
                        </TouchableOpacity>
                    </View>

                )
            })}
        </ScrollView>
    );
}
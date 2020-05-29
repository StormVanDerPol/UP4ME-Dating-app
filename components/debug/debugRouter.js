import React, { useState } from 'react';

import {
    StyleSheet, Button, Text, View,
} from 'react-native';

import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { up4meColours } from '../../globals';


const routes = [
    'Email',
    'ConfirmationCode',
    'Agreement',
    'PrivacyPolicy',
    'CookiePolicy',
    'UserData',
    'Location',
    'Gender',
    'ProfilePictures',
    'UserProps',
    'PhotoGuidelines',
    'ProfileText',
    'UserSettings',
    'MatchCatalog',
    'Filter',
    'FQA',
    'NAV',
    'UserProfile',
    'EditFilters',
    'MatchNoMatch',
    'MatchScreenInitial',
    'MatchScreen',
    'EditProfile',
    'ExampleProfile',
    'Overview',
    'PickRestaurant'
]

const debugRouter = ({ navigation }) => {

    const [debugUserID, setDebugUserID] = useState(38);

    return (
        <>
            <ScrollView>
                <View style={[s.itemMargin]}>
                    <Button title={'Start up4me (Login Screen)'}
                        onPress={() => { navigation.navigate('Login') }} />
                </View>

                <View style={[s.itemMargin]}>
                    <Text>Use the following userid:</Text>
                    <TextInput style={[{ borderBottomWidth: 1 }]} defaultValue={debugUserID + ''}
                        placeholder={'Enter userid'}
                        onChangeText={(input) => {
                            setDebugUserID(input);
                        }} />
                </View>

                <View style={[s.itemMargin]}>
                    <Button title={'Start up4me as userid'}
                        onPress={() => {
                            global.sessionUserId = debugUserID;
                            navigation.navigate('Login')
                        }} />
                </View>



                {routes.map((route, i) => {

                    return (
                        <View key={i} style={[s.itemMargin]}>
                            <Button title={route} onPress={() => {
                                global.sessionUserId = debugUserID;
                                navigation.navigate(route);
                            }} />
                        </View>
                    );
                })}
            </ScrollView>
        </>
    );
}

const s = StyleSheet.create({
    itemMargin: {
        marginVertical: 5,
        borderWidth: 5,
        borderColor: up4meColours.gradPink,
        backgroundColor: up4meColours.gradOrange,
    },
});

export default debugRouter;
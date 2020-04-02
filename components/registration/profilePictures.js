import React, { useState } from 'react';

import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import { gs, deviceWidth, deviceHeight } from '../../globals';
import Logo from '../logo';
import BigButton from '../bigbutton';
import ProfilePicItem from './profilePicItem';

const ProfilePictures = ({ navigation }) => {

    return (
        <>
            <View style={gs.screenWrapper}>
                <View>
                    <Logo />
                    <Text style={[s.header, gs.mainHeader]}>Profiel foto's</Text>
                </View>

                <View style={[s.picContainer]}>
                    <ProfilePicItem />
                    <ProfilePicItem />
                </View>

                <View style={gs.bottom}>
                    <BigButton n={navigation} component="UserProps" text="doorgaan" />
                </View>

            </View>
        </>
    );
}

const s = StyleSheet.create({
    picContainer: {
        // flex: 1,
        borderWidth: 1,
        flexDirection: "row"
    },
});

export default ProfilePictures;
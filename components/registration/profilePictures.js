import React from 'react';

import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import { gs } from '../../globals';
import Logo from '../logo';
import BigButton from '../bigbutton';

const ProfilePictures = ({ navigation }) => {
    return (
        <>
            <View style={gs.screenWrapper}>
                <View>
                    <Logo />
                    <Text style={[s.header, gs.mainHeader]}>Profiel foto's</Text>
                </View>

                <View style={gs.bottom}>
                    <BigButton n={navigation} component="UserProps" text="doorgaan" />
                </View>

            </View>
        </>
    );
}

const s = StyleSheet.create({

});

export default ProfilePictures;
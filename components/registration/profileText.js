
import React, { useState, useEffect } from 'react';

import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import Logo from '../logo';

import { gs } from '../../globals';

import BigButton from '../bigbutton';
import ProfileTextField from './profileTextField';
import Axios from 'axios';
import { endpointSetProfileText } from '../../endpoints';

const ProfileText = () => {

    const handleData = () => {
        global.registData.profileDescription = profText;

        Axios.post(`${endpointSetProfileText}`, {
            userid: global.sessionUserId,
            profiletext: profText,
        })

        console.log('saved data: ', global.registData);
    }

    const [profText, setProfText] = useState('');

    const getProfText = (data) => {
        setProfText(data);
    }

    useEffect(() => {
        console.log(profText);
    }, [profText])

    return (
        <View style={gs.body}>
            <View style={gs.screenWrapper}>
                <Logo />
                <Text style={[s.header, gs.mainHeader]}>Profieltekst</Text>

                <ProfileTextField getProfText={getProfText} />

                <View style={[gs.bottom]}>
                    <BigButton component="UserProps" text="doorgaan" disabled={!(profText)}
                        callBack={handleData}
                    />
                </View>
            </View>
        </View>
    );
};


const s = StyleSheet.create({

    header: {
        marginBottom: 25,
    },
});

export default ProfileText;


import React, { useState, useEffect, useRef } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Keyboard
} from 'react-native';

import Logo from '../logo';

import { gs } from '../../globals';

import BigButton from '../bigbutton';
import ProfileTextField from './profileTextField';
import Axios from 'axios';
import { endpointSetProfileText, endpointGetProfile } from '../../endpoints';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const ProfileText = () => {

    const [fu, forceUpdate] = useState(0);

    const handleData = () => {
        global.registData.profileDescription = profText;

        Axios.post(`${endpointSetProfileText}`, {
            userid: global.sessionUserId,
            profiletext: profText,
        }).catch((err) => {
            console.log(err);
        })


        console.log('saved data: ', global.registData);
    }

    const [profText, setProfText] = useState('');

    const getProfText = (data) => {
        setProfText(data);
    }

    const _init = useRef(false);
    if (!_init.current) {
        Axios.get(`${endpointGetProfile}${global.sessionUserId}`)
            .then((res) => {

                if (res.data.profieltext)
                    setProfText(res.data.profieltext)
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setProfTextFetched(true);
            })

        _init.current = true;
    }


    const [profTextFetched, setProfTextFetched] = useState(false);
    const _ProfileTextFieldComponent = useRef(<></>);
    useEffect(() => {

        if (profTextFetched) {
            _ProfileTextFieldComponent.current = <ProfileTextField initProfText={profText} getProfText={getProfText} />;
            forceUpdate(fu + 1);
        }

    }, [profTextFetched])

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <View style={gs.body}>
                <View style={gs.screenWrapper}>
                    <Logo />
                    <Text style={[s.header, gs.mainHeader]}>Profieltekst</Text>

                    {_ProfileTextFieldComponent.current}

                    <View style={[gs.bottom]}>
                        <BigButton component="UserProps" text="doorgaan" disabled={!(profText)}
                            callBack={handleData}
                        />
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>

    );
};


const s = StyleSheet.create({

    header: {
        marginBottom: 25,
    },
});

export default ProfileText;

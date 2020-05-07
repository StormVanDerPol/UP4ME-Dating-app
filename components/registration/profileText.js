
import React, { useState } from 'react';

import {
    StyleSheet,
    ScrollView,
    Text,
    View
} from 'react-native';

import Logo from '../logo';

import { gs, apiUrl } from '../../globals';

import BigButton from '../bigbutton';
import { TextInput } from 'react-native-gesture-handler';
import Axios from 'axios';
import { endpointSetProfileText } from '../../endpoints';

const ProfileText = ({ route, navigation }) => {

    const [data] = useState(route.params);
    const [profText, setProfText] = useState('')


    const postData = () => {
        Axios.post(endpointSetProfileText,
            {
                userid: data.userid,
                profiletext: profText
            });
    }

    return (
        <>
            <View style={gs.screenWrapper}>
                <Logo />
                <Text style={[s.header, gs.mainHeader]}>Profieltekst</Text>

                <View style={[s.grayTextBox]}>
                    <TextInput
                        multiline={true}
                        maxLength={500}
                        placeholder="Vertel hier wat jouw date over je moet weten. Heb jij een bijzondere of tijdrovende hobby? Een speciale wens, een niet alledaags beroep? Een handicap of een speciale levensstijl? Bij Up4me mag je direct jezelf zijn. Zo laat jij alles van je echte kan zien."
                        onChangeText={(input) => setProfText(input)}
                    />
                </View>

                <View style={[gs.bottom]}>
                    <BigButton n={navigation} component="UserProps" text="doorgaan" disabled={!(profText)}
                        data={Object.assign(data, { profileDescription: profText })}
                        callBack={postData}
                    />
                </View>
            </View>
        </>
    );
};

const s = StyleSheet.create({

    header: {
        marginBottom: 25,
    },

    grayTextBox: {
        borderRadius: 25,
        borderColor: "gray",
        borderWidth: 1,
        padding: 20,
        marginBottom: 25
    },
});

export default ProfileText;

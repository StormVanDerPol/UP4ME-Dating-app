import React from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {
    deviceHeight,
    gs,
    pallette
} from '../../globals';
import LoginButton from './loginBtn';
import RNSVG_up4me_logo_login from '../../res/ui/rnsvg/rnsvg_up4me_logo_login';

function Login({ navigation }) {

    return (
        <>
            <LinearGradient colors={[pallette[0], pallette[1]]}>
                <View style={s.wrapper}>

                    <View style={s.logo} >
                        <RNSVG_up4me_logo_login />
                    </View>

                    <View>
                        <LoginButton n={navigation} text="Inloggen" component="UserProfile"></LoginButton>
                        <LoginButton n={navigation} text="Maak nieuw account aan" component="Email"></LoginButton>
                    </View>

                    <View style={s.bottom}>
                        <Text style={s.agreement}>Als je inloggen of Maak een account aan tikt, ga je akkoord met onze<Text style={gs.underline} onPress={() => navigation.navigate('Agreement')}> Voorwaarden. </Text>
                        Lees meer over hoe we je  gegevens verwerken in ons <Text style={gs.underline} onPress={() => navigation.navigate('PrivacyPolicy')}> Privacybeleid </Text>
                        en<Text style={gs.underline} onPress={() => navigation.navigate('CookiePolicy')}> Cookiebeleid. </Text>
                        </Text>
                    </View>

                </View>
            </LinearGradient>
        </>
    );
};

const s = StyleSheet.create({
    logo: {
        height: 150,
        width: 150,
        alignSelf: "center",
        marginBottom: 40,
    },

    wrapper: {
        paddingTop: 100,
        height: deviceHeight - 24,
        marginHorizontal: 10
    },

    agreement: {
        color: "white",
        fontSize: 15,
    },

    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 10,
        alignSelf: "center"
    },

});

export default Login;

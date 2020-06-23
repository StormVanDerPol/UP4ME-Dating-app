import React from 'react'
import { StyleSheet, Text, SafeAreaView, Dimensions, View } from 'react-native';
import TextQuicksand from '../../components/TextQuicksand';
import LinearGradient from 'react-native-linear-gradient';
import up4meColours from '../../res/data/colours';
import RnsvgIcon from '../../components/RnsvgIcon';
import RNSVG_up4me_logo_login from '../../res/icons/rnsvg/rnsvg_up4me_logo_login';
import UpForMeButton, { ButtonTypes } from '../../components/UpForMeButton';
import { navigationProxy } from '../../navigation/navigationProxy';
import { openBrowser } from '../../functions/bowser';



const Landing = () => {

    return (
        <>
            <SafeAreaView style={{
                height: Dimensions.get('window').height - 24,
            }}>
                <LinearGradient style={s.bg} colors={[up4meColours.gradOrange, up4meColours.gradPink]}>

                    <RnsvgIcon style={s.logo} icon={<RNSVG_up4me_logo_login />} />

                    <UpForMeButton
                        style={s.button}
                        title={'Inloggen'}
                        buttonType={ButtonTypes.landing}
                        onPress={() => { navigationProxy.navigate() }} />

                    <UpForMeButton
                        style={s.button}
                        title={'Maak een nieuw account aan'}
                        buttonType={ButtonTypes.landing}
                        onPress={() => { navigationProxy.navigate() }} />

                    <View style={s.bottom}>
                        <TextQuicksand style={s.text}>Als je inloggen of Maak een account aan tikt, ga je akkoord met onze
                        <TextQuicksand style={s.underline} tap={() => { openBrowser('https://www.nhentai.net') }}>Voorwaarden</TextQuicksand>.Lees meer over hoe we je  gegevens verwerken in ons
                        <TextQuicksand style={s.underline} tap={() => { openBrowser('https://www.nhentai.net') }}>Privacybeleid</TextQuicksand>, en
                        <TextQuicksand style={s.underline} tap={() => { openBrowser('https://www.nhentai.net') }}>Cookiebeleid</TextQuicksand>.
                        </TextQuicksand>
                    </View>

                </LinearGradient>
            </SafeAreaView>
        </>
    );
}

const s = StyleSheet.create({
    bg: {
        height: '100%',
    },

    logo: {
        marginTop: 66,
        height: 150,
        width: 150,
        alignSelf: "center",
        marginBottom: 40,
    },

    button: {
        alignSelf: "center",
        marginHorizontal: 10,
        marginVertical: 10,
    },

    text: {
        color: "white",
        fontSize: 15,
        textAlign: "center",
    },

    underline: {
        textDecorationLine: "underline",
    },

    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 10,
        alignSelf: "center",
        padding: 10,
    },
})

export default Landing;
import React, { useState, useRef } from 'react'

import { StyleSheet, SafeAreaView, Dimensions, View } from 'react-native';

import TextQuicksand from '../../components/TextQuicksand';
import LinearGradient from 'react-native-linear-gradient';

import up4meColours from '../../res/data/colours';

import UpForMeIcon, { iconIndex } from '../../components/UpForMeIcon';

import UpForMeButton, { ButtonTypes } from '../../components/UpForMeButton';

import { navigationProxy } from '../../navigation/navigationProxy';
import { openBrowser } from '../../functions/bowser';

import StaticScreenWrapper, { StaticContent } from '../../components/StaticScreenWrapper';
import UpForMeModal from '../../components/UpForMeModal';
import AuthButton, { providerIndex } from '../../components/AuthButton';


const Landing = () => {

    const action = useRef('');

    const [provModalActive, setProvModalActive] = useState(false);

    return (
        <>
            <StaticScreenWrapper>
                <LinearGradient style={styles.bg} colors={[up4meColours.gradOrange, up4meColours.gradPink]}>

                    <StaticContent>

                        <UpForMeIcon style={styles.logo} icon={iconIndex.up4me_logo_login} />

                        <UpForMeButton
                            style={styles.button}
                            title={'Inloggen'}
                            buttonType={ButtonTypes.landing}
                            onPress={() => {
                                action.current = 'sign-in';
                                setProvModalActive(true)
                            }}
                        />

                        <UpForMeButton
                            style={styles.button}
                            title={'Maak een nieuw account aan'}
                            buttonType={ButtonTypes.landing}
                            onPress={() => {
                                action.current = 'sign-up';
                                setProvModalActive(true)
                            }}
                        />

                    </StaticContent>

                    <View style={styles.bottom}>
                        <TextQuicksand style={styles.text}>Als je inloggen of Maak een account aan tikt, ga je akkoord met onze <TextQuicksand style={styles.underline} onPress={() => { openBrowser('https://www.nhentai.net') }}>Voorwaarden</TextQuicksand>. Lees meer over hoe we je gegevens verwerken in ons <TextQuicksand style={styles.underline} onPress={() => { openBrowser('https://www.nhentai.net') }}>Privacybeleid</TextQuicksand>, en <TextQuicksand style={styles.underline} onPress={() => { openBrowser('https://www.nhentai.net') }}>Cookiebeleid</TextQuicksand>.</TextQuicksand>
                    </View>

                </LinearGradient>
            </StaticScreenWrapper>

            <UpForMeModal style={styles.modalContent} enabled={provModalActive} duration={300}>
                <AuthButton style={styles.authButton} provider={providerIndex.up4me} action={action.current}
                    onPress={() => {
                        navigationProxy.navigate('LocalStratEmail');
                    }} />
                <AuthButton style={styles.authButton} provider={providerIndex.google} action={action.current} />
                <UpForMeButton style={styles.modalCancelButton} title={'Sluiten'} onPress={() => { setProvModalActive(false) }} />
            </UpForMeModal>
        </>
    );
}

const styles = StyleSheet.create({

    bg: {
        flex: 1,
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
        marginBottom: 10,
        alignSelf: "center",
        padding: 10,
    },

    modalContent: {
        justifyContent: "flex-end",
        alignItems: "center",
    },

    modalCancelButton: {
        marginTop: 50,
        marginBottom: 25,
    },

    authButton: {
        marginBottom: 25,
    }
})

export default Landing;
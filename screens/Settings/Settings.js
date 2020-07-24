import React, { useState, useEffect } from 'react';
import Body, { FlexSection } from '../../components/Body';
import NavBar, { nbroutes } from '../../components/navBar/NavBar';
import { ArrowButtonTop, ArrowButtonDropDown, ArrowButtonRight } from '../../components/UpForMeArrowButtons';
import InputUserData from '../../components/bigComponents/InputUserData';
import KeyboardDismiss from '../../components/KeyboardDismiss';
import { View, StyleSheet } from 'react-native';
import { RegistStyles } from '../../styles/RegistStyles';
import { DATA_STORE } from '../../stored/dataStore';
import { toNonRetardDate, getYearIndex, toRetardDate } from '../../res/data/time';
import { navigationProxy } from '../../navigation/navigationProxy';
import TextQuicksand from '../../components/TextQuicksand';
import UpForMeSwitch from '../../components/UpForMeSwitch';
import { openBrowser } from '../../functions/bowser';
import NetworkFeedBackIndicator from '../../components/waitIndicator';
import UpForMeButton, { ButtonTypes } from '../../components/UpForMeButton';
import { MemeMath } from '../../functions/math';
import UpForMeModal from '../../components/UpForMeModal';
import { GPS_DATA } from '../../functions/gps';
import { deleteData, setJSONData } from '../../stored/handleData';

export const logout = async () => {

    DATA_STORE.userID = null;
    DATA_STORE.userToken = null;
    GPS_DATA.enabled = false;

    await deleteData('userID');
    await deleteData('userToken');

    navigationProxy.reset({
        index: 1,
        routes: [
            {
                name: 'Landing',
                params: {},
            }
        ]
    })

}


const Settings = () => {

    const [settings, setSettings] = useState(DATA_STORE.settings);

    useEffect(() => {
        setJSONData('settings', settings);
    }, [settings])

    const [netFeedback, setNetFeedback] = useState({
        busy: false,
        message: '',
    })

    const [showLogout, setShowLogout] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    return (
        <KeyboardDismiss>
            <Body>
                <NavBar route={nbroutes.profile} />

                <FlexSection>
                    <ArrowButtonTop header={'Instellingen'} onPress={() => {
                        navigationProxy.navigate('ProfileHub');
                    }} />

                    <ArrowButtonRight header={'Mijn gegevens'}
                        start={false}
                        onPress={() => {
                            navigationProxy.navigate('EditUserData')
                        }} />

                    <ArrowButtonRight header={'Geslacht'}
                        onPress={() => {
                            navigationProxy.navigate('EditGender')
                        }} />

                    <View>
                        <ArrowButtonRight header={'Locatie'}
                            onPress={() => {
                                navigationProxy.navigate('EditLocation')
                            }} />
                        <TextQuicksand style={styles.extraInfo}>{DATA_STORE.profileCache[DATA_STORE.userID].zoektin}</TextQuicksand>
                    </View>
                    <ArrowButtonDropDown header={'Meldingen'}>
                        <View>
                            <NotifSetting header={'Nieuwe matches'} active={settings.notification.newMatch} onPress={async () => {

                                settings.notification.newMatch = (settings.notification.newMatch) ? false : true;

                                setSettings({
                                    ...settings,
                                });
                            }} />
                            <NotifSetting header={'Nieuw date voorstel'} active={settings.notification.newDate} onPress={async () => {
                                settings.notification.newDate = (settings.notification.newDate) ? false : true;

                                setSettings({
                                    ...settings,
                                });
                            }} />
                            <NotifSetting header={'Date wijzigigen'} active={settings.notification.newChange} onPress={async () => {
                                settings.notification.newChange = (settings.notification.newChange) ? false : true;

                                setSettings({
                                    ...settings,
                                });
                            }} />
                        </View>
                    </ArrowButtonDropDown>

                    <ArrowButtonDropDown header={'Voorwaarden & Privacy'}>
                        <View>
                            <TextQuicksand style={styles.anchor} onPress={() => { openBrowser('https://www.uptodates.nl/algemene-voorwaarden') }}>Voorwaarden</TextQuicksand>
                            <TextQuicksand style={styles.anchor} onPress={() => { openBrowser('https://www.uptodates.nl/privacybeleid') }}>Privacybeleid</TextQuicksand>
                            <TextQuicksand style={styles.anchor} onPress={() => { openBrowser('https://www.uptodates.nl/cookiebeleid') }}>Cookiebeleid</TextQuicksand>
                        </View>
                    </ArrowButtonDropDown>

                    <ArrowButtonDropDown header={'Help & FAQ'}>
                        <TextQuicksand style={styles.anchor} onPress={() => { openBrowser('https://www.uptodates.nl/help') }}>Help</TextQuicksand>
                        <TextQuicksand style={styles.anchor} onPress={() => { openBrowser('https://www.uptodates.nl/faq') }}>FAQ</TextQuicksand>
                    </ArrowButtonDropDown>

                    <ArrowButtonDropDown header={'Richtlijnen & veiligheid'}>
                        <TextQuicksand style={styles.anchor} onPress={() => { openBrowser('https://www.uptodates.nl/richtlijnen') }}>Richtlijnen & veiligheid</TextQuicksand>
                    </ArrowButtonDropDown>

                    <ArrowButtonRight header={'Uitloggen'} onPress={() => {
                        setShowLogout(true);
                        setShowDelete(false)
                    }} />
                    <ArrowButtonRight header={'Account verwijderen'} onPress={() => {
                        setShowLogout(false);
                        setShowDelete(true)
                    }} end={true} />

                </FlexSection>

                <UpForMeModal enabled={(!showDelete && showLogout)}>

                    <View style={{ flex: 1 }} />

                    <View style={styles.reportModal}>

                        <UpForMeButton style={styles.reportModalBtn} title={'Uitloggen'} onPress={async () => {
                            await logout();
                        }} />
                        <UpForMeButton style={styles.reportModalBtn} buttonType={ButtonTypes.white} title={'Annuleren'} onPress={() => setShowLogout(false)} />

                    </View>


                </UpForMeModal>

                <UpForMeModal enabled={(showDelete && !showLogout)}>
                    <View style={{ flex: 1 }} />

                    <View style={styles.reportModal}>
                        <UpForMeButton style={styles.reportModalBtn} buttonType={ButtonTypes.dimmed} title={'Verwijder account'} onPress={() => setShowDelete(false)} />
                        <UpForMeButton style={styles.reportModalBtn} buttonType={ButtonTypes.white} title={'Annuleren'} onPress={() => setShowDelete(false)} />
                    </View>

                </UpForMeModal>

            </Body>
        </KeyboardDismiss>
    );
}

const NotifSetting = ({ header, active, onPress = () => { } }) => {
    return (
        <View style={styles.notifContainer}>
            <TextQuicksand style={styles.notifHeader}>{header}</TextQuicksand>
            <UpForMeSwitch initActive={active} onPress={() => onPress()} />
        </View>
    )
}

const styles = StyleSheet.create({

    reportModal: {
        alignItems: "center",
        marginBottom: 24,
    },

    reportModalBtn: {
        marginVertical: 6,
    },

    userDataContainer: {
        marginHorizontal: 24,
        paddingBottom: 24,
    },

    extraInfo: {
        position: "absolute",
        right: 48,
        top: 12,
        color: '#333',
    },

    notifContainer: {
        justifyContent: "space-between",
        flexDirection: "row",
        marginHorizontal: 24,
    },

    notifHeader: {
        fontSize: 18,
    },

    anchor: {
        textDecorationLine: "underline",
        fontSize: 18,
        marginHorizontal: 24,
        marginVertical: 6,
    }
});

export default Settings;
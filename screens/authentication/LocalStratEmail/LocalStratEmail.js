import React from 'react';

import TextQuicksand from '../../../components/TextQuicksand';

import StaticScreenWrapper, { StaticContent } from '../../../components/StaticScreenWrapper';
import RegistUp4MeLogo from '../../../components/LoginAndRegistration/RegistUp4MeLogo';
import RegistHeader from '../../../components/LoginAndRegistration/RegistHeader';
import { View, StyleSheet } from 'react-native';

import { TextInput, } from 'react-native-gesture-handler';

import UpForMeButton from '../../../components/UpForMeButton';

import { RegistStyles } from '../../../styles/RegistStyles';
import KeyboardDismiss from '../../../components/KeyboardDismiss';

const LocalStratEmail = () => {
    return (
        <>
            <KeyboardDismiss>
                <StaticScreenWrapper>

                    <StaticContent>
                        <RegistUp4MeLogo />
                        <RegistHeader>Mijn emailadres</RegistHeader>

                        <View style={RegistStyles.container}>
                            <TextInput style={[
                                styles.inputText,
                                RegistStyles.inputText
                            ]} />
                            <TextQuicksand>We sturen je een email met een verificatie code.</TextQuicksand>
                        </View>

                    </StaticContent>

                    <View style={RegistStyles.bottom}>
                        <UpForMeButton title={'doorgaan'} />
                    </View>
                </StaticScreenWrapper>
            </KeyboardDismiss>
        </>
    );
}

const styles = StyleSheet.create({
    inputText: {
        marginTop: 75,
        marginBottom: 25,
    }
})

export default LocalStratEmail;
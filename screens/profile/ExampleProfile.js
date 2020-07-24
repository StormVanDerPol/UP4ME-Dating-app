import React from 'react';
import Body, { FlexSection } from '../../components/Body';
import NavBar, { nbroutes } from '../../components/navBar/NavBar';
import UserProfile, { MatchButtons } from '../../components/bigComponents/UserProfile';
import { DATA_STORE } from '../../stored/dataStore';
import { View, StyleSheet } from 'react-native';
import UpForMeBigRadioButton from '../../components/UpForMeBigRadioButton';
import { registParams } from '../../styles/RegistStyles';
import { navigationProxy } from '../../navigation/navigationProxy';

const ExampleProfile = () => {
    return (
        <Body>
            <NavBar route={nbroutes.profile} />
            <FlexSection>
                <View style={styles.container}>
                    <UpForMeBigRadioButton active={1} headers={['Bewerken', 'Voorbeeld']}
                        onChange={(active) => {
                            if (active == 0) {
                                navigationProxy.reset({
                                    index: 1,
                                    routes: [
                                        {
                                            name: 'ProfileHub',
                                            params: {},
                                        },
                                        {
                                            name: 'EditProfile',
                                            params: {},
                                        },
                                    ]
                                });
                            }
                        }}
                    />
                </View>
                <UserProfile userid={DATA_STORE.userID} hideReport={true} />
                <MatchButtons />
            </FlexSection>
        </Body>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: registParams.xMargin,
        paddingVertical: 24,
        borderBottomWidth: 1,
        borderColor: '#666',
    },
});

export default ExampleProfile;
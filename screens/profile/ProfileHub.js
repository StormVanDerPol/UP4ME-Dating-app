import React from 'react';
import Body, { FlexSection } from '../../components/Body';
import { ArrowButtonRight, ArrowButtonTop } from '../../components/UpForMeArrowButtons';
import NavBar, { nbroutes } from '../../components/navBar/NavBar';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import UpForMeIcon, { iconIndex } from '../../components/UpForMeIcon';
import { DATA_STORE } from '../../stored/dataStore';
import getDeviceDimensions from '../../functions/dimensions';
import { navigationProxy } from '../../navigation/navigationProxy';
import shareApp from '../../functions/shareApp';

const ProfileHub = () => {
    return (
        <Body>

            <NavBar route={nbroutes.profile} />

            <FlexSection>

                <TapGestureHandler
                    onHandlerStateChange={({ nativeEvent }) => {
                        if (nativeEvent.state === State.END) {
                            navigationProxy.navigate('EditProfile');
                        }
                    }}
                >
                    <View>
                        <FastImage
                            style={styles.image}
                            source={{
                                uri: DATA_STORE.profileCache[DATA_STORE.userID].foto1
                            }} />
                        <UpForMeIcon
                            style={styles.icon}
                            icon={iconIndex.edit} />
                    </View>
                </TapGestureHandler>

                <ArrowButtonRight header={'Profiel bewerken'} onPress={() => {
                    navigationProxy.navigate('EditProfile');
                }} />
                <ArrowButtonRight header={'Instellingen'} onPress={() => {
                    navigationProxy.navigate('Settings')
                }}
                />
                <ArrowButtonRight header={'Nodig vrienden uit'} onPress={() => {
                    shareApp();
                }}
                    end={true} />
            </FlexSection>
        </Body>
    );
}

const styles = StyleSheet.create({
    image: {
        width: getDeviceDimensions('window', 'width'),
        height: 350,
    },

    icon: {
        position: "absolute",
        bottom: 16,
        right: 16,
        width: 64,
        height: 64,
    }
})

export default ProfileHub;
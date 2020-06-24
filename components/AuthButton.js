import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import UpForMeIcon, { iconIndex } from './UpForMeIcon';
import up4meColours from '../res/data/colours';

import TextQuicksand from './TextQuicksand';
import getDeviceDimensions from '../functions/dimensions';

export const providerIndex = {
    up4me: 0,
    google: 1,
}

const AuthButton = ({ style = {}, provider = providerIndex.up4me, action = 'sign-in', onPress = () => { } }) => {

    let providerLogo = <></>;
    let providerName = '';
    let textColor;

    let extraIconStyle = {};

    let ButtonJSX = () => { };

    switch (provider) {

        case providerIndex.up4me:

            providerName = 'email';
            textColor = '#444';

            ButtonJSX = ({ children }) => {
                return (
                    <View style={[
                        styles.buttonCommon,
                        {
                            backgroundColor: '#fff',
                        },
                    ]}>
                        {children}
                    </View>
                )
            }
            break;

        case providerIndex.google:

            providerLogo = iconIndex.google_logo;
            providerName = 'Google';
            textColor = '#fff';

            extraIconStyle = {
                padding: 8,
                backgroundColor: '#fff',
                borderRadius: 4,
            };

            ButtonJSX = ({ children }) => {
                return (
                    <View style={[
                        styles.buttonCommon,
                        {
                            backgroundColor: '#4285F4',
                        },
                    ]}>
                        {children}
                    </View>
                )
            }
            break;

        default:
            break;
    }

    const buttonTitle = `${action} with ${providerName}`;

    return (
        <View style={style}>
            <ButtonJSX>
                <TouchableOpacity
                    style={styles.contentWrapper}
                    onPress={onPress}
                >
                    <UpForMeIcon style={{ ...styles.logo, ...extraIconStyle }} icon={providerLogo} />

                    <TextQuicksand
                        type={'Medium'}
                        style={{
                            ...styles.buttonTitle,
                            color: textColor
                        }}
                    >
                        {buttonTitle}
                    </TextQuicksand>

                </TouchableOpacity>
            </ButtonJSX>
        </View>
    );
}

const btnDims = {
    height: 50,
    width: getDeviceDimensions('window', 'width') - 100,
    iconMargin: 4,
}

const styles = StyleSheet.create({
    buttonCommon: {
        height: btnDims.height,
        width: btnDims.width,
        borderRadius: 4,
    },

    buttonTitle: {
        fontSize: 18,
    },

    logo: {
        position: "absolute",
        top: btnDims.iconMargin,
        left: btnDims.iconMargin,
        width: btnDims.height - btnDims.iconMargin * 2,
        height: btnDims.height - btnDims.iconMargin * 2,
    },

    contentWrapper: {
        height: '100%',
        width: '100%',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    }
})

export default AuthButton;
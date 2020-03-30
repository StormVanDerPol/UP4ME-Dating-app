import React from 'react';

import { WebView } from 'react-native-webview';

import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import {
    deviceHeight,
    gs,
    mx,
} from '../../globals';
import Logo from '../logo';
import BigButton from '../bigbutton';


const Location = ({ navigation }) => {

    return (
        <>
            <View style={gs.screenWrapper}>

                <View>
                    <Logo />
                    <Text style={[s.header, gs.mainHeader]}>Location</Text>
                </View>

                <View style={gs.bottom}>

                    <View style={s.map}>
                        <WebView
                            source={{ html: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13779.267444002086!2d4.83227035351834!3d52.37307886786171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5e2405a19256f%3A0x9bfab320dca3b48a!2sOLVG%2C%20location%20West!5e0!3m2!1sen!2snl!4v1585478061177!5m2!1sen!2snl"  width="100%" height="100%" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>' }}
                        />
                    </View>

                    <BigButton n={navigation} component="Gender" text="doorgaan" />
                </View>
            </View>
        </>
    );
};

const s = StyleSheet.create({
    map: {
        height: deviceHeight / 2,
        marginHorizontal: -mx,
        marginVertical: 15
    },
});

export default Location;

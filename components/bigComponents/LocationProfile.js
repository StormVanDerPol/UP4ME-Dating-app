import React from 'react';
import FastImage from 'react-native-fast-image';
import TextQuicksand from '../TextQuicksand';
import { View, StyleSheet } from 'react-native';
import getDeviceDimensions from '../../functions/dimensions';

const LocationProfile = ({ data }) => {

    return (
        <>
            <View>
                <FastImage
                    style={styles.profilePicture}
                    source={{
                        uri: data.foto1,
                    }}
                />
                <View style={styles.infobox}>
                    <TextQuicksand shadow={true} style={styles.infobig} type={'Bold'}>{data.naam}</TextQuicksand>
                    <TextQuicksand shadow={true} style={styles.infosmall}>{data.straat} {data.huisnummer}</TextQuicksand>
                    <TextQuicksand shadow={true} style={styles.infosmall}>{data.Postcode} {data.stad} {(data.stadsdeel != null) ? '- ' + data.stadsdeel : ''}</TextQuicksand>
                </View>
                <TextQuicksand style={styles.desc}>{data.omschrijving}</TextQuicksand>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    profilePicture: {
        height: 350,
        width: getDeviceDimensions('window', 'width'),
        borderRadius: 12,
    },

    infobox: {
        position: "absolute",
        left: 20,
        bottom: 80,
    },

    infobig: {
        fontSize: 32,
        color: '#fff',
    },

    infosmall: {
        fontSize: 20,
        color: '#fff',
    },

    desc: {
        margin: 12,
    },


})

export default LocationProfile;
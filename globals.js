import { StyleSheet, Dimensions, PermissionsAndroid } from 'react-native';
import moment from 'moment';

export var deviceHeight = Dimensions.get('window').height;
export var deviceWidth = Dimensions.get('window').width;

export const pallette = ['#FEA15A', '#D100A3'];

export const regexNumerical = new RegExp(/^[0-9]*$/g);
export const regexEmail = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/);

export const mx = 20;

//pls dont forget to change this to your local machine's ipv4 address if you wish to test
export const serverUrl = `192.168.1.13:50000`
export const apiUrl = `http://${serverUrl}/api/v1`;

export const MapsApiRootUrl = 'https://maps.googleapis.com/maps/api/staticmap?';

export const getDistBetweenCoords = (lat1, lon1, lat2, lon2, unit) => {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * l
            .at2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") { dist = dist * 1.609344 }
        if (unit == "N") { dist = dist * 0.8684 }
        return dist;
    }
}

export const calcAgeHet = (bdateApi) => {

    let now = moment();

    console.log('Current Moment: ', now);

    let bdateApiStr = bdateApi + '';

    let bdate = {
        year: parseInt(bdateApiStr.substring(0, 4), 10),
        month: Math.min(bdateApiStr.substring(4, 6), 12),
        day: Math.min(bdateApiStr.substring(6), 31)
    }

    console.log('Birthdate: ', bdate);

    let bdateMoment = moment(`${bdate.day}/${bdate.month}/${bdate.year}`, 'D/M/YYYY');

    let dateDiff = now.diff(bdateMoment, 'years');

    console.log('Date difference: ', dateDiff);

    return dateDiff;
}

export const gs = StyleSheet.create({

    screenWrapper: {

        paddingTop: 15,
        height: deviceHeight - 24,
        marginHorizontal: mx
    },

    screenWrapperScroll: {
        paddingTop: 15,
        marginHorizontal: mx
    },

    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 24
    },

    underline: {
        textDecorationLine: "underline"
    },

    mainHeader: {
        fontSize: 40,
        marginHorizontal: 25,
        marginBottom: 45,
        marginTop: 50
    },

    grayTextBox: {
        borderRadius: 25,
        borderColor: "gray",
        borderWidth: 1,
        padding: 20,
        marginHorizontal: mx,
    },
    topText: {
        textAlign: 'center',
        fontSize: 25,
        color: 'gray',
    },
    body: {
        //white
        backgroundColor: '#FFFFFF',
    },

});
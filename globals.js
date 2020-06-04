import { StyleSheet, Dimensions, } from 'react-native';
import moment from 'moment';

import { debugMode } from './debugmode';

export var deviceHeight = Dimensions.get('window').height;
export var deviceWidth = Dimensions.get('window').width;

export const pallette = ['#FEA15A', '#D100A3'];

export const up4meColours = {
    gradOrange: '#FEA15A',
    gradPink: '#D100A3',
    darkGray: '#D8D8D8',
    lightGray: '#F2F2F2',
    lineGray: '#9C9C9D',
    picGray: '#F4F0F0',
    textGray: '#4A4A4A',
    grayPhotos: '#F4F0F0',
    grayButtons: '#9B9B9B',
    gradYellow1: '#F5CA23',
    gradYellow2: '#F5A623',

}

export const editTimerMS = 500;

export const regexNumerical = new RegExp(/^[0-9]*$/g);
export const regexEmail = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/);

export const mx = 20;

//pls dont forget to change this to your local machine's ipv4 address if you wish to test
//ok boss

export const serverUrl = `192.168.1.239:50000`

export const apiUrl = `http://${serverUrl}/api/v1`;

export const MapsApiRootUrl = 'https://maps.googleapis.com/maps/api/staticmap?';

export const getDistBetweenCoords = (lat1, lon1, lat2, lon2, unit) => {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
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

export const toNonRetardDate = (bdateApi) => {

    let bdateApiStr = bdateApi + '';

    let bdate = {
        year: bdateApiStr.substring(0, 4),
        month: Math.min(bdateApiStr.substring(4, 6), 12) + '',
        day: Math.min(bdateApiStr.substring(6), 31) + '',
    }

    if (bdate.month.length == 1) {
        bdate.month = '0' + bdate.month;
    }


    if (bdate.day.length == 1) {
        bdate.day = '0' + bdate.day;
    }

    return bdate;

}

export function toNonRetardTime(retardTime) {

    let nonRetardTime;

    retardTime = retardTime + '';

    if (retardTime < 1000) {
        nonRetardTime = '0' + retardTime.substring(0, 1) + ':' + retardTime.substring(1, 3);
    }

    else {
        nonRetardTime = retardTime.substring(0, 2) + ':' + retardTime.substring(2, 4);
    }

    return nonRetardTime;
}

export const getMonthName = (month) => {
    switch (month) {
        case '01':
            return 'Januari';
        case '02':
            return 'Februari';
        case '03':
            return 'Maart';
        case '04':
            return 'April';
        case '05':
            return 'Mei';
        case '06':
            return 'Juni';
        case '07':
            return 'Juli';
        case '08':
            return 'Augustus';
        case '09':
            return 'September';
        case '10':
            return 'October';
        case '11':
            return 'November';
        case '12':
            return 'December';
    }
}

export const calcAgeHet = (bdateApi) => {

    let now = moment();

    let bdateApiStr = bdateApi + '';

    let bdate = {
        year: parseInt(bdateApiStr.substring(0, 4), 10),
        month: Math.min(bdateApiStr.substring(4, 6), 12),
        day: Math.min(bdateApiStr.substring(6), 31)
    }

    let bdateMoment = moment(`${bdate.day}/${bdate.month}/${bdate.year}`, 'D/M/YYYY');

    let dateDiff = now.diff(bdateMoment, 'years');

    if (debugMode.calcAge) {

        let consoleStyle = 'font-size: 0.9rem; color: blue';

        console.log('%cMoment(): ', consoleStyle, now);
        console.log('%cBirthdate: ', consoleStyle, bdate);
        console.log('%cDate difference: ', consoleStyle, dateDiff);
    }

    return dateDiff;
}

export const gs = StyleSheet.create({

    screenWrapper: {
        paddingTop: 15,
        height: Dimensions.get('window').height - 24,
        marginHorizontal: mx,
    },

    screenWrapperScroll: {
        paddingTop: 15,
        marginHorizontal: mx
    },

    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 25
    },

    underline: {
        textDecorationLine: "underline"
    },

    mainHeader: {
        fontSize: 40,
        marginHorizontal: 25,
        marginBottom: 45,
        marginTop: 15,
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
        backgroundColor: '#fff'
    },
    iconwrap: {
        width: 50,
        height: 50,
    },
});
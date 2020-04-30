import { StyleSheet, Dimensions } from 'react-native';

export var deviceHeight = Dimensions.get('window').height;
export var deviceWidth = Dimensions.get('window').width;

export const pallette = ['#FEA15A', '#D100A3'];

export const regexNumerical = new RegExp(/^[0-9]*$/g);
export const regexEmail = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/);

export const mx = 20;

//pls dont forget to change this to your local machine's ipv4 address if you wish to test
export const serverUrl = `192.168.1.15:5000`
export const apiUrl = `http://${serverUrl}/api/v1`;

export const MapsApiRootUrl = 'https://maps.googleapis.com/maps/api/staticmap?';

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

});
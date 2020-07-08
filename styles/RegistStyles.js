import { StyleSheet } from 'react-native';
import up4meColours from '../res/data/colours';

export const registParams = {
    xMargin: 20
};

export const RegistStyles = StyleSheet.create({
    header: {
        fontSize: 45,
        marginLeft: registParams.xMargin,
        color: '#000',
    },

    logo: {
        alignSelf: "center",
        height: 75,
        width: 75,
    },

    bottom: {
        marginBottom: 25,
        // alignSelf: "center",
        borderTopWidth: 1,
        borderColor: up4meColours.lineGray
    },

    botButton: {
        alignSelf: "center",
    },

    container: {
        marginHorizontal: registParams.xMargin,
    },

    inputText: {
        borderBottomColor: up4meColours.lineGray,
        borderBottomWidth: 1,
        paddingBottom: 0,
        fontFamily: 'Quicksand-Medium',
        fontSize: 16,
    },

    waitIndicator: {
        marginVertical: 4,
        alignSelf: "center",
    },

    topMargin: {
        marginTop: 24,
    },

    botMargin: {
        marginBottom: 24,
    },

    questionContainer: {
        marginTop: 15,
        paddingVertical: 15,
        borderColor: up4meColours.lineGray,
        borderTopWidth: 1,
    },

    questionHeader: {
        fontSize: 20,
        marginBottom: 24,
        color: '#222',
        marginLeft: registParams.xMargin
    },
})

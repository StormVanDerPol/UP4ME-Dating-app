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
        alignSelf: "center",
        borderTopWidth: 1,
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
    }
})

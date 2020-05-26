import { Dimensions, StyleSheet } from "react-native";

export const MatchScreenUserProfileStyles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height - 125,
    },
    infoBox: {
        position: 'absolute',
        bottom: 20,
        left: 20
    },

    infoBoxItem: {
        alignContent: "center",
        flexDirection: "row",
        marginTop: 10
    },

    infoBoxHeader: {
        color: 'white',
        fontSize: 35,
    },
    infoBoxText: {
        fontSize: 18,
        color: 'white',
    },
    subInfoBoxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        marginBottom: 32
    },

    subInfoBoxWrapper: {
        flexDirection: "row",
        alignItems: "center"
    },

    subInfoIconWrapper: {
        width: 17,
        height: 17,
        marginHorizontal: 8
    },

    infoBoxIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },

    description: {
        fontSize: 16,
        alignItems: 'center',
        padding: 25,
        paddingTop: 0,
    },
    matchProperties: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 25,
        flexWrap: "wrap",
        marginHorizontal: 10,
    },
    matchProperty: {
        fontSize: 12,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginHorizontal: 5,
        marginVertical: 5,
    },

    matchDecision: {
        marginHorizontal: 50,
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
});
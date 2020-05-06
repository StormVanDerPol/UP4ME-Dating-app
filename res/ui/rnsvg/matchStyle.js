import { StyleSheet } from "react-native";

export const matchBtnStyle = StyleSheet.create({
    container: {
        width: 80,
        height: 80,
        borderRadius: 100,
        borderColor: 'pink',
        borderWidth: 2,
        backgroundColor: "white",

        marginBottom: 20,

        justifyContent: "center",
        alignItems: 'center',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})
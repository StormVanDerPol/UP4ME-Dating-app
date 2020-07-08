import { Alert } from "react-native"
import AsyncStorage from "@react-native-community/async-storage"

export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
        console.log(`saved ${key} with value: ${value}`);
    } catch (e) {
        Alert.alert(
            'Something went wrong!',
            'Error saving to internal storage',
        );
    };
};

export const getData = async (key) => {

    try {
        const value = await AsyncStorage.getItem(key);
        return (value) ? value : null;
    } catch (e) {
        Alert.alert(
            'Something went wrong!',
            'Error reading from internal storage',
        );
    };
};

export const clearAsyncStorage = async () => {
    try {
        await AsyncStorage.clear();
    } catch (e) {
        Alert.alert(
            'Something went wrong!',
            'Attempted to clear internal storage',
        );
    };
};
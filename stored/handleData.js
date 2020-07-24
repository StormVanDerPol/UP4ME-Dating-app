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

export const deleteData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        Alert.alert(
            'Something went wrong!',
            'Error deleting data',
        )
    }
}

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

export const getJSONData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value) {
            return JSON.parse(value);
        } else {
            return null;
        }
    } catch (e) {
        Alert.alert(
            'Something went wrong!',
            'Tried getting alot of data, encountered an error'
        )
    }
}

export const setJSONData = async (key, object) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(object));
    } catch (e) {
        Alert.alert(
            'Something went wrong!',
            'Attempted to save JSON',
        );
    }
}

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
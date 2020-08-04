import { Alert } from "react-native"
import AsyncStorage from "@react-native-community/async-storage"

export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);

        console.log(`ASYNCSTORAGE: saved ${key} as ${value}`);
        return 'ok';
    } catch (e) {
        console.log(e);
        Alert.alert(
            'Something went wrong!',
            'Error saving to internal storage',
        );
        return 'error';
    };
};

export const deleteData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        return 'ok';
    } catch (e) {
        Alert.alert(
            'Something went wrong!',
            'Error deleting data',
        );
        return 'error';
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
        return 'error';
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
        );
        return 'error';
    }
}

export const setJSONData = async (key, object) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(object));
        return 'ok';
    } catch (e) {
        Alert.alert(
            'Something went wrong!',
            'Attempted to save JSON',
        );
        return 'error';
    }
}

export const clearAsyncStorage = async () => {
    try {
        await AsyncStorage.clear();
        return 'ok';
    } catch (e) {
        Alert.alert(
            'Something went wrong!',
            'Attempted to clear internal storage',
        );
        return 'error';
    };
};
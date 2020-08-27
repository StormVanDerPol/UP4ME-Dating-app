import { Platform } from "react-native"
import messaging from '@react-native-firebase/messaging'

export const requestMessagingPermission = async () => {
    if (Platform.OS === 'iOS') {

        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            await getFcmToken();
            return true;
        }
        else return false;
    } else {
        await getFcmToken();
        return true;
    }
}

export const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
        console.log({ fcmToken: fcmToken });
    } else {
        console.log('Failed', 'No FCM token received');
    }
}


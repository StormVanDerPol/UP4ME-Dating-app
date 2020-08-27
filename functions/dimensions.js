/*
getDeviceDimensions(target: 'window' | 'screen', axis: 'width' | 'height');
*/


import { Platform, StatusBar, Dimensions } from "react-native"

const getDeviceDimensions = (target, axis, log = false) => {

    const statusBarHeight = (Platform.OS === 'ios' || axis === 'width') ? 0 : StatusBar.currentHeight;

    const result = Dimensions.get(target)[axis] - statusBarHeight;

    if (log) {
        console.log('Status bar height', statusBarHeight);
        console.log('result', result);
    }

    return result;
}

export default getDeviceDimensions;
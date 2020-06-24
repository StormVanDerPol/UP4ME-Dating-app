/*
getDeviceDimensions(target: 'window' | 'screen', axis: 'width' | 'height');
*/


import { Platform, StatusBar, Dimensions } from "react-native"

const getDeviceDimensions = (target, axis) => {

    let statusBarHeight = (Platform.OS === 'ios' || axis === 'width') ? 0 : StatusBar.currentHeight;

    return Dimensions.get(target)[axis] - statusBarHeight;
}

export default getDeviceDimensions;
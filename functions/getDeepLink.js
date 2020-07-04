import { Platform } from 'react-native'
export const getDeepLink = (path = "") => {
    const scheme = 'app'
    const prefix = Platform.OS == 'android' ? `${scheme}://up4me/` : `${scheme}://`
    return prefix + path
}
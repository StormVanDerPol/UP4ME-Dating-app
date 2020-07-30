import { Linking } from 'react-native'
import InAppBrowser from 'react-native-inappbrowser-reborn'
import up4meColours from '../res/data/colours';

export const oAuthLogin = async (url) => {

    try {
        if (await InAppBrowser.isAvailable()) {
            await InAppBrowser.openAuth(url, '', {
                // iOS Properties
                ephemeralWebSession: true,
                dismissButtonStyle: 'cancel',
                preferredBarTintColor: up4meColours.gradOrange,
                preferredControlTintColor: 'white',
                readerMode: false,
                animated: true,
                modalPresentationStyle: 'overFullScreen',
                modalTransitionStyle: 'partialCurl',
                modalEnabled: true,
                enableBarCollapsing: false,
                // Android Properties
                showTitle: false,
                toolbarColor: up4meColours.gradOrange,
                secondaryToolbarColor: 'black',
                enableUrlBarHiding: true,
                enableDefaultShare: false,
                forceCloseOnRedirection: true,

                animations: {
                    startEnter: 'slide_in_right',
                    startExit: 'slide_out_left',
                    endEnter: 'slide_in_left',
                    endExit: 'slide_out_right'
                },
            })
        } else Linking.openURL(url)
    } catch (error) {
        Linking.openURL(url)
    }
}
import { Linking, Alert } from "react-native"
import InAppBrowser from 'react-native-inappbrowser-reborn'
import up4meColours from "../res/data/colours"



export const openBrowser = async (url) => {

    try {

        if (await InAppBrowser.isAvailable()) {
            await InAppBrowser.open(url, {
                // iOS Properties
                dismissButtonStyle: 'cancel',
                preferredBarTintColor: up4meColours.gradPink,
                preferredControlTintColor: 'white',
                readerMode: false,
                animated: true,
                modalPresentationStyle: 'overFullScreen',
                modalTransitionStyle: 'partialCurl',
                modalEnabled: true,
                enableBarCollapsing: false,
                // Android Properties
                showTitle: false,
                toolbarColor: up4meColours.gradPink,
                secondaryToolbarColor: 'black',
                enableUrlBarHiding: true,
                enableDefaultShare: true,
                forceCloseOnRedirection: false,
                // Specify full animation resource identifier(package:anim/name)
                // or only resource name(in case of animation bundled with app).
                animations: {
                    startEnter: 'slide_in_right',
                    startExit: 'slide_out_left',
                    endEnter: 'slide_in_left',
                    endExit: 'slide_out_right'
                },
            })
        }
        else {
            Linking.openURL(url)
        }
    }
    catch (err) {
        Linking.openURL(url)
    }
}

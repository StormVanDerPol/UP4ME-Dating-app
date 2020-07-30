import { Share } from "react-native";

export default shareApp = async () => {
    try {
        const res = await Share.share({
            message: 'Tsukiatte kudasaaaaaaaaaaaai >w< Doki doki~',
            url: ''
        });

        if (res.action === Share.sharedAction) {
            if (res.activityType) {

            } else {
                // console.log('shared');
            }
        } else if (res.action === Share.sharedAction) {
            // console.log('dismissed');
        }

    } catch (error) {
        console.log(error)
    }
}
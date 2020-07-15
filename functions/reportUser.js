import { Alert } from "react-native";
import { DATA_STORE } from "../stored/dataStore";
import { dodoFlight } from "./dodoAirlines";
import endpoints, { getEndpoint } from "../res/data/endpoints";

export default reportUser = (type, userid1, userid2, callback = () => { }) => {
    Alert.alert(
        `Report`,
        `Weet je zeker dat je ${DATA_STORE.profileCache[userid2].naam} wil rapporteren?`,
        [
            {
                text: 'Ja', onPress: async () => {
                    await dodoFlight({
                        method: 'post',
                        url: getEndpoint(endpoints.post.setReport),
                        data: {
                            userid1: userid1,
                            userid2: userid2,
                            status: type,
                        },

                        thenCallback: () => {

                            callback();

                            Alert.alert(
                                `Report received`,
                                `Bedankt voor je hulp up4me een betere plek te maken!`,
                                [
                                    {
                                        text: 'Okay!'
                                    }
                                ],
                                { cancelable: true },
                            );
                        }

                    })
                }
            },
            {
                text: 'Annuleren'
            },

        ],
        { cancelable: true }
    );
}  
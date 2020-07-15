import { dodoFlight } from "../../../functions/dodoAirlines";
import endpoints, { getEndpoint } from "../../../res/data/endpoints";
import { DATA_STORE } from "../../../stored/dataStore";
import { navigationProxy } from "../../../navigation/navigationProxy";
import { Alert } from "react-native";

export default postCriteria = async (
    userid,
    criteria,
    onSuccess = () => { },
    onFail = () => { },
) => {

    //POST CRITERIA
    await dodoFlight({
        method: 'post',
        url: getEndpoint(endpoints.post.setCriteria),
        data: {
            userid: userid,
            sport: criteria.sport,
            feesten: criteria.party,
            roken: criteria.smoking,
            alcohol: criteria.alcohol,
            stemmen: criteria.politics,
            werken: criteria.work,
            kinderen: criteria.kids,
            kinderwens: criteria.kidWish,
            eten: criteria.food,
            afstand: criteria.distance,
            geslacht: criteria.gender,
            minlengte: criteria.heights[0],
            maxlengte: criteria.heights[1],
            leeftijdmin: criteria.ages[0],
            leeftijdmax: criteria.ages[1],
        },

        thenCallback: async (res) => {

            //if criteria posting successful, set last login timestamp
            if (res.data) {

                await dodoFlight({
                    method: 'get',
                    url: getEndpoint(endpoints.get.setLastLogin) + userid,

                    thenCallback: async (res) => {

                        //if timestamp set, get potential matches
                        if (res.data) {
                            await dodoFlight({
                                method: 'get',
                                url: getEndpoint(endpoints.get.potentialMatches) + userid,

                                thenCallback: (res) => {

                                    //if potential matches, go to home screen, registration complete!
                                    if (res.data != false) {

                                        onSuccess();

                                        DATA_STORE.pMatches.list = res.data;
                                        DATA_STORE.pMatches.timeStamp = Date.now();
                                        navigationProxy.navigate('LoadHome');
                                    }
                                    else {
                                        //if no potential matches, ask the user to soften up, else just continue as normal
                                        Alert.alert(
                                            'Geen potentiële matches!',
                                            'Versoepel je criteria om te kunnen matchen met andere gebruikers.',
                                            [
                                                {
                                                    text: 'Toch doorgaan', onPress: () => {

                                                        DATA_STORE.pMatches.list = res.data;
                                                        DATA_STORE.pMatches.timeStamp = Date.now();
                                                        navigationProxy.navigate('LoadHome');
                                                    }
                                                },
                                                {
                                                    text: 'Okay!', onPress: () => {
                                                        onSuccess();
                                                    }
                                                },
                                            ],
                                            { cancelable: false }
                                        );
                                    }
                                },

                                catchCallback: (err) => {
                                    //pot match error
                                    onFail();
                                }
                            })
                        }
                        else {
                            // TimeStamp error
                            onFail();
                        }
                    }
                })
            }
            else {
                //if criteria posting unsuccessful
                onFail();
            }
        },

        catchCallback: (err) => {

            //criteria posting error
            onFail();
        }
    })

}
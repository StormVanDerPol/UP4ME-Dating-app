import { DATA_STORE } from "../../stored/dataStore"
import { dodoFlight } from "../../functions/dodoAirlines"
import endpoints, { getEndpoint } from "../../res/data/endpoints"

export default loadProfile = async (userid) => {

    if (DATA_STORE.profileCache[userid] == undefined) {
        await dodoFlight({
            method: 'get',
            url: getEndpoint(endpoints.get.profile) + userid,

            thenCallback: (res) => {

                if (res.data != false) {
                    DATA_STORE.profileCache[userid] = res.data;
                }
            }
        })
    }
}
import { dodoFlight } from "../../functions/dodoAirlines";
import endpoints, { getEndpoint } from "../../res/data/endpoints";
import { DATA_STORE } from "../../stored/dataStore";


export const getLocations = async () => {
    await dodoFlight({
        method: 'get',
        url: getEndpoint(endpoints.get.bigLocationList),

        thenCallback: async (res) => {

            for (let location of res.data) {

                if (!DATA_STORE.locations[location.stad]) {
                    DATA_STORE.locations[location.stad] = {};
                }

                if (!DATA_STORE.locations[location.stad][location.stadsdeel]) {

                    DATA_STORE.locations[location.stad][location.stadsdeel] = [];
                }

                DATA_STORE.locations[location.stad][location.stadsdeel].push(
                    {
                        resid: location.resid,
                        name: location.naam,
                        address: location.straat + ' ' + location.huisnummer,
                        postalcode: location.Postcode,
                        city: location.stad,
                        photo: location.foto
                    }
                )
            }
            console.log(DATA_STORE.locations)
        }
    })
}
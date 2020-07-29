import React from 'react';
import LoadingScreen from '../loading/LoadingScreen';
import { dodoFlight } from '../../functions/dodoAirlines';
import endpoints, { getEndpoint } from '../../res/data/endpoints';
import { DATA_STORE } from '../../stored/dataStore';
import { navigationProxy } from '../../navigation/navigationProxy';


export const deRetardifyCriteria = (data) => {
    return {
        sport: data.sporten,
        party: data.feesten,
        smoking: data.roken,
        alcohol: data.alcohol,
        politics: data.stemmen,
        work: data.uur40,
        kids: data.kids,
        kidWish: data.kidwens,
        food: data.eten,

        ages: [data.leeftijdmin, data.leeftijdmax],
        heights: [data.minlengte, data.maxlengte],
        distance: data.afstand,

        gender: data.geslacht,
    }
}

const LoadCriteria = () => {

    const tasks = [
        {
            name: 'getting criteria',
            exec: async () => {
                await dodoFlight({
                    method: 'get',
                    url: getEndpoint(endpoints.get.criteria) + DATA_STORE.userID,

                    thenCallback: (res) => {
                        DATA_STORE.userCriteria = deRetardifyCriteria(res.data[0]);
                    }
                })
            }
        },
        {
            name: 'redirect to edit criteria',
            exec: () => {
                navigationProxy.reset({
                    index: 1,
                    routes: [
                        {
                            name: 'Home',
                            params: {},
                        },
                        {
                            name: 'EditCriteria',
                            params: {},
                        },
                    ]
                });
            }
        },
    ]

    return (
        <LoadingScreen tasks={tasks} />
    );
}

export default LoadCriteria;
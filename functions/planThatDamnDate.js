import { DATA_STORE } from "../stored/dataStore";
import { navigationProxy } from "../navigation/navigationProxy";

export const planThatDamnDate = (params = {}, keepResID = false) => {

    if (!keepResID) {
        DATA_STORE.currentResID = null;
    }

    console.log('BRUHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH');

    DATA_STORE.plannedDate = {
        userid: null,
        time: null,
        date: null,
        locationData: null,
    };

    navigationProxy.reset({
        index: 1,
        routes: [
            {
                name: 'Home',
                params: {},
            },
            {
                name: 'LoadPlanDate',
                params: params,
            },
        ],
    });
}
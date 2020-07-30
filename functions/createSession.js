import { DATA_STORE } from "../stored/dataStore";
import { getUIDFromToken } from "./getUID";
import { storeData } from "../stored/handleData";

export const createSession = (token) => {
    DATA_STORE.userToken = token
    DATA_STORE.userID = getUIDFromToken(token);

    storeData('userToken', DATA_STORE.userToken);
    storeData('userID', DATA_STORE.userID);
}
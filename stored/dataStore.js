export const DATA_STORE = {

    userToken: null,
    userID: null,
    userCriteria: null,

    settings: {
        notification: {
            newMatch: null,
            newDate: null,
            newChange: null,
        }
    },

    profileCache: {},

    locations: {},

    matches: {},

    dates: {},

    plannedDate: {
        userid: null,
        time: null,
        date: null,
        locationData: null,
    },

    currentResID: null,

    pMatches: {
        list: null,
        timeStamp: null,
    },

    registData: {
        email: null,
    }
}
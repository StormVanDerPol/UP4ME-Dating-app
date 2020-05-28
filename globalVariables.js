//Actual global variables because apparently nodejs has a global scope
global.gpsData = {
    lat: null, lon: null
};

global.sessionUserId = null;

global.sessionUserData = {
    fetched: false,
};

global.storedProfiles = {

}

global.registData = {
    email: null,
    confirmationCode: null,

    day: null,
    month: null,
    year: null,
    bday: null,

    name: null,
    job: null,
    height: null,
    gender: null,

    placeName: null,
    profileDescription: null,
    profilePictures: null,

    userProperties: null,

    userCriteria: null,

    minheight: null,
    maxheight: null,
    minage: null,
    maxage: null,
    prefGender: null,
    distance: null,
};


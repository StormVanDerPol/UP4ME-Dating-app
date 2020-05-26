import { calcAgeHet, getDistBetweenCoords } from "../../globals";
import { userPropStringSelector } from "./MatchScreenUserPropStringSelector";

export function feedProfileData(data) {

    let userData = {
        profilePictures: [],
    };

    let imagesToCheck = [
        data.foto1,
        data.foto2,
        data.foto3,
        data.foto4,
        data.foto5,
        data.foto6,
    ];

    for (let image of imagesToCheck) {

        if (image) {
            userData.profilePictures.push(image);
        }
    }

    let userProps = {
        sport: data.sporten,
        party: data.feesten,
        smoking: data.roken,
        alcohol: data.alcohol,
        politics: data.stemmen,
        work: data.uur40,
        kids: data.kids,
        kidWish: data.kidwens
    }

    userData = {
        ...userData,
        name: data.naam,
        placeName: data.zoektin,
        job: data.beroep,
        height: data.lengte / 100,
        desc: data.profieltext,
        age: calcAgeHet(data.geboortedatum),
        dist: Math.round(
            getDistBetweenCoords(
                global.gpsData.lat,
                global.gpsData.lon,
                data.latitude,
                data.longitude,
                'K')
        ),
        userPropertiesDesc: userPropStringSelector(userProps),
    }

    return userData;

}
import Axios from "axios";
import { endpointGetProfile } from "../../endpoints";
import { calcAgeHet } from "../../globals";
import { userPropStringSelector } from "../matching/MatchScreenUserPropStringSelector";

export async function getUserData(userid) {

    let userData = {};

    await Axios.get(
        `${endpointGetProfile}${userid}`
    )
        .then((res) => {

            let fetchedData = {
                profilePictures: [],
            };

            let fetchedImages = [
                res.data.foto1,
                res.data.foto2,
                res.data.foto3,
                res.data.foto4,
                res.data.foto5,
                res.data.foto6,
            ];

            for (let image of fetchedImages) {

                if (image) {
                    fetchedData.profilePictures.push(image);
                }
            };

            let fetchedUserProps = {
                sport: res.data.sporten,
                party: res.data.feesten,
                smoking: res.data.roken,
                alcohol: res.data.alcohol,
                politics: res.data.stemmen,
                work: res.data.uur40,
                kids: res.data.kids,
                kidWish: res.data.kidwens
            };

            fetchedData = {
                ...fetchedData,

                name: res.data.naam,
                placeName: res.data.zoektin,
                height: res.data.lengte / 100,
                job: res.data.beroep,
                desc: res.data.profieltext,
                age: calcAgeHet(res.data.geboortedatum),
                dist: Math.round(
                    Math.random() * 100
                ),
                userProperties: fetchedUserProps,
                userPropertiesDesc: userPropStringSelector(fetchedUserProps),
            }

            userData = { ...fetchedData };

            console.log(userData);
        })
        .catch((err) => {
            if (debugMode.networkRequests) {
                console.log('Network Error', err)
            }
        })
        .finally(() => {

            global.sessionUserData = {
                ...global.sessionUserData,
                ...userData,
                fetched: true,
            }
        })

    return userData;
}
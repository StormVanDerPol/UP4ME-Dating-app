import { postPhotos } from "./postPhotos";
import { createProfilePicture } from "../components/bigComponents/UploadPictures";
import { DATA_STORE } from "../stored/dataStore";
import { dodoFlight } from "../functions/dodoAirlines";
import endpoints, { getEndpoint } from "../res/data/endpoints";

export default postProfileEdits = async ({
    oldData,
    newData,
    onSuccess = () => { },
    onFail = () => { },
}) => {

    const _oldData = JSON.stringify(oldData);
    const _newData = JSON.stringify(newData);

    if (_oldData != _newData) {

        let profilePicture = newData.profilePicture;

        if (!profilePicture) {
            profilePicture = await createProfilePicture(newData.images[0]);
        }

        await postPhotos(
            DATA_STORE.userID,
            newData.images,
            profilePicture,
            async () => {

                await dodoFlight({
                    method: 'post',
                    url: getEndpoint(endpoints.post.setProfileText),
                    data: {
                        userid: DATA_STORE.userID,
                        profiletext: newData.desc,
                    },

                    thenCallback: async (res) => {

                        if (res.data === true) {

                            DATA_STORE.profileCache[DATA_STORE.userID].profieltext = newData.desc;

                            const newProps = {
                                userid: DATA_STORE.userID,
                                sport: newData.userProps.sport,
                                feesten: newData.userProps.party,
                                roken: newData.userProps.smoking,
                                alcohol: newData.userProps.alcohol,
                                stemmen: newData.userProps.politics,
                                werken: newData.userProps.work,
                                kinderen: newData.userProps.kids,
                                kinderwens: newData.userProps.kidWish,
                                eten: newData.userProps.food,
                            };

                            await dodoFlight({
                                method: 'post',
                                url: getEndpoint(endpoints.post.setProperties),
                                data: newProps,

                                thenCallback: async (res) => {

                                    if (res.data) {

                                        DATA_STORE.profileCache[DATA_STORE.userID].sporten = newProps.sport;
                                        DATA_STORE.profileCache[DATA_STORE.userID].feesten = newProps.feesten;
                                        DATA_STORE.profileCache[DATA_STORE.userID].roken = newProps.roken;
                                        DATA_STORE.profileCache[DATA_STORE.userID].alcohol = newProps.alcohol;
                                        DATA_STORE.profileCache[DATA_STORE.userID].stemmen = newProps.stemmen;
                                        DATA_STORE.profileCache[DATA_STORE.userID].uur40 = newProps.werken;
                                        DATA_STORE.profileCache[DATA_STORE.userID].kids = newProps.kinderen;
                                        DATA_STORE.profileCache[DATA_STORE.userID].kidwens = newProps.kinderwens;
                                        DATA_STORE.profileCache[DATA_STORE.userID].eten = newProps.eten;


                                        await dodoFlight({
                                            method: 'post',
                                            url: getEndpoint(endpoints.post.setLastEdit),
                                            data: {
                                                userid: DATA_STORE.userID,
                                            },

                                            thenCallback: (res) => {
                                                if (res.data)
                                                    onSuccess();
                                            }
                                        })

                                    }
                                },

                                catchCallback: (err) => {
                                    onFail();
                                }
                            })
                        }
                    },

                    catchCallback: (err) => {
                        onFail();
                    },
                })
            },
            () => {
                onFail();
            },
        )
    }
    else {
        onSuccess();
    }
}
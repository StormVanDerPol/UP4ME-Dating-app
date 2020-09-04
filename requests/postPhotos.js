import { dodoFlight } from "../functions/dodoAirlines";
import endpoints, { getEndpoint } from "../res/data/endpoints";
import { DATA_STORE } from "../stored/dataStore";

export const postPhotos = async (
    userid,
    images,
    profilePicture,
    onSuccess = () => { },
    onFail = () => { },
) => {

    let newImages = [];

    for (let image of images) {
        if (image != '') {
            newImages.push(image)
        }
    }

    while (newImages.length != 6) {
        newImages.push('NULL');
    }

    await dodoFlight({
        url: getEndpoint(endpoints.post.setPhotos),
        method: 'post',
        data: {
            userid: userid,
            photo1: newImages[0],
            photo2: newImages[1],
            photo3: newImages[2],
            photo4: newImages[3],
            photo5: newImages[4],
            photo6: newImages[5],
        },

        thenCallback: async (res) => {
            await dodoFlight({
                url: getEndpoint(endpoints.post.setProfilePicture),
                method: 'post',
                data: {
                    userid: userid,
                    profpic: profilePicture,
                },

                thenCallback: (res) => {

                    if (res.data === true) {

                        if (DATA_STORE.profileCache[userid]) {
                            DATA_STORE.profileCache[userid].foto1 = newImages[0];
                            DATA_STORE.profileCache[userid].foto2 = newImages[1];
                            DATA_STORE.profileCache[userid].foto3 = newImages[2];
                            DATA_STORE.profileCache[userid].foto4 = newImages[3];
                            DATA_STORE.profileCache[userid].foto5 = newImages[4];
                            DATA_STORE.profileCache[userid].foto6 = newImages[5];
                        }

                        onSuccess();
                    }
                    else {

                        onFail();
                    }
                },

                catchCallback: (err) => {
                    onFail();
                }
            })
        },

        catchCallback: (err) => {
            onFail();
        }
    }
    )
}
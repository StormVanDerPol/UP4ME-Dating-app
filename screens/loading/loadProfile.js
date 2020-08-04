import { DATA_STORE } from "../../stored/dataStore"
import { dodoFlight } from "../../functions/dodoAirlines"
import endpoints, { getEndpoint } from "../../res/data/endpoints"
import { getJSONData, setJSONData, getData, storeData } from "../../stored/handleData";


export default loadProfile = async (userid) => {

    //console.log('1: start loadprofile');

    let data;

    //Get lastedit info
    let lastedit = await dodoFlight({
        method: 'post',
        url: getEndpoint(endpoints.post.getLastEdit),
        data: {
            userid: userid,
        },
    });

    //console.log('2: tried to get lastedit info');

    //if the above is present
    if (lastedit) {

        //console.log('3: seems last edit is present...', lastedit);

        //get the local timestamp
        let localStamp = await getData(`lets_${lastedit.uuid}`);

        //console.log('4: tried to get local timestamp', localStamp);

        //if we get a local timestamp...
        if (localStamp) {

            //console.log('5: seems local timestamp is present... Comparing them.', (localStamp == lastedit.stamp) ? 'Seems timestamps match up' : 'Seems like timestamps are different');

            //...compare it to the one from the API
            if (localStamp == lastedit.stamp) {

                //Should they match up, load locally.
                data = await getJSONData(`up_${lastedit.uuid}`);
                await storeData(`lets_${lastedit.uuid}`, lastedit.stamp + '');

                //console.log('6: loaded profile locally! quitting...', data);

                //And lastly store it in a place we can access it.
                DATA_STORE.profileCache[userid] = data;
                return;
            }
        } else {
            //console.log('5: seems like local timestamp is NOT present');
        }
        //Case we didn't get a timestamp, we'd do well to set it so that we don't have to load this profile unless it changes.
    } else {

        //console.log('3: seems last edit is NOT present...');

        //set it on the backend
        await dodoFlight({
            method: 'post',
            url: getEndpoint(endpoints.post.setLastEdit),
            data: {
                userid: userid,
            },
        });

        //console.log('4: tried to set a new lastEdit on the backend');

        //get our newly genereated UUID and stamp
        let newLastedit = await dodoFlight({
            method: 'post',
            url: getEndpoint(endpoints.post.getLastEdit),
            data: {
                userid: userid,
            },
        });

        //console.log('5: tried fetching newly generated UUID and stamp', newLastedit);

        //save it locally
        await storeData(`lets_${newLastedit.uuid}`, newLastedit.stamp + '');

        //console.log('6: saving stamp locally');

        //Finally we can try loading the profile from the API.
        data = await dodoFlight({
            method: 'get',
            url: getEndpoint(endpoints.get.profile) + userid,
        });

        //console.log('7: loaded profile from the API, saving and quitting...', data);

        //and ofcourse save it.
        await setJSONData(`up_${newLastedit.uuid}`, data);

        //And lastly store it in a place we can access it.
        DATA_STORE.profileCache[userid] = data;
        return;
    }

    //Case we didn't load locally OR load from the API whilst lastedit was missing, and consequently quit loadProfile, we can assume we need to load from API.
    data = await dodoFlight({
        method: 'get',
        url: getEndpoint(endpoints.get.profile) + userid,
    });

    //console.log('6: loaded profile from the API, saving and quitting...', data);

    //and ofcourse save it.
    await setJSONData(`up_${lastedit.uuid}`, data);
    await storeData(`lets_${lastedit.uuid}`, lastedit.stamp + '');

    //And lastly store it in a place we can access it.
    DATA_STORE.profileCache[userid] = data;
}
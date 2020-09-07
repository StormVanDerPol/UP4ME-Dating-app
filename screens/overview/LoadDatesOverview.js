import React from 'react';
import { dodoFlight } from '../../functions/dodoAirlines';
import endpoints, { getEndpoint } from '../../res/data/endpoints';
import { timeouts } from '../../res/data/requests';
import { DATA_STORE } from '../../stored/dataStore';
import { navigationProxy } from '../../navigation/navigationProxy';
import LoadingScreen from '../loading/LoadingScreen';

const LoadDatesOverview = () => {

    const tasks = [
        {
            name: 'getting dates',
            exec: async () => {
                await dodoFlight({
                    method: 'get',
                    url: getEndpoint(endpoints.get.dates) + DATA_STORE.userID,
                    timeout: timeouts.short,

                    thenCallback: (res) => {
                        // DATA_STORE.dates = res.data;

                        if (res.data) {

                            let unorderedDates = res.data;
                            let orderedDates = [];

                            while (unorderedDates.length != 0) {

                                let dateToPush = {
                                    stamp: 0,
                                };

                                let index = 0;
                                let indexToSplice = 0;

                                for (let date of unorderedDates) {

                                    // console.log(date);

                                    // console.log('new stamp', date.stamp, 'old stamp', dateToPush.stamp)

                                    if (date.stamp > dateToPush.stamp) {
                                        dateToPush = date;
                                        indexToSplice = index;
                                    }

                                    index++;
                                }

                                orderedDates.push(dateToPush);
                                unorderedDates.splice(indexToSplice, 1);
                            }
                            DATA_STORE.dates = orderedDates;
                        } else {
                            DATA_STORE.dates = [];
                        }

                        console.log(DATA_STORE.dates);



                    }
                });
            }
        },
        {
            name: 'redirecting',
            exec: () => {
                // navigationProxy.navigate('DatesOverview');
                navigationProxy.reset({
                    index: 1,
                    routes: [
                        {
                            name: 'Home',
                            params: {},
                        },
                        {
                            name: 'DatesOverview',
                            params: {},
                        }
                    ]
                })
            }
        }

    ]

    return (
        <LoadingScreen tasks={tasks} />
    );
}

export default LoadDatesOverview;
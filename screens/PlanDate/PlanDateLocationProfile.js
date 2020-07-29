import React, { useState, useEffect } from 'react';
import { dodoFlight } from '../../functions/dodoAirlines';
import endpoints, { getEndpoint } from '../../res/data/endpoints';
import Body, { FlexSection } from '../../components/Body';
import { ArrowButtonTop } from '../../components/UpForMeArrowButtons';
import { navigationProxy } from '../../navigation/navigationProxy';
import LocationProfile from '../../components/bigComponents/LocationProfile';
import AlbeitABitLate from '../../components/bigComponents/AlbeitABitLate';
import { DATA_STORE } from '../../stored/dataStore';

const PlanDateLocationProfile = ({ route }) => {

    const [data, setData] = useState(null);

    useEffect(() => {
        dodoFlight({
            method: 'get',
            url: getEndpoint(endpoints.get.resProfile) + route.params.resid,

            thenCallback: (res) => {
                setData(res.data[0]);
            }
        })
    }, []);


    return (
        <Body>
            <FlexSection>
                <ArrowButtonTop
                    header={'Date plannen'} onPress={() => {
                        navigationProxy.reset({
                            index: 1,
                            routes: [
                                {
                                    name: 'Home',
                                    params: {},
                                },
                                {
                                    name: 'MatchOverview',
                                    params: {},
                                }

                            ]
                        })
                    }} />

                {(data != null) ? <LocationProfile data={data} /> : <></>}
            </FlexSection>

            <AlbeitABitLate title={'Selecteer locatie'} onPress={
                () => {
                    DATA_STORE.plannedDate.locationData = data;
                    navigationProxy.reset({
                        index: 2,
                        routes: [
                            {
                                name: 'Home',
                                params: {},
                            },
                            {
                                name: 'MatchOverview',
                                params: {},
                            },
                            {
                                name: 'PlanDate',
                                params: {
                                    userid: DATA_STORE.plannedDate.userid,
                                },
                            }
                        ]
                    })
                }} />

        </Body>
    );
}

export default PlanDateLocationProfile;
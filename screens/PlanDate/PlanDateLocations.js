import React from 'react';
import Body from '../../components/Body';
import NavBar, { nbroutes } from '../../components/navBar/NavBar';
import { ArrowButtonTop } from '../../components/UpForMeArrowButtons';
import { navigationProxy } from '../../navigation/navigationProxy';
import BigLocationList from '../../components/bigComponents/BigLocationList';

const PlanDateLocations = () => {
    return (
        <Body>
            <NavBar route={nbroutes.matches} />
            <ArrowButtonTop
                end={false}
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
            <BigLocationList
                heightSubtract={50}
                onPressItem={(resid) => {
                    navigationProxy.navigate('PlanDateLocationProfile', {
                        resid,
                    })
                }} />
        </Body>
    );
}

export default PlanDateLocations;
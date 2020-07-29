import React from 'react';
import BigLocationList from '../../components/bigComponents/BigLocationList';
import Body from '../../components/Body';
import NavBar, { nbroutes } from '../../components/navBar/NavBar';
import { navigationProxy } from '../../navigation/navigationProxy';

const ViewLocations = () => {
    return (
        <Body>
            <NavBar route={nbroutes.locations} />
            <BigLocationList onPressItem={(resid) => {
                navigationProxy.navigate('ViewLocationProfile', {
                    resid,
                })
            }} />
        </Body>
    );
}

export default ViewLocations;
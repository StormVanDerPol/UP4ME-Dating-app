import React from 'react';
import BigLocationList from '../../components/bigComponents/BigLocationList';
import Body, { FlexSection } from '../../components/Body';
import NavBar, { nbroutes } from '../../components/navBar/NavBar';

const ViewLocations = () => {
    return (
        <Body>
            <NavBar route={nbroutes.locations} />
            <FlexSection>
                <BigLocationList />
            </FlexSection>
        </Body>
    );
}

export default ViewLocations;
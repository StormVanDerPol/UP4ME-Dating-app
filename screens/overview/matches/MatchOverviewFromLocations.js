import React from 'react';
import Body, { FlexSection } from '../../../components/Body';
import NavBar, { nbroutes } from '../../../components/navBar/NavBar';
import { MatchItem } from './MatchOverview';
import { DATA_STORE } from '../../../stored/dataStore';

const MatchOverviewFromLocations = () => {
    return (
        <Body>
            <NavBar route={nbroutes.matches} />
            <FlexSection>
                {
                    DATA_STORE.matches.map((match, i) => {
                        return <MatchItem goToPlan={true} key={i} start={(i == 0) ? true : false} data={match} />
                    })
                }

            </FlexSection>
        </Body>
    );
}

export default MatchOverviewFromLocations;
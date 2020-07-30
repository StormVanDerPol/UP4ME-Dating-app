import React from 'react';
import Body from '../../components/Body';
import NavBar, { nbroutes } from '../../components/navBar/NavBar';
import DatePlanner from './DatePlanner';

const PlanDate = ({ route }) => {

    const userid = route.params.userid;

    var resData = null;

    if (route.params.resData) {
        resData = route.params.resData[0];
    }

    return (
        <Body>
            <NavBar route={nbroutes.matches} />
            <DatePlanner userid={userid} _resData={resData} />
        </Body>
    );
}

export default PlanDate;
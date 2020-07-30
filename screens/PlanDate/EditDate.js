import React from 'react';
import Body from '../../components/Body';
import NavBar, { nbroutes } from '../../components/navBar/NavBar';
import DatePlanner from './DatePlanner';
import { DATA_STORE } from '../../stored/dataStore';

const EditDate = ({ route }) => {

    const canEdit = route.params.canEdit;

    return (
        <Body>
            <NavBar route={nbroutes.matches} />
            <DatePlanner userid={DATA_STORE.plannedDate.userid} _resData={DATA_STORE.plannedDate.locationData} editing={true} canEditLocation={canEdit} />
        </Body>
    );
}

export default EditDate;
import React from 'react';

import {
    StyleSheet,
} from 'react-native'
import Filters from '../registration/filter';
import Nav from '../nav';

const EditFilters = ({ route, navigation }) => {

    return (
        <>
            <Nav currentSection={'Filter'} />

            <Filters />
        </>
    );
}

const s = StyleSheet.create({

});

export default EditFilters;
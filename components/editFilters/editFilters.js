import React from 'react';

import {
    StyleSheet,
} from 'react-native'
import Filters from '../registration/filter';
import Nav from '../nav';
import { ScrollView } from 'react-native-gesture-handler';

const EditFilters = ({ route, navigation }) => {

    return (
        <>
            <ScrollView>
                <Nav currentSection={'Filter'} />

                <Filters />
            </ScrollView>
        </>
    );
}

const s = StyleSheet.create({

});

export default EditFilters;
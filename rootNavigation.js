import React from 'react';
import { StackActions, CommonActions } from '@react-navigation/native';

export const navigationRef = React.createRef();

export const rootNavigation = {
    navigate(name, params) {
        navigationRef.current?.navigate(name, params);
    },

    push(...args) {
        navigationRef.current?.dispatch(StackActions.push(...args));
    },

    goBack() {
        navigationRef.current?.goBack();
    },

    reset() {
        navigationRef.current?.dispatch(
            CommonActions.reset(...args)
        );
    },
}
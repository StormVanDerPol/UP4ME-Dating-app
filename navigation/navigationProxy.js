import React from 'react';
import { StackActions, CommonActions } from '@react-navigation/native';

export const navigationContainerRef = React.createRef();

export const navigationProxy = {
    navigate(name, params) {
        navigationContainerRef.current?.navigate(name, params);
    },

    push(...args) {
        navigationContainerRef.current?.dispatch(StackActions.push(...args));
    },

    goBack() {
        navigationContainerRef.current?.goBack();
    },

    reset(...args) {
        navigationContainerRef.current?.dispatch(
            CommonActions.reset(...args)
        );
    },
}
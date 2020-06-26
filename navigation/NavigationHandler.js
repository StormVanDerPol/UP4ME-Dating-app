import 'react-native-gesture-handler';

import React from 'react';

import { devMode } from '../dev/devConfig';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationContainerRef } from './navigationProxy';

import appRoutes from './navigationRoutes';

const Stack = createStackNavigator();

export default NavigationHandler = () => {
    return (
        <>

            <NavigationContainer ref={navigationContainerRef}>
                <Stack.Navigator screenOptions={{ headerShown: false }} >

                    {appRoutes.map((route, i) => {

                        if (!route.options) {
                            route.options = {};
                        }

                        return (
                            <Stack.Screen
                                key={i}
                                name={route.name}
                                component={route.component}
                                options={route.options}
                            />
                        )
                    })}

                </Stack.Navigator>
            </NavigationContainer>

        </>
    );
}
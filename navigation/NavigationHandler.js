import 'react-native-gesture-handler';

import React from 'react';

import { devMode } from '../dev/devConfig';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationContainerRef } from './navigationProxy';

import DevRouter from '../dev/DevRouter';
import DevSandbox from '../dev/DevSandbox';
import Landing from '../screens/Landing/Landing';
import LocalStratEmail from '../screens/authentication/LocalStratEmail/LocalStratEmail';

const Stack = createStackNavigator();

//Add new routes here
var routes = [
    {
        name: 'Landing',
        component: Landing,
    },
    {
        name: 'LocalStratEmail',
        component: LocalStratEmail,
    }
];

if (devMode.enabled) {
    routes.unshift(
        {
            name: 'DevRouter',
            component: DevRouter,
        },
        {
            name: 'DevSandbox',
            component: DevSandbox,
        },
    )
}

export const exportedRoutes = routes;


export default NavigationHandler = () => {
    return (
        <>

            <NavigationContainer ref={navigationContainerRef}>
                <Stack.Navigator screenOptions={{ headerShown: false }} >

                    {routes.map((route, i) => {

                        if (!route.options) {
                            route.options = {};
                        }

                        return (
                            <Stack.Screen
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
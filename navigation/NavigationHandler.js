import 'react-native-gesture-handler';

import React, { useEffect, useRef } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationContainerRef } from './navigationProxy';

import appRoutes from './navigationRoutes';
import { BackHandler, ToastAndroid, Platform } from 'react-native';

const Stack = createStackNavigator();

export default NavigationHandler = () => {

    const warningGiven = useRef(false);

    useEffect(() => {
        const backhandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {

                console.log(navigationContainerRef);
                if (navigationContainerRef.current.canGoBack()) {
                    //Goes back normally, resets warning
                    warningGiven.current = false;
                    return false;
                }
                else if (warningGiven.current) {
                    //Boots you out of the app
                    return false;
                }
                else {
                    //Allows you to misspress once
                    warningGiven.current = true;

                    if (Platform.OS === 'android') {
                        ToastAndroid.showWithGravityAndOffset(
                            'Press exit again...',
                            1000,
                            ToastAndroid.BOTTOM,
                            0,
                            10,
                        )
                    }

                    setTimeout(() => {
                        warningGiven.current = false;
                    }, 1000)
                    return true;
                }
            }
        );
        return () => backhandler.remove();
    }, [])

    return (
        <>
            <NavigationContainer

                linking={{
                    prefixes: [`app://up4me/`, `up4me://`],
                    config: {
                        screens: {
                            Callback: 'Callback',
                        }
                    }
                }}
                ref={navigationContainerRef}>
                <Stack.Navigator

                    // initialRouteName={'StartUp'}
                    screenOptions={{ headerShown: false, }} >

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
                                initialParams={route.params}
                            />
                        )
                    })}

                </Stack.Navigator>
            </NavigationContainer>

        </>
    );
}
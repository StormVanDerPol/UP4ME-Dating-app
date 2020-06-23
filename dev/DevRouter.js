import React from 'react';
import { Button } from 'react-native';

import { exportedRoutes as routes } from '../navigation/NavigationHandler';
import { navigationProxy } from '../navigation/navigationProxy';

export default DevRouter = () => {
    return (
        <>
            {routes.map((route, i) => {
                return (
                    <Button
                        title={route.name}
                        onPress={() => {
                            navigationProxy.navigate(route.name)
                        }}
                        key={i}
                    />
                )
            })}
        </>
    );
}
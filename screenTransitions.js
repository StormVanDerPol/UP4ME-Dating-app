const horizontalConfig = {
    animation: 'spring',
    config: {
        stiffness: 1000,
        damping: 100,
        mass: 1,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
    }
}

export const screenTransitions = {

    fromLeft: {
        gestureDirection: 'horizontal',
        transitionSpec: {
            open: horizontalConfig,
            close: horizontalConfig,
        },
        cardStyleInterpolator: ({ current, next, layouts }) => {
            return {
                cardStyle: {
                    transform: [
                        {
                            translateX: current.progress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [layouts.screen.width, 0],
                            }),
                        },
                    ],
                }
            }
        }
    },

    fromRight: {
        gestureDirection: 'horizontal',
        transitionSpec: {
            open: horizontalConfig,
            close: horizontalConfig,
        },
        cardStyleInterpolator: ({ current, next, layouts }) => {
            return {
                cardStyle: {
                    transform: [
                        {
                            translateX: current.progress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [-layouts.screen.width, 0],
                            }),
                        },
                    ],
                }
            }
        }
    }
    //end screenTransitions
}
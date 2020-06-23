app.js - app root.

dev/
    -DevConfig - enables or disables certain parts used only in development.
    screens/
        -DevRouter - quick access to all screens.
        -DevSandbox - screen where 3rd party functionality is tested.

navigation/
    - NavigationHandler.js - Handles navigating between screens. To add more screens add { name, component } to 'routes' array.
    - navigationProxy - proxy for the NavigationHandler's NavigationContainer's methods.



usefull docs:

https://github.com/ivpusic/react-native-image-crop-picker
https://github.com/react-native-community/react-native-linear-gradient
https://reactnavigation.org/docs/navigating-without-navigation-prop/
https://github.com/ptomasroos/react-native-multi-slider
https://github.com/DylanVann/react-native-fast-image
https://github.com/react-native-community/react-native-geolocation
https://github.com/react-native-community/async-storage
https://github.com/archriss/react-native-snap-carousel
https://github.com/StormVanDerPol/ReactNativeWheelPicker


##run npx patch-package if wheel picker gives you issues.


some old notes:

https://react-svgr.com/playground/?expandProps=none&native=true
^converting svg to a jsx expression

node_modules/react-native-wheel-picker-android/src/DatePicker.android.js > DatePicker > onDaySelected

this.props is missing 'format' property.
...also wheelpicker.anrdoid.js has a set width, set to '100%' to fix, this library is jank
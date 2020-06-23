- **app.js** - app root.

- **dev/**

    - **devConfig.js** - enables or disables certain parts used only in development.

    - **DevRouter.js** - quick access to all screens.

    - **DevSandbox.js** - screen where 3rd party functionality is tested.

- **navigation/**

    - **NavigationHandler.js** - Handles navigating between screens. To add more screens add {name, component } to 'routes' array.

    - **navigationProxy** - proxy for the NavigationHandler's NavigationContainer's methods.


- **components/**

    - **TextQuicksand.js** - Text component with quicksand as default font, type prop takes a string e.g. 'Bold' to switch around.

    - **UpForMeButton.js** - The beeg ass button

    - **UpForMeMOdal.js** - THe modal meme component

    - **UpForMeSliders.js** - Double and Single slider (not yet made)


- **screens/**

    - **Landing**

        - **Landing.js** - Screen you see when first opening the app

    - **Authentication**

        - **LocalStratEmail**

            - **LocalStratEmail.js** - Screen where you input your email address when logging in and registering.

        - **ConfirmationCode**

            - **ConfirmationCode.js** - Input confirmation code.
    
    - **RegistUserData**
        
        - **RegistUserData.js** - screen where you input name, job, height and age.
        

- **res/**

    - **data/**

        - **colours.js** - all the hexes in the project.

        - **dimensions.js** - a const ref to Dimensions.get("screen")


- **assets/**

    - **fonts/**

        - **.tff fonts** - to add fonts put .tff files in this folder and subsequently run npx react-native link

- **patches/**

    - **.patch files** - We patched wheel-picker since it's great but broken.


### usefull docs:

- https://github.com/ivpusic/react-native-image-crop-picker

- https://github.com/react-native-community/react-native-linear-gradient

- https://reactnavigation.org/docs/navigating-without-navigation-prop/

- https://github.com/ptomasroos/react-native-multi-slider

- https://github.com/DylanVann/react-native-fast-image

- https://github.com/react-native-community/react-native-geolocation

- https://github.com/react-native-community/async-storage

- https://github.com/archriss/react-native-snap-carousel

- https://github.com/StormVanDerPol/ReactNativeWheelPicker

- https://www.npmjs.com/package/react-native-inappbrowser-reborn

- https://www.npmjs.com/package/react-native-axios

- https://github.com/wix/react-native-calendars


### run npx patch-package if wheel picker gives you issues.

### planning
https://drive.google.com/file/d/1mNv0ifk3uobZADvSvkAWRvxtuwzlQ7Ef/view?usp=sharing

### converting svg to a jsx expression
https://react-svgr.com/playground/?expandProps=none&native=true
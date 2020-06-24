- **app.js** - app root.

- **dev/**

    - **devConfig.js** - enables or disables certain parts used only in development.

    - **DevRouter.js** - quick access to all screens.

    - **DevSandbox.js** - screen where 3rd party functionality is tested and memes are made.

- **navigation/**

    - **NavigationHandler.js** - Handles navigating between screens. To add more screens add {name, component } to 'routes' array.

    - **navigationProxy** - proxy for the NavigationHandler's NavigationContainer's methods.


- **components/**

    - **TextQuicksand.js** - Text component with quicksand as default font, type prop takes a string e.g. 'Bold' to switch around.

    - **UpForMeButton.js** - The beeg ass button

    - **UpForMeMOdal.js** - THe modal meme component

    - **UpForMeSliders.js** - Double and Single slider (not yet made)

    - **UpForMeIcon.js** - a wrapper for a react-native-svg component, includes a list **iconIndex** containing all rnsvg conversions.

    - **AuthButton.js** - a sign in button with layouts for different providers

    - **StaticScreenWrapper.js** - wakarimasen

    - **KeyboardDismiss.js** - put at the root of a screen to hide input keyboard when tapping anywhere on the screen.

- **functions/**

    - **bowser.js** - call the in app web browser

    - **dimensions.js** - get the devices' dimensions regardless of OS.


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

- **stored**

    - **dataStore.js** - contains cache object and a method to change it. 
        

- **res/**

    - **data/**

        - **colours.js** - all the hexes in the project.

        <!-- - **dimensions.js** - a const ref to Dimensions.get("screen") -->

        - **regex.js** - contains some regular expressions
    
    - **icons/**

        - **rnsvg/** - react-native-svg conversions

        - **svg/** - source vector graphics

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

- https://stackoverflow.com/questions/55893268/react-constructor-like-in-functional-component

### planning
https://drive.google.com/file/d/1mNv0ifk3uobZADvSvkAWRvxtuwzlQ7Ef/view?usp=sharing

### converting svg to a jsx expression
https://react-svgr.com/playground/?expandProps=none&native=true



### help me please dad
check if safeAreaView thing does anything good for ios pls I need to nut
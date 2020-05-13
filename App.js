// import "./globalVariables";

import 'react-native-gesture-handler';

import React, { useState } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './components/authentication/login';
import Email from './components/authentication/email';
import PrivacyPolicy from './components/policy/privacyPolicy';
import CookiePolicy from './components/policy/cookiePolicy';
import Agreement from './components/policy/agreement';
import ConfirmationCode from './components/authentication/confirmationcode';
import UserData from './components/registration/userdata';
import Gender from './components/registration/gender';
import UserProps from './components/registration/userprops';
import Location from './components/registration/location';
import PhotoGuidelines from './components/policy/photoGuidelines';
import ProfileText from './components/registration/profileText';
import ProfilePictures from './components/registration/profilePictures';
import UserSettings from './components/settings/userSettings';
import MatchCatalog from './components/matching/MatchCatalog';
import Faq from './components/settings/faq';
import Nav from './components/nav';
import Filters from './components/registration/filter';
import UserProfile from './components/userprofile/userprofile';
import MatchNoMatch from './components/matching/MatchNoMatch';
import MatchScreen from './components/matching/MatchScreen';
import MatchScreenInitial from './components/matching/MatchScreenInitial';
import EditFilters from './components/editFilters/editFilters';

import { reqLocationPermission, updateGPSData } from './updategps';
import moment from 'moment';


//debug
import debugRouter from './components/debug/debugRouter';
import { debugMode } from './debugmode';

import { screenTransitions } from './screenTransitions';
import { navigationRef } from './rootNavigation';



// import { screenTransitions } from './screenTransitions';

const Stack = createStackNavigator();

const App = () => {

  const [init, setInit] = useState(false);

  let timeSinceGPSUpdate = moment();

  const updateGPSDataInMinutes = 10;
  const updateGPSDataCheckIntervalMS = 60000;

  if (!init) {

    reqLocationPermission()
      .then((granted) => {
        if (granted) {
          updateGPSData();
        }
      })

    setInterval(() => {

      let now = moment();
      let then = timeSinceGPSUpdate;

      let diff = now.diff(then, 'minutes', false);

      if (debugMode.gps)
        console.log('Time left till GPS update:', updateGPSDataInMinutes - diff, 'Minutes');

      if (diff > updateGPSDataInMinutes) {

        updateGPSData();

        timeSinceGPSUpdate = now;

      }

    }, updateGPSDataCheckIntervalMS);

    setInit(true);
  }

  function debugScreen() {
    return (debugMode.enabled) ? <Stack.Screen name="debugRouter" component={debugRouter} /> : <></>;
  }

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{ headerShown: false }} >

          {debugScreen()}

          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Email" component={Email} />
          <Stack.Screen name="ConfirmationCode" component={ConfirmationCode} />
          <Stack.Screen name="Agreement" component={Agreement} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
          <Stack.Screen name="CookiePolicy" component={CookiePolicy} />
          <Stack.Screen name="UserData" component={UserData} />
          <Stack.Screen name="Location" component={Location} />
          <Stack.Screen name="Gender" component={Gender} />
          <Stack.Screen name="ProfilePictures" component={ProfilePictures} />
          <Stack.Screen name="UserProps" component={UserProps} />
          <Stack.Screen name="PhotoGuidelines" component={PhotoGuidelines} />
          <Stack.Screen name="ProfileText" component={ProfileText} />
          <Stack.Screen name="UserSettings" component={UserSettings} />
          <Stack.Screen name="MatchCatalog" component={MatchCatalog} />

          <Stack.Screen name="MatchScreenDefault" component={MatchScreen} />

          <Stack.Screen name="MatchScreenRight" component={MatchScreen}
            options={{
              ...screenTransitions.fromRight
            }} />
          <Stack.Screen name="MatchScreenLeft" component={MatchScreen}
            options={{
              ...screenTransitions.fromLeft
            }} />

          <Stack.Screen name="MatchScreenInitial" component={MatchScreenInitial} />
          <Stack.Screen name="Filter" component={Filters} />
          <Stack.Screen name="FQA" component={Faq} />
          <Stack.Screen name="NAV" component={Nav} />
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="EditFilters" component={EditFilters} />
          <Stack.Screen name="MatchNoMatch" component={MatchNoMatch} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
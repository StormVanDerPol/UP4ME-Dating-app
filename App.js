import 'react-native-gesture-handler';

import React from 'react'

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
import ProfileText from './components/policy/profileText';
import ProfilePictures from './components/registration/profilePictures';

const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
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


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

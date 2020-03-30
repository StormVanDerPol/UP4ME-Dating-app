// import 'react-native-gesture-handler';

import React from 'react'
import { ScrollView } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

import Login from './components/authentication/login';
import Email from './components/authentication/email';
import PrivacyPolicy from './components/policy/privacyPolicy';
import CookiePolicy from './components/policy/cookiePolicy';
import Agreement from './components/policy/agreement';
import ConfirmationCode from './components/authentication/confirmationcode';
import UserData from './components/registration/userdata';
import Gender from './components/registration/gender';
import UserProps from './components/registration/userprops';

// import Location from './components/registration/location';

// const Stack = createStackNavigator();

const App = () => {

  return (
    <>
      <ScrollView>

        <Login />
        <Email></Email>
        <ConfirmationCode></ConfirmationCode>
        <PrivacyPolicy></PrivacyPolicy>

        <CookiePolicy></CookiePolicy>
        <Agreement></Agreement>

        <UserData></UserData>

        <Gender></Gender>

        <UserProps></UserProps>
      </ScrollView>
    </>



    // <NavigationContainer>
    //   <Stack.Navigator screenOptions={{ headerShown: false }}>
    //     <Stack.Screen name="Login" component={Login} />
    //     <Stack.Screen name="Email" component={Email} />
    //     <Stack.Screen name="ConfirmationCode" component={ConfirmationCode} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default App;

import React, { useEffect, useState } from 'react';

import NavigationHandler from './navigation/NavigationHandler';
import messaging from '@react-native-firebase/messaging'
import { handleMessage, requestMessagingPermission } from './functions/firebaseMessaging';
import FirebaseMessageUI from './components/FirebaseMessageUI';
import { Alert } from 'react-native';
import TextQuicksand from './components/TextQuicksand';

export default App = () => {

  const [dm, displayMessage] = useState({
    show: false,
    data: null,
  });

  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Message handled in the background', remoteMessage);
  });

  const onMountAsync = async () => {
    await requestMessagingPermission();
    messaging().onMessage(async (remoteMessage) => {
      displayMessage({
        show: true,
        data: remoteMessage,
      });
    });
  };

  useEffect(() => {
    onMountAsync();
  }, [])

  return (
    <>
      <NavigationHandler />
      {(dm.show) ? <FirebaseMessageUI
        // top={true}
        data={dm.data}
        onDismount={() => {
          displayMessage({
            show: false,
            data: null,
          });
        }} /> : null}
    </>
  );
}
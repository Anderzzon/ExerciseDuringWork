import React, { useRef } from 'react';

import AuthNavigation from './App/navigation/AuthNavigation';
import AuthContextProvider from './App/context/AuthContext';
import * as Notifications from 'expo-notifications';
import { useState } from 'react';
import * as RootNavigation from './App/navigation/RootNavigation';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  React.useEffect(() => {
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (not) => {
        setNotification(not);
        console.log('Received in Foreground');
      }
    );
    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        let data = response.notification.request.content.data;
        if (data.exercise) {
          RootNavigation.navigate('Detail', {
            item: {
              name: data.name,
              id: data.exercise,
            },
          });
        }
      }
    );
    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    <AuthContextProvider>
      <AuthNavigation />
    </AuthContextProvider>
  );
}

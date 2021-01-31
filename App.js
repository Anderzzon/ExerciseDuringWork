import React, { useContext, useEffect, useRef } from "react";

import AuthNavigation from './App/navigation/AuthNavigation';
import AuthContextProvider from './App/context/AuthContext';
import * as Notifications from 'expo-notifications';
import { useState } from "react";

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

  // React.useEffect(() => {

  //   // This listener is fired whenever a notification is received while the app is foregrounded
  //   notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
  //     setNotification(notification);
  //     console.log("Received in Foreground")
  //   });
  
  //   // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  //     console.log("!!!Received response:", response);
  //     let data = response.notification.request.content.data
  //     console.log("Exercise ID: ", data)
  //     if (data.exercise) {
  //       console.log(id)
  //     }
  //   });
  
  //   return () => {
  //     Notifications.removeNotificationSubscription(notificationListener);
  //     Notifications.removeNotificationSubscription(responseListener);
  //   };
  // }, []);

  // useEffect(() => {
  //   const subscription = Notifications.addNotificationResponseReceivedListener(response => {
  //     console.log("Recived in App", response)
  //   });


  //   return () => subscription.remove();
  // }, []);
  
  return (
  <AuthContextProvider>
    <AuthNavigation/>
    </AuthContextProvider>
  );
}


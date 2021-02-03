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
  

  // const createTwoButtonAlert = (data) => {
  //   Alert.alert(
  //     "Alert Title",
  //     "My Alert Msg",
  //     [
  //       {
  //         text: "Cancel",
  //         onPress: () => console.log("Cancel Pressed"),
  //         style: "cancel"
  //       },
  //       { text: "OK", onPress: () => 
  //                   navigation.navigate('Detail', {
  //               item: {
  //                 name: data.name,
  //                 id: data.exercise
  //               }
  //             }),
  //             style: "default" 
  //       }
  //     ],
  //     { cancelable: false }
  //   )
  // }

  // useEffect(() => {
  //   // This listener is fired whenever a notification is received while the app is foregrounded
  //   notificationListener.current = Notifications.addNotificationReceivedListener(notificationData => {
  //     setNotification(notificationData);
  //     console.log("Notification:", notification)
  //     if (notification) {
  //       createTwoButtonAlert(notificationData.request.content.data)
  //       console.log("!!! Heh")
  //     } else {
  //       console.log("No notification data")
  //     }

  //   }, []);

  //   // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  //     //console.log("!!!Received response Context:", response);
  //     let data = response.notification.request.content.data
  //     //console.log("Exercise ID: ", data)
  //     if (data.exercise) {
  //       //console.log(data.exercise)
  //       navigation.navigate('Detail', {
  //         item: {
  //           name: data.name,
  //           id: data.exercise
  //         }
  //       })
  //     }
  //   }, [] );

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


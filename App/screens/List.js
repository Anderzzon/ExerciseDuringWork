import React, { useContext, useEffect, useRef } from "react";
import { FlatList, TouchableOpacity, View, Text, StyleSheet, Alert } from "react-native";
import DATA from '../data/data';
//import exercises from '../../firebaseConfig'
import { firebase } from '../../firebaseConfig'
import { useState } from "react";
import { AuthContext } from '../context/AuthContext';

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const ListItem = ({ title, id, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.listItem}    >
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const Separator = () => <View style={styles.separator} />;

export default ({ navigation }) => {

  const [entities, setEntities] = useState([])
  const db = firebase.firestore()
  const exercises = db.collection('Exercises')
  const { user } = useContext(AuthContext);

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const createTwoButtonAlert = (data) => {
  Alert.alert(
    "Alert Title",
    "My Alert Msg",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => 

                  navigation.navigate('Detail', {
              item: {
                name: data.name,
                id: data.exercise
              }
            }),
            style: "default" 
    }
    ],
    { cancelable: false }
  )
}

  useEffect(() => {
    registerForPushNotificationsAsync(user, db).then(token => setExpoPushToken(token))
  }, []);

  useEffect(() => {

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notificationData => {
      setNotification(notificationData);
      //console.log("Foreground: ", notificationData)
      if (notification) {
        createTwoButtonAlert(notificationData.request.content.data)
        console.log("!!! Heh")
      } else {
        console.log("No notification data")
      }

    }, []);

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      //console.log("!!!Received response Context:", response);
      let data = response.notification.request.content.data
      //console.log("Exercise ID: ", data)
      if (data.exercise) {
        //console.log(data.exercise)
        navigation.navigate('Detail', {
          item: {
            name: "Test from Notification",
            id: data.exercise
          }
        })
      }
    }, [] );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  useEffect(() => {
    exercises
      .onSnapshot(
        snapshot => {
          const newEntities = []
          snapshot.forEach(doc => {
            const entity = doc.data()
            entity.id = doc.id
            newEntities.push(entity)
          })
          setEntities(newEntities)
          //randomExcersise()
        }
      )
  }, [])

  return (
    <FlatList style={styles.activityList}
      data={entities}
      renderItem={({ item }) =>
        <ListItem
          title={item.name}
          id={item.id}
          onPress={() => {
            navigation.navigate('Detail', {
              item: item
            })
            console.log("ID:", item.id)
          }}
        />

      }
      ItemSeparatorComponent={Separator}
    />
  )
}

// const randomExcersise = () => {
//   var rand = entities[~~(Math.random() * entities.length)];
//   console.log("Random", rand)
// }

async function registerForPushNotificationsAsync(user, db) {
  console.log("Getting token")
  let token;
  if (Constants.isDevice) {
    console.log("Constants")
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Push token", token)

      var userToUpdate = db.collection("Users").doc(user.uid)

      var setWithMerge = userToUpdate.set({
        push_token: token
      }, { merge: true } )
  }
  return token
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  listItem: {
    //width: '100%',
    alignContent: 'flex-start',
    padding: 20,
    margin: 5,
    borderColor: 'grey',
    borderWidth: 2
  },

  activityList: {
    width: '100%',
    backgroundColor: 'white'
  },
  separator: {
    backgroundColor: "#ececec",
    height: 1
  },
});
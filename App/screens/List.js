import React, { useContext, useEffect } from "react";
import { FlatList, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import DATA from '../data/data';
//import exercises from '../../firebaseConfig'
import { firebase } from '../../firebaseConfig'
import { useState } from "react";
import { AuthContext } from '../context/AuthContext';

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';



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

  registerForPushNotificationsAsync(user)

  async function registerForPushNotificationsAsync(user) {
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
      // db.collection("Users").doc(user.uid).set({
      //   push_token: token,
      // })
      //   .then(function () {
      //     console.log("Push token set")
      //   })
      //   .catch(function (error) {
      //     console.error("Error writing document: ", error);
      //   });

    }
  }

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
          randomExcersise()
        }
      )
  }, [])

  const randomExcersise = () => {
    var rand = entities[~~(Math.random() * entities.length)];
    console.log("Random", rand)
  }

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
import React, { useContext, useEffect, useRef } from "react";
import { FlatList, TouchableOpacity, View, Text, StyleSheet, Alert, StatusBar, Image } from "react-native";
import DATA from '../data/data';
//import exercises from '../../firebaseConfig'
import { firebase } from '../../firebaseConfig'
import { useState } from "react";
import { AuthContext } from '../context/AuthContext';

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

const ListItem = ({ title, image, id, description, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.listItem}>
        <View style= {{flexDirection: 'column', width: '70%'}}>
        <Text style= {{
          color: 'white', 
          fontSize: 18,
          fontWeight: 'bold'}}>{title}</Text>
        <Text style= {{color: 'white', marginTop: 5}}>{description} </Text>
        </View>

        <Image source={{uri: `${image}`}}
        style={{width: 60, 
          height: 60, 
          borderRadius: 150,
          overflow: "hidden"}} />
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

  useEffect(() => {
    registerForPushNotificationsAsync(user, db).then(token => setExpoPushToken(token))
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
        }
      )
  }, [])

  return (
    <View>
    <FlatList style={styles.activityList}
      data={entities}
      renderItem={({ item }) =>
        <ListItem
          title={item.name}
          image={item.gif}
          description= {item.description}
          id={item.id}
          onPress={() => {
            navigation.navigate('Detail', {
              item: item,
              //fetchExercise: true
            })
            console.log("ID:", item.id)
          }}
        />

      }
      ItemSeparatorComponent={Separator}
    />
    <StatusBar barStyle="light-content"/>
    </View>
  )
}

async function registerForPushNotificationsAsync(user, db) {
  let token;
  if (Constants.isDevice) {
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
    backgroundColor: '#323F4E',
    alignItems: 'center',
    justifyContent: 'center',
  },

  listItem: {
    alignContent: 'flex-start',
    padding: 20,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  activityList: {
    width: '100%',
    height: '100%',
    backgroundColor: '#323F4E',
  },
  separator: {
    backgroundColor: "#ececec",
    height: 1
  },
});
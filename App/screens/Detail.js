import React, {useEffect} from "react";
import { Text, SafeAreaView, StyleSheet } from "react-native";
import { useState } from "react";
import { exercises } from "../../firebaseConfig";
import {firebase} from '../../firebaseConfig'

export default ({ route }) => {

    //const info = route.params.id

    return (
        <SafeAreaView style= {styles.container}>
        <DetailView route = {route}/>
      </SafeAreaView>
    )
}

const DetailView = ({ route }) => {

    const item  = route.params.item
    const [entity, setEntity] = useState("")

    const db = firebase.firestore()
    const exercise = db.collection('Exercises').doc(item.id)

    useEffect(() => {
      let list = []
      exercise
        .onSnapshot(
          doc => {
            setEntity(doc.data())
            console.log("!!! Document: ", doc.data())
          }
        )
    }, [])

    //console.log("Item", {activity})
    console.log("Route: ", {route} )

    return(
      <Text>Detail of the activity with title: {entity.name} </Text>
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
      width: '100%'
    }
  });
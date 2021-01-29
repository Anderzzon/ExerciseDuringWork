import React, {useEffect} from "react";
import { Text, SafeAreaView, StyleSheet, View, Image } from "react-native";
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
    const [entity, setEntity] = useState({
        gif: "https://www.bluechipexterminating.com/wp-content/uploads/2020/02/loading-gif-png-5.gif",
        name: "",
    })

    const db = firebase.firestore()
    const exercise = db.collection('Exercises').doc(item.id)

    useEffect(() => {
      exercise
        .onSnapshot(
          doc => {
            //setEntity(doc.data())
            setEntity({
              gif: doc.data().gif,
              name: doc.data().name
            })
            console.log("!!! Document: ", doc.data())
            console.log("!!! Entity: ", entity.gif)
          }
        )
    }, [])

    //console.log("Item", {activity})
    console.log("Route: ", {route} )

    return(
      <View>
      <Text>Detail of the activity with title: {entity.name} </Text>
      <Image source={{uri: `${entity.gif}`}}
       style={{width: 400, height: 400}} />
      </View>
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
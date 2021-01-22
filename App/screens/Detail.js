import React from "react";
import { Text, SafeAreaView, StyleSheet } from "react-native";

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

    //console.log("Item", {activity})
    console.log("Route: ", {route} )

    return(
      <Text>Detail of the activity with title: {item.title} </Text>
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
import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";

export default () => {
    return (
      <SafeAreaView style = {styles.container}>
        <Text>Charts etc to come here</Text>
      </SafeAreaView>
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
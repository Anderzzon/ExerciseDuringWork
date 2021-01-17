import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const ListItem = ({title}) => {
  return (
    <View style = {styles.listItem}>
      <Text>{title}</Text>
    </View>
  )
}

export default function App() {
  return (
    <View style={styles.container}>
      <ListItem title = {"hej"}/>
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  listItem: {
    width: '100%',
    alignContent: 'flex-start',
    padding: 20,
    backgroundColor: 'grey'
  },
});

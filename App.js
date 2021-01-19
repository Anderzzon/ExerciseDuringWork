import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView } from 'react-native';

const DATA = [
  {
    id: "1",
    title: "Första övningen"
  },
  {
    id: "2",
    title: "Stå på tå"
  },
  {
    id: "3",
    title: "Flaxa med armarna"
  },
  {
    id: "4",
    title: "Stå på ett ben"
  },
]

const ListItem = ({title, id}) => {
  return (
    <View style = {styles.listItem}    >
      <Text
      onPress={() => console.log(id)}
      >{title}</Text>
    </View>
  )
}

const ActivityList = () => {
const renderItem = ({item}) => (
  <ListItem title = {item.title}/>
)
const handlePress = ({item}) => {
  console.log("ID: ", item.id)
}

  return (
    <FlatList style = {styles.activityList}
      data = {DATA}
      renderItem = {({item, index}) =>
        <ListItem title = {item.title} id = {item.id}
          onPress= {handlePress}
          onPress={() => console.log("Hej")}
        />
      }
      
      
      />
  )
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityList/>
      <StatusBar style="auto" />
    </SafeAreaView>
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

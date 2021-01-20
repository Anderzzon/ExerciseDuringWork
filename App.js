import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';


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

const Tab = createBottomTabNavigator();
const ExcercisesStack = createStackNavigator();

const ListScreen = (navigation) => {
  return (
    <SafeAreaView style={styles.container}>
    <ActivityList navigation = {navigation}/>
    <StatusBar style="auto" />
  </SafeAreaView>
  )
}

const ExcercisesStackScreen = () => {
  return(
  <ExcercisesStack.Navigator>
    <ExcercisesStack.Screen name = "List" component = {ListScreen} />
    <ExcercisesStack.Screen name = "Detail" component = {DetailScreen} />
  </ExcercisesStack.Navigator>
  )
}

const OverviewScreen = () => {
  return (
    <SafeAreaView style= {styles.container}>
      <Overview/>
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}

const DetailScreen = () => {
  return(
    <SafeAreaView style= {styles.container}>
      <DetailView id = {id}/>
    </SafeAreaView>
  )
}

const DetailView = (id) => {
  return(
    <Text>Detail of the activity with numer: {id}</Text>
  )
}

const Overview = () => {
  return (
    <Text>Charts etc to come here</Text>
  )
}

const ListItem = ({title, id}) => {
  return (
    <View style = {styles.listItem}    >
      <Text
      onPress={() => {
        console.log(id)
        
      }}
      >{title}</Text>
    </View>
  )
}

const ActivityList = ({ navigation }) => {
  return (
    <FlatList style = {styles.activityList}
      data = {DATA}
      renderItem = {({item, index}) =>
        // <Text onPress = {() => navigation.push("DetailScreen")}>
        //   {item.title}</Text>
        <TouchableOpacity onPress = {() => {
          console.log(item.id, " was pressed")
          navigation.navigate('Detail')
      }
        
        }>
          <ListItem title = {item.title} id = {item.id}/>
        </TouchableOpacity>
      }
      />
  )
}

export default function App() {
  
  return (

      <NavigationContainer>
        <Tab.Navigator
        screenOptions= {({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Exercises') {
              iconName = focused
              ? 'body'
              : 'body-outline';
            } else if (route.name === 'Overview') {
              iconName = focused ? 'ribbon' : 'ribbon-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        >
          <Tab.Screen name = "Exercises" component = {ExcercisesStackScreen}/>
          <Tab.Screen name = "Overview" component = {OverviewScreen} />
        </Tab.Navigator>
      </NavigationContainer>

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

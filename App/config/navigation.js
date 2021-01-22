import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import ListView from '../screens/List';
import Detail from '../screens/Detail'
import Overview from '../screens/Overview';

const ExcercisesStack = createStackNavigator();
const ExcercisesStackScreen = () => {
    return(
    <ExcercisesStack.Navigator>
      <ExcercisesStack.Screen 
      name = "ListView" 
      component = {ListView} 
      options = {{
        headerTitle: 'List of activities'
      }}
      />
      <ExcercisesStack.Screen 
      name = "Detail" 
      component = {Detail} 
      options = {({ route }) => {
        return {
            headerTitle: `${route.params.item.title}`,
            headerBackTitle: "Back"
        }
      }
      
    }
      />
    </ExcercisesStack.Navigator>
    )
  }

  const Tab = createBottomTabNavigator();
  const TabScreen = () => {
      return (
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
          <Tab.Screen name = "Overview" component = {Overview} />
        </Tab.Navigator>
      )
  }

  export default () => {
      return (
        <NavigationContainer>
            <TabScreen/>
        </NavigationContainer>
      );
  }
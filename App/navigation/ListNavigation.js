import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ListView from '../screens/List';
import Detail from '../screens/Detail';
import Overview from '../screens/Overview';

const OverviewStack = createStackNavigator();
const OverviewStackScreen = () => {
  return (
    <OverviewStack.Navigator>
      <OverviewStack.Screen
        name="Overview"
        component={Overview}
        options={{
          headerTitle: 'Overview',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#566D87',
          },
        }}
      />
    </OverviewStack.Navigator>
  );
};

const ExcercisesStack = createStackNavigator();
const ExcercisesStackScreen = () => {
  return (
    <ExcercisesStack.Navigator>
      <ExcercisesStack.Screen
        name="ListView"
        component={ListView}
        options={{
          headerTitle: 'All activities',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#566D87',
          },
        }}
      />
      <ExcercisesStack.Screen
        name="Detail"
        component={Detail}
        options={({ route }) => {
          return {
            headerTitle: `${route.params.item.name}`,
            headerTintColor: 'white',
            headerBackTitle: 'Back',
            headerStyle: {
              backgroundColor: '#566D87',
            },
          };
        }}
      />
    </ExcercisesStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();
export default function TabScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Exercises') {
            iconName = focused ? 'body' : 'body-outline';
          } else if (route.name === 'Overview') {
            iconName = focused ? 'ribbon' : 'ribbon-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'white',
        style: {
          backgroundColor: '#566D87',
        },
      }}
    >
      <Tab.Screen name="Exercises" component={ExcercisesStackScreen} />
      <Tab.Screen name="Overview" component={OverviewStackScreen} />
    </Tab.Navigator>
  );
}

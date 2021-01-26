import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListView from '../screens/List';

const Stack = createStackNavigator();

export default function AuthenticatedStack() {
  return (
    <Stack.Navigator initialRouteName="ListView">
      <Stack.Screen name="ListView" component={ListView} />
    </Stack.Navigator>
  );
}
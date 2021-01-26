import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthenticatedStack from './AuthenticatedStack';
import UnauthenticatedStack from './UnauthenticatedStack';
import TabScreen from './ListNavigation'
import { AuthContext } from '../context/AuthContext';
import Splash from '../screens/Splash'

export default function AuthNavigation() {
  const { isLoading, isLoggedIn, user } = useContext(AuthContext);

  if (isLoading) {
    return <Splash/>
  }

  return (
    <NavigationContainer>
      {user ? <TabScreen /> : <UnauthenticatedStack />}
    </NavigationContainer>
  );
}
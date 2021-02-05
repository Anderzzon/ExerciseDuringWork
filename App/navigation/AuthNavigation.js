import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthenticatedStack from './AuthenticatedStack';
import UnauthenticatedStack from './UnauthenticatedStack';
import TabScreen from './ListNavigation'
import { AuthContext } from '../context/AuthContext';
import Splash from '../screens/Splash'
import { navigationRef } from './RootNavigation';

export default function AuthNavigation() {
  const { isLoading, user } = useContext(AuthContext);

  if (isLoading) {
    return <Splash/>
  }

  return (
    <NavigationContainer ref={navigationRef}>{user ? <TabScreen /> : <UnauthenticatedStack />}</NavigationContainer>
  );
}
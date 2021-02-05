import React, { useEffect } from 'react';
import { useContext } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function LogIn({ navigation }) {
  const { logIn } = useContext(AuthContext);

  useEffect(() => {
    logIn();
  });

  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#323F4E',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

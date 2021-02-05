import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

export default function Splash() {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating={true} size="small" hidesWhenStopped />
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
});

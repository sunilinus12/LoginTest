import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function SplashScreen() {
  return (
    <View style={styles.center}>
      <ActivityIndicator color={'black'} size={'large'} />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

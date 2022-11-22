import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function LoadingComponent() {
  return (
    <View style={styles.center}>
      <ActivityIndicator size={'large'} color="red" />
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

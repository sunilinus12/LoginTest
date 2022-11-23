import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function SplashScreen() {
  return (
    <View style={styles.center}>
      <Image
        source={require('../assets/Login.png')}
        style={{
          width: '100%',
          height: '30%',
        }}
        resizeMode="contain"
      />
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

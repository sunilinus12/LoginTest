import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './src/navigations/AuthStack';
import {AuthProvider} from './src/context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </AuthProvider>
  );
}

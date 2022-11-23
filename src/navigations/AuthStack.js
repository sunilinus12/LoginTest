import {View, Text} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Login from '../screens/Login';
import {AuthContext} from '../context/AuthContext';
import SplashScreen from '../screens/SplashScreen';
import DetailScreen from '../screens/DetailScreen';

const Stack = createStackNavigator();
export default function AuthStack() {
  const {token, splashLoading} = useContext(AuthContext);

  return (
    <Stack.Navigator>
      {true ? (
        <Stack.Screen
          name={'splash'}
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
      ) : token !== null ? (
        <>
          <Stack.Screen name={'Home'} component={Home} />
          <Stack.Screen name={'DetailScreen'} component={DetailScreen} />
        </>
      ) : (
        <Stack.Screen
          name={'Login'}
          component={Login}
          options={{
            headerShown: false,
          }}
        />
      )}
    </Stack.Navigator>
  );
}

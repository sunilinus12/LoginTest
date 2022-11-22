import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Login from '../screens/Login';
import {AuthContext} from '../context/AuthContext';

const Stack = createStackNavigator();
export default function AuthStack() {
  const {token} = useContext(AuthContext);
  console.log(token);
  return (
    <Stack.Navigator>
      {token !== null ? (
        <Stack.Screen name={'Home'} component={Home} />
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

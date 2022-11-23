import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import SimpleToast from 'react-native-simple-toast';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      const postData = {
        email,
        password,
      };
      const res = await axios.post('https://reqres.in/api/login', postData);
      if (res.status) {
        setToken(res?.data?.token);
        await AsyncStorage.setItem(
          'userToken',
          JSON.stringify(res?.data?.token),
        );
        setLoading(false);
        SimpleToast.show('Login Successfull', SimpleToast.SHORT);
      } else {
        setLoading(false);
        SimpleToast.show('Login UnSuccessfull', SimpleToast.SHORT);
      }
    } catch (error) {
      setLoading(false);
      SimpleToast.show('Login UnSuccessfull', SimpleToast.SHORT);
    }
  };

  const IsLogin = async () => {
    try {
      setSplashLoading(true);
      const userToken = await AsyncStorage.getItem('userToken');
      const token = JSON.parse(userToken);

      setTimeout(() => {
        if (token !== null) {
          setToken(token);
          setSplashLoading(false);
        }
        setSplashLoading(false);
      }, 2000);
    } catch (error) {
      setSplashLoading(false);
    }
  };
  useEffect(() => {
    IsLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        token,
        setToken,
        loading,
        setLoading,
        splashLoading,
        setSplashLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

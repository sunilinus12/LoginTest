import axios from 'axios';
import React, {createContext, useState} from 'react';
import SimpleToast from 'react-native-simple-toast';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [token, setToken] = useState(null);
  const handleLogin = async (email, password) => {
    try {
      const postData = {
        email,
        password,
      };
      const res = await axios.post('https://reqres.in/api/login', postData);
      if (res.status) {
        setToken(res?.status?.token);
        SimpleToast.show('Login Successfull', SimpleToast.SHORT);
      } else {
        SimpleToast.show('Login Successfull', SimpleToast.SHORT);
      }
    } catch (error) {
      SimpleToast.show('Login Unsuccessfull', SimpleToast.SHORT);
    }
  };
  return (
    <AuthContext.Provider value={{handleLogin, token, setToken}}>
      {children}
    </AuthContext.Provider>
  );
};

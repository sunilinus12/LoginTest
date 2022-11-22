import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {AuthContext} from '../context/AuthContext';
import SimpleToast from 'react-native-simple-toast';
import {ValidateEmail} from '../utils/customfunctions';
import Spinner from 'react-native-loading-spinner-overlay';

export default function Login({navigation}) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const {handleLogin, loading} = useContext(AuthContext);
  const handleValidation = () => {
    if (email !== null && password !== null) {
      if (ValidateEmail(email)) {
        handleLogin(email, password);
      } else {
        SimpleToast.show('Invalid Email');
      }
    } else {
      SimpleToast.show('Plz Enter Valid Inputs');
    }
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />
      <View style={styles.inner_container}>
        <Text style={styles.logintitle}>Login Here</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={[styles.input, {width: 0.8 * Dimensions.get('screen').width}]}
        />
        <TextInput
          placeholder="Password"
          value={password}
          secureTextEntry={true}
          onChangeText={setPassword}
          style={[styles.input, {width: 0.8 * Dimensions.get('screen').width}]}
        />
        <TouchableOpacity
          onPress={() => {
            handleValidation();
          }}>
          <View
            style={[
              styles.button,
              {width: 0.8 * Dimensions.get('screen').width},
            ]}>
            <Text style={styles.buttonText}>Login</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Platform.OS == 'ios' ? '30%' : '20%',
  },
  input: {
    width: '80%',
    marginVertical: '4%',
    height: 40,
    borderWidth: 0.3,
    borderColor: 'gray',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  logintitle: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
    marginVertical: 20,
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  inner_container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '30%',
  },
});

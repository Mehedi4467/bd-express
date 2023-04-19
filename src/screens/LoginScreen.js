import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {APP_TOKEN,APP_AUTHOR} from '@env'
import { loginApi } from '../api/Auth/login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const [error,setError]=useState('');
const [loading,setLoaing]=useState(false);
const navigation = useNavigation();

  const handleLogin = async() => {
    setLoaing(true);
    const userInfo = {
      name:email,
      password:password
    }

    if(email && password){
      setError('');
      const log =await loginApi(userInfo);
      if(log?.status === "Accepted"){
        try {
          await AsyncStorage.setItem('user', JSON.stringify(log?.data));
          // console.log('User data stored successfully');
          navigation.navigate('Home')
        } catch (e) {
          // console.log('Failed to store user data', e);
          setError('Something want wrong')
        }

      }else{
        setError(log?.msg)
      }
      setLoaing(false);
     
    }else{
      setError("Username and password are incorrect!");
      setLoaing(false);
    }
 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {
        error && <Text style={styles.error}>{error}</Text>
      }
      
      <TextInput
        style={styles.input}
        placeholder="User Name"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {
        loading ?   <TouchableOpacity style={styles.buttonActive} onPress={handleLogin}>
        <ActivityIndicator size="small" color="#0000ff" />
        </TouchableOpacity>:<TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      }
     
    
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  error:{
color:'red',
marginBottom:10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#00aeef',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonActive: {
    width: '80%',
    height: 50,
    backgroundColor: '#00aeef',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    opacity:.5
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default LoginScreen;

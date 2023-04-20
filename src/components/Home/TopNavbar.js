import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import logo from '../../assets/logo.png';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from '../../screens/LoginScreen';


export default function TopNavbar({gobalLoader,setGobalLoader}) {
  // const navigation = useNavigation();
  const logOut= async()=>{
    try {
          await AsyncStorage.removeItem('user');
          console.log('Item removed successfully');
          // navigation.navigate('Login')
          // <LoginScreen></LoginScreen>
          setGobalLoader(!gobalLoader)
        } catch (e) {
          // console.log('Error removing item:', e);
        }
  }

  return (
    <View style={styles.logoContainer}>
       <Icon  name="arrow-left" size={20} color="black" />
       {/* <Icon onPress={()=>navigation.goBack()} name="arrow-left" size={20} color="black" /> */}

      <Image source={logo} style={styles.logo} />
     
      <Icon onPress={()=>logOut()} name="sign-out" size={30} color="#900" />
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal:10,
    marginTop:10
  },
  logo: {
    width: 80,
    height: 80,
    // marginRight: 10,
  },
});

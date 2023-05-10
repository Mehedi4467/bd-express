import React, { useContext } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import logo from '../../assets/logo.png';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import MyContext from '../../utility/MyContext';



export default function TopNavbar({isNavOpen,setIsNavOpen}) {
  const navigation = useNavigation();
  // const route = useRoute();
  const { primaryData, setRefatchData,refetchDatar } = useContext(MyContext);
  console.log('coin',primaryData?.data?.wallet)

  // const logOut= async()=>{
  //   const x = await AsyncStorage.getItem('user');
  //   const userInfo = JSON.parse(x);
  //   if(userInfo){
  //     const verify = await logOutApi(userInfo?.user, userInfo?.access_token);
  //     if(verify?.status){
  //       try {
  //         await AsyncStorage.removeItem('user');
  //         console.log('Item removed successfully');
  //         // navigation.navigate('Login')
  //         // <LoginScreen></LoginScreen>
  //         setGobalLoader(!gobalLoader)
  //       } catch (e) {
  //         // console.log('Error removing item:', e);
  //       }
  //     }
  //   }
  // }

  return (
    <View style={styles.logoContainer}>
       
       <TouchableOpacity style={{height:40,width:40,backgroundColor:'#00aeef',flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:25}} onPress={()=>navigation.canGoBack() && navigation.goBack()}>
      <Icon  name="arrow-left" size={25}  color="#fff" />
      </TouchableOpacity>

      <Image source={logo} style={styles.logo} />
      <TouchableOpacity style={{height:40,width:40,backgroundColor:'#00aeef',flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:25}} onPress={()=>setIsNavOpen(!isNavOpen)}>
      <Icon name="user" size={25} color="#fff" />
          {/* <Icon onPress={()=>logOut()} name="sign-out" size={30} color="#900" /> */}
      </TouchableOpacity>
 
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
    marginTop:30
  },
  logo: {
    width: 80,
    height: 80,
    // marginRight: 10,
  },
});

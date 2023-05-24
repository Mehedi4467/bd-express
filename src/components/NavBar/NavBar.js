import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import {  Divider, Menu } from 'react-native-paper';
import { pathLogOutApi } from '../../api/Auth/pathLogOut';
export default function NavBar({navigation,primaryData}) {

    // const { primaryData, setRefatchData,refetchDatar } = useContext(MyContext);




  return (
<View style={{position:'absolute',right:0,top:125 , backgroundColor:'#fff'}}>
  <View style={{width:250}}>
    <View style={{flexDirection:'row',justifyContent:'center',marginBottom:10,padding:5}}>
      <View>
        <Icon style={{textAlign:'center'}} name="coins" size={50} color="#1c75bc" />
        <Text>Coin: {primaryData?.data?.wallet?.coin}</Text>
      </View>
    </View>
    <Divider />
    <View>
   <Menu.Item style={{flexDirection:'row',alignItems:'center'}} leadingIcon={() =><Icon name="sign-out-alt" size={20} color="#1c75bc" />} onPress={async()=>{
   const a =await pathLogOutApi();
   if(a?.status){
    navigation.navigate("Login");
   }else{
      navigation.navigate("Login")
   }

    }
} title="sign-out" /> 


    </View>
  </View>


</View>
  )
}
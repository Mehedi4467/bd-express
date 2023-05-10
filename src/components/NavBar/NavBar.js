import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Divider, Menu } from 'react-native-paper';
import { logOut } from '../../utility/LogOut';
import MyContext from '../../utility/MyContext';
export default function NavBar({setGobalLoader,gobalLoader}) {

    const { primaryData, setRefatchData,refetchDatar } = useContext(MyContext);


  return (
    <View style={{position:'absolute',right:0,top:133,backgroundColor:'#fff'}}>
  <View style={{width:250}}>
    <View style={{flexDirection:'row',justifyContent:'center',marginBottom:10,padding:5}}>
   <View>
   <Icon style={{textAlign:'center'}} name="coins" size={50} color="#1c75bc" />
    <Text>Coin: {primaryData?.data?.wallet?.coin}</Text>
   </View>
    </View>
    <Divider />
<View>
{/* <Menu.Item style={{flexDirection:'row',alignItems:'center'}} leadingIcon={() =><Icon name="coins" size={20} color="#1c75bc" />} onPress={() => {}} title="Redo" /> */}
<Menu.Item style={{flexDirection:'row',alignItems:'center'}} leadingIcon={() =><Icon name="sign-out-alt" size={20} color="#1c75bc" />} onPress={()=>logOut(setGobalLoader,gobalLoader)} title="sign-out" />
</View>

  </View>
</View>
  )
}
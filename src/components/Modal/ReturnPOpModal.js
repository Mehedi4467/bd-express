import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { ActivityIndicator, Modal, Portal } from 'react-native-paper';
import { verifyUserPath } from '../../api/Auth/allPathVerify';
import { pathLogOutApi } from '../../api/Auth/pathLogOut';
import { removeReturnPercel } from '../../api/BookingApi/removeReturnPercel';
import { verifyTracking } from '../../api/BookingApi/VerifyTracking';

export default function ReturnPOpModal({setReturn,openReturn,setReturnData,returnData,navigation}) {
    const containerStyle = {backgroundColor: 'white', padding: 20,margin:10};
  return (
    <Portal>
    <Modal visible={openReturn} contentContainerStyle={containerStyle} dismissable={!openReturn} onDismiss={openReturn}>
      <View style={{}}>
        
     <View style={{alignItems:'center',marginTop:4}}>
        <Text style={{color:"#d90429",fontSize:18}}>{returnData?.msg}</Text>
    </View>
      
      </View>
      <View style={{flexDirection:'row',alignItems:'center',gap:5,justifyContent:'center',marginTop:10}}>
  
        <TouchableOpacity
      style={{
        backgroundColor: '#d90429',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={() =>{
        setReturnData({});
        setReturn(false);
      } }>
      <Text style={{ color: 'white', fontSize: 16 }}>Cancel</Text>
    </TouchableOpacity>
         <TouchableOpacity
        style={{
          backgroundColor: '#00aeef',
          padding: 10,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
          width:90
        }}
        onPress={async() => {
            const x = await verifyUserPath();
            if(!x?.status || x?.exception === 'yes'){
                pathLogOutApi();
                navigation.navigate('Login');
          }else{
            const m = await removeReturnPercel(returnData?.bookin_id);
              if(m?.status){
                  setReturn(false);
                  navigation.navigate('booking',{id:returnData?.tracking_id,TRimg:''});
              }
          }
        }}>
        <Text style={{ color: 'white', fontSize: 16 }}>Yes</Text>
      </TouchableOpacity>
    
      </View>
      
    </Modal>
  </Portal>
  )
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 20,
    },
    buttonActive: {
        backgroundColor: '#00aeef',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width:90,
      opacity:.5
    },
  });
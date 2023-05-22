import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Modal, Portal, TextInput } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function UpdateCurrency({setVisiblecurrency,setPaymentCurrency,visibleCurrency,paymentCurrency}) {

    const [id,setId]=useState('Payment');
    const [value,setValue]=useState(paymentCurrency?.amount || 0);
    const [userInfo,setUserInfo]=useState([])
    const UserInformation = async()=>{
      const x = await AsyncStorage.getItem('user');
      const user = JSON.parse(x);
      setUserInfo(user)
    }

    useEffect(()=>{
      UserInformation();
    },[visibleCurrency])
    

// console.log(extraWork)

    const handdleCurency = ()=>{
      if(value){
        setPaymentCurrency({
          id:id,
          currency:userInfo?.country,
          amount:+value
        });
        setVisiblecurrency(false);
      }
    }

    
    const handleDisMis = ()=>{
      setVisiblecurrency(false);
    }


    const containerStyle = {backgroundColor: 'white', padding: 20,margin:10};
// console.log(visibleCurrency)
  return (
    <Portal>
    <Modal visible={visibleCurrency} contentContainerStyle={containerStyle} dismissable={!visibleCurrency} onDismiss={visibleCurrency}>
      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
          <View style={{backgroundColor:'#1c75bc',padding:5,width:50,marginTop:6 ,height:47,borderTopLeftRadius:5,borderBottomLeftRadius:5, flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'#fff'}}>{userInfo?.country}</Text>
          </View>
          <TextInput
            style={{width:'70%',height:45}}
            mode="outlined"
            label="Amount"
            value={value.toString()}
            placeholder="Type Amount"
            onChangeText={(value)=>setValue(value)}
            keyboardType="numeric"
          />
      </View>
      <View style={{flexDirection:'row',alignItems:'center',gap:5,justifyContent:'center',marginTop:10}}>
      <TouchableOpacity
      style={{
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={() => handleDisMis()}>
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
      onPress={() => handdleCurency()}>
      <Text style={{ color: 'white', fontSize: 16 }}>Set</Text>
    </TouchableOpacity>

      </View>
      
    </Modal>
  </Portal>

  )
}
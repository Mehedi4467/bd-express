import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Modal, Portal, TextInput } from 'react-native-paper'



export default function Currency({setVisiblecurrency,setPaymentCurrency,visibleCurrency}) {

    const [curency,setCurency]=useState(0);
    const [id,setId]=useState('');
    const [value,setValue]=useState('');
    
    const handdleCurency = ()=>{
        setPaymentCurrency();
        setVisiblecurrency(false);
    }


    const handleDisMis = ()=>{
      setVisiblecurrency(false);
    }


    const containerStyle = {backgroundColor: 'white', padding: 20,margin:10};
console.log(visibleCurrency)
  return (
    <Portal>
    <Modal visible={visibleCurrency} contentContainerStyle={containerStyle} dismissable={!visibleCurrency} onDismiss={visibleCurrency}>
      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
          <View style={{backgroundColor:'#1c75bc',padding:5,width:50,marginTop:6 ,height:47,borderTopLeftRadius:5,borderBottomLeftRadius:5, flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'#fff'}}>BD</Text>
          </View>
          <TextInput
            style={{width:'70%',height:45}}
            mode="outlined"
            label="Amount"
            placeholder="Type Amount"
            onChangeText={(value)=>setCurency(value)}
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
      onPress={() => handleDisMis()}>
      <Text style={{ color: 'white', fontSize: 16 }}>Set</Text>
    </TouchableOpacity>

      </View>
      
    </Modal>
  </Portal>

  )
}
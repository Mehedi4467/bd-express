import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Modal, Portal } from 'react-native-paper';
import { pathLogOutApi } from '../../api/Auth/pathLogOut';
import { verifyUserPath } from '../../api/Auth/allPathVerify';

export default function ShipmentAddModal({SetAddShipment,handleClick,addShipment}) {
    const subMiteShipment = ()=> {
        handleClick();
        SetAddShipment(false);
    }

    const containerStyle = {backgroundColor: 'white', padding: 20,margin:10};
  return (
    <Portal>
    <Modal visible={addShipment} contentContainerStyle={containerStyle} dismissable={!addShipment} onDismiss={addShipment}>
      <View>
        
     <View style={{alignItems:'center',marginTop:4}}>
        <Text style={{color:"#d90429",fontSize:18}}>Do you want to add a new shipment?</Text>
    </View>
      
      </View>

      <View style={{flexDirection:'row',alignItems:'center',gap:5,justifyContent:'center',marginTop:20}}>
        <TouchableOpacity
 
      style={{
        backgroundColor: '#d90429',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width:90
      }}
     
      onPress={()=>SetAddShipment(false)}>
      <Text style={{ color: 'white', fontSize: 16 }}>No</Text>
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
            subMiteShipment();
        }}}>
            <Text style={{ color: 'white', fontSize: 16 }}>Yes</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  </Portal>
  )
}
import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Modal, Portal } from 'react-native-paper';
import { ExtraWorkUpdatePOUp } from '../../api/BookingApi/ExtraWorkPopUp';
import { pathLogOutApi } from '../../api/Auth/pathLogOut';
import { verifyUserPath } from '../../api/Auth/allPathVerify';

export default function ExtraWorkPOPUp({setUpdateBookingPOpUP,upadateBookingPopUp,submitBookingData,bookingId}) {
const [loading,setLoading]=useState(false);

    const updateExtraWork = async(value)=>{
        setLoading(true);
        const updateData = {
            booking_id:bookingId,
            status:value
        }

      try{
        const x = await ExtraWorkUpdatePOUp(updateData);
        if(x?.status){
            submitBookingData();
            setUpdateBookingPOpUP(false);
            setLoading(false);
        }else{
            setUpdateBookingPOpUP(false);
            setLoading(false);
        }
      }catch(err){
        console.log(err);
        setLoading(false);
      }

    }

    const containerStyle = {backgroundColor: 'white', padding: 20,margin:10};
  return (
    <Portal>
    <Modal visible={upadateBookingPopUp} contentContainerStyle={containerStyle} dismissable={!upadateBookingPopUp} onDismiss={upadateBookingPopUp}>
      <View style={{}}>
        
     <View style={{alignItems:'center',marginTop:4}}>
        <Text style={{color:"#d90429",fontSize:18}}>Did you completed the extra work ?</Text>
    </View>
      
      </View>

            {
                loading &&  <Text style={{marginTop:20,textAlign:'center'}}>Please Wait...</Text>
            }

      <View style={{flexDirection:'row',alignItems:'center',gap:5,justifyContent:'center',marginTop:20}}>
        <TouchableOpacity
      style={{
        backgroundColor: '#d90429',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
      }}
     
      onPress={()=>setUpdateBookingPOpUP(false)}>
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
        updateExtraWork("incomplete");
    }}}>
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
            updateExtraWork("complete");
        }}}>
            <Text style={{ color: 'white', fontSize: 16 }}>Yes</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  </Portal>
  )
}
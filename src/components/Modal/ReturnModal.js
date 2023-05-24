import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { ActivityIndicator, Modal, Portal, TextInput } from 'react-native-paper'

export default function ReturnModal({setReturnModal,openReturnModal,setReason,returnLoading,submitReturnREson,setReturnError,returnError}) {

const containerStyle = {backgroundColor: 'white', padding: 20,margin:10};
  return (
    <Portal>
    <Modal visible={openReturnModal} contentContainerStyle={containerStyle} dismissable={!openReturnModal} onDismiss={openReturnModal}>
      <View style={{}}>
          <TextInput
            style={{width:'100%',height:100,backgroundColor:'#fff'}}
            mode="outlined"
            multiline
           numberOfLines={4}
            label="Write Return Reason"
            placeholder="Return Reason"
            onChangeText={(value)=>setReason(value)}
          />

      {
        returnError &&   <View style={{alignItems:'center',marginTop:4}}>
        <Text style={{color:"#d90429"}}>{returnError}</Text>
    </View>
      }
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
      onPress={() => {
        setReturnError('');
        setReturnModal(false);
      } }>
      <Text style={{ color: 'white', fontSize: 16 }}>Cancel</Text>
    </TouchableOpacity>
   
   
     
    {
        returnLoading ? <TouchableOpacity style={styles.buttonActive} >
        <ActivityIndicator size="small" color="#0000ff" />
        </TouchableOpacity> : <TouchableOpacity
        style={{
          backgroundColor: '#00aeef',
          padding: 10,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
          width:90
        }}
        onPress={() => submitReturnREson()}>
        <Text style={{ color: 'white', fontSize: 16 }}>Submit</Text>
      </TouchableOpacity>
    }
      

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
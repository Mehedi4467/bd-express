import { View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import {Modal, Portal, TextInput } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome';
export default function BookingItemModal({hideModal,visible,setModalValue,ModalValue}) {


  let addModalFields = () => {setModalValue([...ModalValue,{ index: '',item: '',qty: '' },])};
  let removeFormFields = (i) => {
    let newFormValues = [...ModalValue];
    newFormValues.splice(i, 1);
    setModalValue(newFormValues);
  };

  let handleChange = (i, name,value) => {
    let newFormValues = [...ModalValue];
    newFormValues[i][name] = value;
    setModalValue(newFormValues);
  };
 
  const containerStyle = {backgroundColor: 'white', padding: 20,height:400,margin:10};
  return (
    <Portal>
      <Modal  visible={visible} onDismiss={hideModal}  contentContainerStyle={containerStyle}>
        <ScrollView>
          {
            ModalValue.map((item,index)=>    
            <View key={index} style={{borderWidth: 1,
              borderColor: '#00aeef',
              borderRadius: 10,
              padding: 10,
              marginBottom:10
              }}>
        
       {
        index!==0 &&  <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
        <TouchableOpacity
              style={{ backgroundColor: '#00aeef', padding: 10, height:30,width:30, borderRadius: 5 }}
              onPress={() => removeFormFields(index)}>
                 <Icon name="times" size={10} color="#fff" />
          </TouchableOpacity>
        </View >
       }
                <TextInput
                style={{width:'100%'}}
              mode="outlined"
              label={`Item ${index+1}`}
              placeholder="Type Item Name"
              onChangeText={(text) => handleChange(index,'item', text)}
            />
            <TextInput
            style={{width:'100%'}}
              mode="outlined"
              label={`Quantity ${index+1}`}
              placeholder="Type Item Quantity"
              onChangeText={(text) => handleChange(index,'qty', text)}
            />

                </View>
        )
        }

        <View style={{flexDirection:'row',justifyContent:'flex-end',marginTop:10}}>
        <TouchableOpacity
      style={{ backgroundColor: '#00aeef', padding: 10, height:40,width:40, borderRadius: 5 }}
      onPress={() => addModalFields()}>
         <Icon name="plus" size={20} color="#fff" />
  </TouchableOpacity>
       
        </View>
      </ScrollView>
    </Modal>
  </Portal>
  )
}
import { View, ScrollView, TouchableOpacity, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Modal, Portal, TextInput } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome';


export default function BookingItemModal({visible,setFormValues,formValues,openINdex,setVisible}) {


  const [disabled, setDisabled] = useState(false);
  const [ModalValue, setModalValue] = useState([...formValues[openINdex]?.items]);
  let addModalFields = () => {setModalValue([...ModalValue,{ index: openINdex,item: '',qty: '' },])};

  let removeFormFields = (i) => {
    let newFormValues = [...ModalValue];
    newFormValues.splice(i, 1);
    setModalValue(newFormValues);

    let newFormValuess = [...formValues];
    newFormValuess[openINdex]['items'] = newFormValues;
    setFormValues(newFormValuess);
  };


  useEffect(()=>{
    if(ModalValue){
      setDisabled(ModalValue.every((item)=>item?.item && item?.qty))
    }
  },[ModalValue])

  let handleChange = (i, name,value) => {
    let newFormValues = [...ModalValue];
    newFormValues[i][name] = value;
    setModalValue(newFormValues);

  };


  const OnSvae = () =>{
    let newFormValuess = [...formValues];
    newFormValuess[openINdex]['items'] = ModalValue;
    setFormValues(newFormValuess);
    hideModal();
  }

  // console.log(ModalValue)
 

  const hideModal = () => setVisible(false);

  const containerStyle = {backgroundColor: 'white',height:400,margin:10};
  return (
    <Portal>
      <Modal  visible={visible} onDismiss={visible} dismissable={!visible}  contentContainerStyle={containerStyle}>
 
       <ScrollView>
       <View style={{padding:20}}>
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
              style={{ backgroundColor: 'red', padding: 10, height:30,width:30, borderRadius: 5 }}
              onPress={() => removeFormFields(index)}>
                 <Icon name="times" size={10} color="#fff" />
          </TouchableOpacity>
        </View >
       }
            <TextInput
              style={{width:'100%'}}
              mode="outlined"
              value={item?.item}
              label={`Item ${index+1}`}
              placeholder="Type Item Name"
              onChangeText={(text) => handleChange(index,'item', text?.toUpperCase())}
            />
            <TextInput
            style={{width:'100%'}}
              mode="outlined"
              keyboardType="numeric"
              value={item?.qty}
              label={`Quantity ${index+1}`}
              placeholder="Type Item Quantity"
              onChangeText={(text) => handleChange(index,'qty', text)}
            />
          </View>
        )
        }

          <View style={{flexDirection:'row',marginTop:10,justifyContent:'space-between',alignItems:'center'}}>
            <TouchableOpacity style={{ backgroundColor: '#00aeef', opacity: disabled ? 1 :.5,padding: 10, height:40,width:40, borderRadius: 5 }} onPress={() => addModalFields()} disabled={!disabled}>
              <Icon name="plus" size={20} color="#fff" />
            </TouchableOpacity>
         
          <TouchableOpacity
              style={{ backgroundColor: 'red', padding: 10, borderRadius: 5 }}
              onPress={() => hideModal()}>
             <Text style={{color:'white'}}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={{ backgroundColor: '#00aeef', opacity: disabled ? 1 :.5 , padding: 10, borderRadius: 5 }}
              onPress={() => OnSvae()} disabled={!disabled}>
              <Text style={{color:'white'}}>Save</Text>
          </TouchableOpacity>

          </View>

        </View>

      </ScrollView>
       
    </Modal>
  </Portal>
  )
}
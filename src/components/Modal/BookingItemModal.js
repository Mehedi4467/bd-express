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


  const hideModal = () => setVisible(false);


  const containerStyle = {backgroundColor: 'white',height:500,margin:10};
  return (
    <Portal>
      <Modal  visible={visible} onDismiss={visible} dismissable={!visible}  contentContainerStyle={containerStyle}>
          <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',position:'absolute',top:0,left:20,width:'95%',backgroundColor:'#fff',zIndex:999,alignSelf:'center',paddingTop:15,paddingBottom:10}}>
                {/* <TouchableOpacity style={{ backgroundColor: '#00aeef', opacity: disabled ? 1 :.5,padding: 10, borderRadius: 5 }} onPress={() => addModalFields()} disabled={!disabled}> */}
                <TouchableOpacity style={{ backgroundColor: '#00aeef',padding: 10, borderRadius: 5 }} onPress={() => addModalFields()} >
                 <View style={{flexDirection:'row',gap:5,alignItems:'center'}}>
                 <Icon name="plus" size={20} color="#fff" />
                  <Text style={{color:'#fff'}}>Add Item Box</Text>
                 </View>
                </TouchableOpacity>
            
              {/* <TouchableOpacity
                  style={{ backgroundColor: 'red', padding: 10, borderRadius: 5 }}
                  onPress={() => hideModal()}>
                <Text style={{color:'white'}}>Cancel</Text>
              </TouchableOpacity> */}

          </View>



      <ScrollView >
       <View style={{padding:20,marginTop:45}}>
            {
            ModalValue.map((item,index)=>    
            <View key={index} style={{borderWidth: 1,
              borderColor: '#00aeef',
              borderRadius: 10,
              padding: 10,
              marginBottom:45
              }}>
        
              {
                index!==0 &&  <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                  {
                    item?.item && item?.qty ? <Text></Text> :   <Text style={{color:'red'}}>You must fill up the Item and Quantity fields!</Text>
                  }
                
                  <TouchableOpacity
                      style={{ backgroundColor: 'red', padding: 10, height:30,width:30, borderRadius: 5 }}
                      onPress={() => removeFormFields(index)}>
                        <Icon name="times" size={10} color="#fff" />
                  </TouchableOpacity>
                </View >
              }

            <TextInput
              style={{width:'100%',backgroundColor:'#fff',color:'black'}}
              mode="outlined"
              value={item?.item}
              label={`Item ${index+1}`}
              // placeholder="Type Item Name"
              textColor="black"
              autoFocus={true} 
              autoCapitalize='characters'
              onChangeText={(text) => handleChange(index,'item', text)}
            />
            <TextInput
            style={{width:'100%',backgroundColor:'#fff',color:'black'}}
              mode="outlined"
              keyboardType="numeric"
              value={item?.qty}
              label={`Quantity ${index+1}`}
              textColor="black"
              // placeholder="Type Item Quantity"
              onChangeText={(text) => handleChange(index,'qty', text)}
            />
          </View>
        ).reverse()
        }
        </View>
      </ScrollView>

      
      <View style={{flexDirection:'row',justifyContent:"space-around",alignItems:'center',position:'absolute',bottom:0,width:'100%',backgroundColor:'#fff',zIndex:999,alignSelf:'center',paddingTop:10}}>
          <TouchableOpacity
            style={{ backgroundColor: '#00aeef',width:'100%',alignItems:'center', opacity: disabled ? 1 :.5 , padding: 15, borderTopLeftRadius:5,borderTopRightRadius:5 }}
            onPress={() => OnSvae()} disabled={!disabled}>
            <Text style={{color:'white'}}>Save</Text>
          </TouchableOpacity>
      </View>
    </Modal>
  </Portal>
  )
}
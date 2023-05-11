import React, { useEffect, useState } from 'react';
import { View,Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { verifyTracking } from '../../api/BookingApi/VerifyTracking';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
const HomePage = ({setCode,code,img}) => {
  const navigation = useNavigation();
  const [inputCode,setInputCode]=useState(code || '');
const [trackingMsg,setTrackingMsg]=useState('');
const [trackingLoading,setTRackingLoading]=useState(false);
const [trackingVerifyData,setTrackingVerifyData]=useState([]);


  const handlePress = () => {
    navigation.navigate('booking',{id:inputCode,TRimg:img})
  }
  useEffect(()=>{
    if(!inputCode){
      setTrackingMsg('');
      setTrackingVerifyData([])
    }

  },[inputCode])
  
  const verifyTrackingId =async()=>{
    setTRackingLoading(true);
const verifyTI =await verifyTracking(inputCode);
if(verifyTI?.status === "Accepted"){
  setTRackingLoading(false);
  setTrackingMsg(verifyTI?.data?.msg);
  setTrackingVerifyData(verifyTI);
}else{
  setTRackingLoading(false);
  setTrackingMsg('Something want Wrong!!')
}
  }

  useEffect(()=>{
    if(inputCode){
      verifyTrackingId()
    }
  },[code]);

  const searchTrackingId = ()=>{
    if(inputCode){
      verifyTrackingId();
    }
  }
  return (
    <View style={styles.container}>
      <View style={{width:'100%',position:'relative'}}>
      <TextInput 
          style={styles.input}
          onChangeText={(value)=>setInputCode(value)}
          value={inputCode}
          placeholder="Enter Bar Code"
    />
      <TouchableOpacity style={{position:'absolute',backgroundColor:'#00aeef',width:60,height:40,flexDirection:'row',alignItems:'center',justifyContent:'center', borderRadius:5, right:0,top:0}} onPress={()=>searchTrackingId()} >
      <Icon name="search" size={20} color="#fff" />
      </TouchableOpacity>
      </View>

      {
        trackingLoading ?  <Text>Please Wait.....</Text> : trackingMsg ? <Text>{trackingMsg}</Text>: ''
      }
      {
      inputCode && trackingVerifyData?.status === 'Accepted' && trackingVerifyData?.data?.status == 0 ? <TouchableOpacity
        style={styles.button}
        onPress={handlePress}
      ><Text style={styles.buttonText}>Create Booking</Text>
      </TouchableOpacity> : inputCode && trackingVerifyData?.status === 'Accepted' && trackingVerifyData?.data?.status == 1 ? <TouchableOpacity
            style={styles.button}
            onPress={handlePress}
          ><Text style={styles.buttonText}>Update Booking</Text>
          </TouchableOpacity> : ''
      }

      </View>
  
  );
}
const styles = StyleSheet.create({
  container: {
    height:'100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#00aeef',
    borderRadius: 20,
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#00aeef',
    borderRadius:5,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default HomePage;
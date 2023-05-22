import React, { useEffect, useState } from 'react';
import { View,Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { verifyTracking } from '../../api/BookingApi/VerifyTracking';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { pathLogOutApi } from '../../api/Auth/pathLogOut';
import { verifyUserPath } from '../../api/Auth/allPathVerify';
import { deepCheckTrackingId } from '../../api/BookingApi/deepCheck';
import ReturnPOpModal from '../Modal/ReturnPOpModal';
const HomePage = ({setCode,code,img}) => {
const navigation = useNavigation();
const [inputCode,setInputCode]=useState(code || '');
const [trackingMsg,setTrackingMsg]=useState('');
const [trackingLoading,setTRackingLoading]=useState(false);
const [trackingVerifyData,setTrackingVerifyData]=useState([]);
const [createBooking,setCreateBooking]=useState(false);
const [openReturn,setReturn]=useState(false);
const [returnData,setReturnData]=useState({
  tracking_id: '',
  msg:'',
})

  const handlePress = async() => {
    const x = await verifyUserPath();
        if(!x?.status || x?.exception === 'yes'){
            pathLogOutApi();
            navigation.navigate('Login');
            setLoading(false);
      }else{
        navigation.navigate('booking',{id:inputCode,TRimg:img});
      }
    
  }

  const updateBooking = (BId,trId)=>{
    navigation.navigate('update',{trackingID: trId,BookingID :BId });
  }

  // const deepCheck = async(value) => {
  //   const x = await verifyUserPath();
  //       if(!x?.status || x?.exception === 'yes'){
  //           pathLogOutApi();
  //           navigation.navigate('Login');
  //           setLoading(false);
  //     }else{

  //       const check = await deepCheckTrackingId(value);
  //       console.log(check)
  //       // navigation.navigate('booking',{id:inputCode,TRimg:img});
  //     }
    
  // }


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

  if(verifyTI?.data?.status === 0 ){
    const check = await deepCheckTrackingId(inputCode);

    if(check?.data?.status === 0){
      setCreateBooking(true);
    }else{
      setCreateBooking(false);
      navigation.navigate('check',{id:inputCode,data:check});
    }
    
  }else if(verifyTI?.data?.status === 2){
    setReturn(true);
    setReturnData({
      tracking_id:verifyTI?.data?.tracking_id,
      msg:verifyTI?.data?.msg
    })
  }

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
      inputCode && trackingVerifyData?.status === 'Accepted' && trackingVerifyData?.data?.status == 0 && createBooking ? <>
     <TouchableOpacity
        style={styles.button}
        onPress={handlePress}
      ><Text style={styles.buttonText}>Create Booking</Text>
      </TouchableOpacity>  
      </>
      : inputCode && trackingVerifyData?.status === 'Accepted' && trackingVerifyData?.data?.status == 1 ? <TouchableOpacity
            style={styles.button}
            onPress={()=>updateBooking(trackingVerifyData?.data?.booking,trackingVerifyData?.data?.tracking_id)}
          ><Text style={styles.buttonText}>Update Booking</Text>
          </TouchableOpacity> : ''
      }
{
  openReturn && <ReturnPOpModal navigation={navigation} returnData={returnData} setReturnData={setReturnData} openReturn={openReturn} setReturn={setReturn}></ReturnPOpModal>
}


      </View>
  
  );
}
const styles = StyleSheet.create({
  container: {
    height:'87%',
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
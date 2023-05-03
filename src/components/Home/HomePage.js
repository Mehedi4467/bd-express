import React, { useEffect, useState } from 'react';
import { View,Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { verifyTracking } from '../../api/BookingApi/VerifyTracking';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
const HomePage = ({setCode,code}) => {
  const navigation = useNavigation();
  // const [selectedOption, setSelectedOption] = useState(null);
  // const [checkID,setCheckId]=useState('');
  const [inputCode,setInputCode]=useState(code || '');
  // console.log('check',finalCode.length <=0 ?checkID : finalCode[checkID]);
const [trackingMsg,setTrackingMsg]=useState('');
const [trackingLoading,setTRackingLoading]=useState(false);
const [trackingVerifyData,setTrackingVerifyData]=useState([]);


  const handlePress = () => {
    navigation.navigate('booking',{id:inputCode})
  }

// const handleArrayUpdate=(value,index)=>{

// const newArray = [...finalCode];
// newArray[index] = value; 
// setFinalCode(newArray);
//   }

  // const handleOptionPress = (option,value) => {
  //   setSelectedOption(option);
  //     setCheckId(option);
 
  // };

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
    // onChange={(value)=>setInputCode(value)}
    value={inputCode}
    placeholder="Enter Bar Code"
  />

 

<TouchableOpacity style={{position:'absolute',right:10,top:10}} onPress={()=>searchTrackingId()} >
<Icon name="search" size={20} color="#000" />
</TouchableOpacity>
       </View>



{/* {

finalCode.length <=0 ? <TextInput 
style={styles.input}
onChangeText={(value)=>setCheckId(value)}
placeholder="Enter Bar Code"
/> :
finalCode.map((item,index)=>
<View key={index}>
<View  style={{ flexDirection: 'row', alignItems: 'center',width:'80%' }}>
  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => handleOptionPress(index,item)}>
    <Text style={{ fontSize: 40,marginBottom:25,marginRight:10 }}>{selectedOption === index ? '◉' : '○'}</Text>
  </TouchableOpacity>
  <TextInput 

  style={styles.input}
  onChangeText={(value)=>handleArrayUpdate(value,index)}
  // onChange={(e)=>handleArrayUpdate(e.target.value,index)}
  value={finalCode[index]}
  placeholder="Enter Bar Code"
/>
</View>

</View>)
} */}


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
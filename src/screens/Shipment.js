import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { setShipmentApi } from '../api/Shipment/SetShipmentApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auxDataApi } from '../api/Shipment/VerifyShipment';
import Icon from 'react-native-vector-icons/FontAwesome';
import { verifyUserPath } from '../api/Auth/allPathVerify';
import { pathLogOutApi } from '../api/Auth/pathLogOut';
import TopNavbar from '../components/Home/TopNavbar';
import LoadingScreen from '../screens/LoadingScreen';
const Shipment = ({navigation}) => {
  const [text, setText] = useState('');
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState('');
const [shipmentVeryfy,setVerify]=useState(false);
const [totalData,setTotalData]=useState([]);
const [number, setNumber] = useState('');
const [addLoading,setAddLoading]=useState(false);
const [UpdateData,setUpdateData]=useState(false);
const [isNavOpen, setIsNavOpen] = useState(false);
const [isLoading,setIsLoading]=useState(false);

const handleClick = async() => {
  setAddLoading(true);
  const newNumber = (parseInt(number) + 1).toString().padStart(5, '0');
  setNumber(newNumber);

if(newNumber){
  const x = await AsyncStorage.getItem('user');
  const userInfo = JSON.parse(x);
  const id = {
    shipment_id:newNumber
  }
  const setDAta = await setShipmentApi(id,userInfo?.user, userInfo?.access_token);

  if(setDAta?.status === "Accepted"){
    setAddLoading(false);
    setUpdateData(!UpdateData);
    setError('');
  }else{
    setError(setDAta?.msg?.shipment_id || ['Something want wrong!']);
    setAddLoading(false);
  }
}else{
  setError(['Something want wrong!']);
}



};

  const result = async() => {
    setIsLoading(true);
    const verifyShipment = await auxDataApi();
    // console.log(verifyShipment?.data?.open_shipment)
    if(verifyShipment?.status === "Accepted" && verifyShipment?.data?.current_shipment){
      setVerify('yes');
      setTotalData(verifyShipment?.data?.total_shipment);
      setNumber(verifyShipment?.data?.open_shipment);
      setIsLoading(false);
    }
    else{
      setVerify('no');
      setIsLoading(false);
    }

  };


  useEffect(()=>{
    result();
  },[UpdateData])
  

  const handleSubmit = async() => {
    const x = await AsyncStorage.getItem('user');
  const userInfo = JSON.parse(x);
    const id = {
      shipment_id:text
    }
    setLoading(true);
    if(text){
      const setDAta = await setShipmentApi(id,userInfo?.user, userInfo?.access_token);
      if(setDAta?.status === "Accepted"){
        navigation.navigate('Home', {name: 'Home'});
        setLoading(false);
      }else{
        setError(setDAta?.msg?.shipment_id || ['Something want wrong!']);
        setLoading(false);
      }

    }else{
      setError(['You must give ID'])
      setLoading(false)
    }
 
  };



const viewCarton = async(id)=>{

  const x = await verifyUserPath();
  if(!x?.status || x?.exception === 'yes'){
    pathLogOutApi();
    navigation.navigate('Login');
  }else{
    navigation.navigate('view_carton',{id:id})
  }

}



  return (
    <>
  <View style={{backgroundColor:'#fff',position:'relative',zIndex:1}}>
      <TopNavbar setIsNavOpen={setIsNavOpen} isNavOpen={isNavOpen} navigation={navigation}></TopNavbar>
  </View>

    {
      isLoading ? <View style={{marginTop:40}}>
      <LoadingScreen></LoadingScreen>
     </View> : 
    shipmentVeryfy === 'yes' ?
    <ScrollView style={{marginTop:20}}>
<View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'flex-end'}}>
{
        addLoading ? <TouchableOpacity style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',margin:8,backgroundColor:'#00aeef',padding:7,opacity:.5,borderRadius:25, padding:7,height:50,width:50}} >
        <ActivityIndicator size="small" color="#0000ff" />
        </TouchableOpacity>: <TouchableOpacity style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',margin:8,backgroundColor:'#00aeef',borderRadius:25, padding:7,height:50,width:50}}  onPress={handleClick}>
        <Icon style={{textAlign:'center'}}  name="plus-circle" size={20} color="white" />
         </TouchableOpacity>
      }
</View>
      
      {
        totalData?.map((item,index)=><View key={index} style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',padding:10,backgroundColor:'white',margin:8}}>
        <Text>{item?.shipment}</Text>
        <TouchableOpacity style={{backgroundColor:'#00aeef',borderRadius:5,padding:4}} onPress={()=>viewCarton(item?.shipment)}>
        <Text style={{color:'#fff'}}>View Carton</Text>
        </TouchableOpacity>
      </View>)
      }


{
  error ? <Text style={{color:'red',textAlign:'center'}}>{error[0]}</Text> : ''
}

      </ScrollView>: shipmentVeryfy === 'no' ?  <View style={styles.card}>
    <Text style={{textAlign:'center',fontSize:20,marginBottom:20}}>Set Shipment</Text>
    <TextInput
      style={styles.input}
      placeholder="00001"
      onChangeText={setText}
      value={text}
    />
    {
      error ?  <View >{error.map((item,index)=><Text key={index} style={{textAlign:'center',color:'red',marginBottom:10}}>{`\u2022 ${item}`}</Text>)}</View>: ''
    }
   
{
loading ? <TouchableOpacity style={styles.buttonActive} >
<ActivityIndicator size="small" color="#0000ff" />
</TouchableOpacity>: <TouchableOpacity style={styles.button}  onPress={handleSubmit}>
<Text style={{color:'#fff'}}>SET</Text>
 </TouchableOpacity>
}
  </View> : ''
  
    }

  
  
</>

  );
};
export default Shipment;
const styles = StyleSheet.create({
  card: {
    position:'absolute',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    top:'30%',
    left:"10%",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '80%',
    maxWidth: 400,
    
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonActive: {
    width: '100%',
    height: 50,
    backgroundColor: '#00aeef',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    opacity:.5
  },
  button:{
    width: '100%',
    height: 50,
    backgroundColor: '#00aeef',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,

   
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
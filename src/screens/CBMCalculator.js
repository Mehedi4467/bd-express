import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, TextInput } from 'react-native-paper';
import TopNavbar from '../components/Home/TopNavbar';
import { SubmitShipmentApi } from '../api/Cbm/submitCBM';
import { verifyUserPath } from '../api/Auth/allPathVerify';
import ErrorModal from '../components/Modal/ErrorModal';
import { auxCBMDataApi } from '../api/Cbm/setCBM';

export default function CBMCalculator({route,navigation}) {
  const [auxData,setAuxData]=useState([]);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [length,setLength]=useState(0);
  const [width,setwidth]=useState(0);
  const [height,setheigth]=useState(0);
  const [loading,setLoading]=useState(false);
  const [errorMsg,setErrorMsg]=useState(false);

  const auxDataapi = async(value1,value2) =>{
    const data = await auxCBMDataApi(value1,value2);
    setAuxData(data?.data?.cbm_on_carton?.details[0]);
    setLength(data?.data?.cbm_on_carton?.details[0]?.length);
    setwidth(data?.data?.cbm_on_carton?.details[0]?.width);
    setheigth(data?.data?.cbm_on_carton?.details[0]?.height);

  }

  useEffect(()=>{
    if(route?.params?.id){
      auxDataapi('',route?.params?.id);
    }

  },[route?.params?.id]);


const subMiteCBM =async()=>{
  setLoading(true);
  if(length && width && height){
    const cbmCal = (+length * +width * +height) / 1000000;
    // console.log(cbmCal);
    const allData  = {
      carton : route?.params?.id,
      length:+length,
      width:+width,
      height:+height,
      cbm:cbmCal
    }

  const x = await verifyUserPath();
  if(!x?.status || x?.exception === 'yes'){
    pathLogOutApi();
    navigation.navigate('Login');
  }else{
    const cbmSubmited = await SubmitShipmentApi(allData);
    if(cbmSubmited?.status){
     navigation.navigate('view_carton');
     setLoading(false);
    }else{
    //  console.log("somthing want wrong");
     setErrorMsg('somthing want wrong');
    //  setLoading(false);
    }
  }

  }else{
    setErrorMsg('You must fill all fields!');
  }
}
const UpdatesubMiteCBM =async()=>{
  setLoading(true);
  if(length && width && height){
    const cbmCal = (+length * +width * +height) / 1000000;
    // console.log(cbmCal);
    const allData  = {
      carton : route?.params?.id,
      length:+length,
      width:+width,
      height:+height,
      cbm:cbmCal
    }

  const x = await verifyUserPath();
  if(!x?.status || x?.exception === 'yes'){
    pathLogOutApi();
    navigation.navigate('Login');
  }else{
    const cbmSubmited = await SubmitShipmentApi(allData);
    if(cbmSubmited?.status){
     navigation.navigate('cbm');
     setLoading(false);
    }else{
    //  console.log("somthing want wrong");
     setErrorMsg('somthing want wrong');
    //  setLoading(false);
    }
  }

  }else{
    setErrorMsg('You must fill all fields!');
  }
}


  return (
    <>

    <View style={{backgroundColor:'#fff',position:'relative',zIndex:1}}>
        <TopNavbar setIsNavOpen={setIsNavOpen} isNavOpen={isNavOpen} navigation={navigation}></TopNavbar>
    </View>


    <View>
     <View style={styles.card}>
    <Text style={{textAlign:'center',fontSize:20,marginBottom:20}}>CBM Calculator</Text>

<View style={{marginBottom:10}}>
    <TextInput
      mode="outlined"
      textColor="black"
      label="Length"
      keyboardType="numeric"
      style={{backgroundColor:'#fff'}}
      placeholder="Length"
      
      value={length?.toString()}
      // defaultValue={auxData?.length?.toString()}
      right={<TextInput.Affix text="(cm)" />}
      onChangeText={(value)=>setLength(value)}
    />
    </View>
    <View style={{marginBottom:10}} >
    <TextInput
      mode="outlined"
      textColor="black"
      keyboardType="numeric"
      label="Width"
      value={width?.toString()}
      style={{backgroundColor:'#fff'}}
      placeholder="Width"
      onChangeText={(value)=>setwidth(value)}
      right={<TextInput.Affix text="(cm)" />}
    />
  
    </View>
    <View style={{marginBottom:10}} >
    <TextInput
      mode="outlined"
      keyboardType="numeric"
      style={{backgroundColor:'#fff'}}
      label="Height"
      textColor="black"
      value={height?.toString()}
      placeholder="Height"
      onChangeText={(value)=>setheigth(value)}
      right={<TextInput.Affix text="(cm)" />}
    />
  
    </View>

    {
      loading ?  <TouchableOpacity style={{backgroundColor:'#00aeef',padding:10,borderRadius:5}}>
      <ActivityIndicator size="small" color="#0000ff" />
      </TouchableOpacity> : auxData?.length ?  <TouchableOpacity style={{backgroundColor:'#00aeef',padding:10,borderRadius:5}} onPress={()=>UpdatesubMiteCBM()} >
          <Text style={{color:'#fff',textAlign:'center'}}>Update CBM</Text>
      </TouchableOpacity> : <TouchableOpacity style={{backgroundColor:'#00aeef',padding:10,borderRadius:5}} onPress={()=>subMiteCBM()} >
          <Text style={{color:'#fff',textAlign:'center'}}>CBM Submit</Text>
      </TouchableOpacity>
    }

  </View>
    </View>

    {
 errorMsg &&  <ErrorModal errorMsg={errorMsg} setLoading={setLoading} setErrorMsg={setErrorMsg}></ErrorModal>
}
    </>
  )
}


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
   
        top:'50%',
        left:"10%",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '80%',
        maxWidth: 400,
        marginTop:100
      },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 10,
      backgroundColor:'#fff'
    },
  
  });
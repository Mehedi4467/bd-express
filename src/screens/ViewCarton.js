import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Card } from 'react-native-paper'
import { auxCBMDataApi } from '../api/Cbm/setCBM';
import LoadingScreen from './LoadingScreen';
import { verifyUserPath } from '../api/Auth/allPathVerify';
import { pathLogOutApi } from '../api/Auth/pathLogOut';
import TopNavbar from '../components/Home/TopNavbar';

export default function ViewCarton({route,navigation}) {
const [boxData,setBoxData]=useState([]);
const [loading,setLoading]=useState(false);
const [isNavOpen, setIsNavOpen] = useState(false);

const viwCartDetails = async(value)=>{
    setLoading(true);
  const auxData =  await auxCBMDataApi(value,'');
  setBoxData(auxData?.data?.shipment_based_carton?.status ? auxData?.data?.shipment_based_carton?.carton :  []);
  setLoading(false);
}

    useEffect(()=>{
        if(route?.params?.id){
            viwCartDetails(route?.params?.id);
        }
    },[route?.params?.id]);


    const CBMCalculator =async(box_no)=>{
        const x = await verifyUserPath();
        if(!x?.status || x?.exception === 'yes'){
          pathLogOutApi();
          navigation.navigate('Login');
        }else{
          navigation.navigate('setCbm',{id:box_no})
        }
    }

  return (

    <>
     <View style={{backgroundColor:'#fff',position:'relative',zIndex:1}}>
    <TopNavbar setIsNavOpen={setIsNavOpen} isNavOpen={isNavOpen} navigation={navigation}></TopNavbar>
    </View>
    <ScrollView>

        {
           loading ? <View style={{marginTop:20}}>
            <LoadingScreen></LoadingScreen>
           </View> :    <>
           {
              boxData && boxData?.map((item,index)=> <View key={index} style={{backgroundColor:'white',marginHorizontal:10,marginTop:8,marginBottom:8}}>
               <Card style={{backgroundColor:'white'}} >
                   <Card.Content>
                      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                      <Text variant="titleLarge">{item?.box_no}</Text>
                       <TouchableOpacity style={{backgroundColor:'#00aeef',borderRadius:5,padding:4}} onPress={()=>CBMCalculator(item?.box_no)} >
                           <Text style={{color:'#fff'}}>Set CBM</Text>
                       </TouchableOpacity>
                      </View>
                   </Card.Content>
               </Card>
               </View >)
           }
           </>
        }

     
     
   
     
        
    </ScrollView>

    </>
  )
}
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import TopNavbar from '../components/Home/TopNavbar'
import { Card, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { auxDataApi } from '../api/Shipment/VerifyShipment';
import { pathLogOutApi } from '../api/Auth/pathLogOut';
import { verifyUserPath } from '../api/Auth/allPathVerify';
import { auxCBMDataApi } from '../api/Cbm/setCBM';
import LoadingScreen from './LoadingScreen';
export default function CbmScreen({navigation}) {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [boxNumber ,setBoxNumber]=useState('');
    const [loading,setLoading]=useState(false);
    const [searchData,setSearchData]=useState('');
    const searchBox = async(value)=>{
        setLoading(true);
        if(value){
            const x = await verifyUserPath();
            if(!x?.status || x?.exception === 'yes'){
                pathLogOutApi();
                navigation.navigate('Login');
                setLoading(false);
            }else{
                const y = await auxCBMDataApi('',value);
                setSearchData(y?.data?.cbm_on_carton?.details[0]);
                setLoading(false);
            }
        }else{
            console.log('Someting want wrong');
            setLoading(false);
        }
    }


    useEffect(()=>{
        if(!boxNumber){
            setSearchData('')
        }
    },[boxNumber])

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
    <View>
    <View style={{backgroundColor:'#fff',position:'relative',zIndex:1}}>
    <TopNavbar setIsNavOpen={setIsNavOpen} isNavOpen={isNavOpen} navigation={navigation}></TopNavbar>
    </View>


    <View style={{marginHorizontal:10,marginTop:30}}>
    <View style={{width:'100%',position:'relative'}}>
      <TextInput
          style={styles.input}
          textColor="black"
          value={boxNumber}
          onChangeText={(value)=>setBoxNumber(value)}
          placeholder="Enter Carton Number"
    />
      <TouchableOpacity style={{position:'absolute',backgroundColor:'#00aeef',width:60,height:40,flexDirection:'row',alignItems:'center',justifyContent:'center', borderRadius:5, right:0,top:0}} onPress={()=>searchBox(boxNumber)} >
      <Icon name="search" size={20} color="#fff" />
      </TouchableOpacity>
      </View>

      <View>
        {
           !boxNumber || !searchData ? <Card style={{backgroundColor:'#fff'}}>
            <Card.Content>
                {
                    loading ? <View style={{paddingVertical:10}}><LoadingScreen></LoadingScreen></View> : <Text style={{textAlign:'center'}} variant="titleLarge">Search Carton Number</Text>
                }
            </Card.Content>
        </Card> : <Text></Text>
        }
        {
            boxNumber && searchData?.height !== null && searchData?.height ?  <Card style={{backgroundColor:'#fff'}}>
            <Card.Content>
                {
                    searchData?.height !== null ? <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text>{boxNumber}</Text>
                        <TouchableOpacity style={{backgroundColor:'#00aeef',borderRadius:5,padding:4}} onPress={()=>CBMCalculator(boxNumber)} >
                           <Text style={{color:'#fff'}}>Update CBM</Text>
                       </TouchableOpacity>
                    </View> : <Text style={{textAlign:'center'}} variant="titleLarge">Search Carton Number</Text>
                }
            </Card.Content>
        </Card> : <Text></Text>
        }
        {
           boxNumber && searchData?.height === null && !searchData?.height &&  <Card style={{backgroundColor:'#fff'}}>
            <Card.Content>
                {
                    loading ? <View style={{paddingVertical:10}}><LoadingScreen></LoadingScreen></View> : <Text style={{textAlign:'center'}} variant="titleLarge">Carton Not Found!</Text>
                }
            </Card.Content>
        </Card>
        }
       
      </View>


    </View>
    </View>
  )
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
      backgroundColor:'#fff',
      color:'black'
    },
  });
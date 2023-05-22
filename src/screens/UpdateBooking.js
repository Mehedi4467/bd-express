import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import TopNavbar from '../components/Home/TopNavbar'
import { viewUpdate } from '../api/BookingApi/updateBookingGetApi';
import GeneralUpdateBooking from '../components/BookingComponent/GeneralUpdateBooking';
import { auxDataApi } from '../api/Shipment/VerifyShipment';
import LoadingScreen from './LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartonUpdateBooking from '../components/BookingComponent/CartonUpdateBooking';
import { ActivityIndicator, Provider } from 'react-native-paper';
import Currency from '../components/Modal/Currency';
import BookingItemUpdateModal from '../components/Modal/BookingItemUpdateModal';
import { imagesubmitBookingApi } from '../api/BookingApi/imageUpload';
import { submitBookingApi } from '../api/BookingApi/SubmitApi';
import { UpdateFinalArray } from '../utility/UpdateArrayBeautify';
import Congo from '../components/Modal/Congro';
import ErrorModal from '../components/Modal/ErrorModal';
import ReturnModal from '../components/Modal/ReturnModal';
import { submitReturnApi } from '../api/BookingApi/returnApi';
import UpdateCurrency from '../components/Modal/UpdateCurrency';
const MemoizedCartonComponent = React.memo(CartonUpdateBooking);



export default function UpdateBooking({route,navigation}) {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [loading,setLoading]=useState(false);
    const [paymentCurrency,setPaymentCurrency]=useState({
        id:'',
        currency:false,
        amount: 0
      });
      const [screenLoading,setScreen]=useState(false);
      const [errorMsg,setErrorMsg]=useState('');
      const [country,setCountry]=useState('');
      const [primaryData,setprimaryData]=useState(false);
      const [shippingMark,setShippingMark]=useState('');
      const [Shipment,setShipment]=useState('');
      const [input1, setInput1] = useState('');
      const [checked, setChecked] = useState('');
      const [extraWork,setExtraWork]=useState('None');
      const [visibleCurrency, setVisiblecurrency] =useState(false);
      const [visible, setVisible] = useState(false);
      const [openINdex,setOpenIndex]=useState(0);
      const [formValues, setFormValues] = useState([]);
      const [congoMsg,setCongoMsg]=useState(false);
      const [openReturnModal,setReturnModal]=useState(false);
      const [reason,setReason]=useState('');

      const [returnLoading,setREturnLoading]=useState(false);
      const [returnError,setReturnError]=useState('');

    const updateGetDAta = async(bookingId,trackingID)=>{
    const z = await viewUpdate(bookingId);
    setPaymentCurrency(z?.data?.primary_data?.extra_work);
    setShippingMark(z?.data?.primary_data?.shipping_mark?.client);
    setShipment(z?.data?.primary_data?.shipment);
    setInput1(trackingID);
    setExtraWork(z?.data?.primary_data?.extra_work?.id);
    setChecked(z?.data?.primary_data?.shipping_mark?.company_mark);
    setFormValues(z?.data?.carton_data);
}


useEffect(()=>{
    if(route?.params?.BookingID){
        updateGetDAta(route?.params?.BookingID,route?.params?.trackingID);
    }
},[route?.params?.BookingID]);

const userDetails = useCallback(async() => {
    const x = await AsyncStorage.getItem('user');
    const userInfo = JSON.parse(x);
    setCountry(userInfo?.country)
  }, []);
  
  
  useEffect(()=>{
    userDetails();
  },[]);

  useEffect(()=>{
    if(extraWork ==="Payment"){
      setVisiblecurrency(true)
    }
  },[extraWork]);

  const showModal = useCallback((value) => {
    if(value == formValues[value]?.item[0]?.index){
      setVisible(true);
      setOpenIndex(value);
    }
  },[formValues]) 


const auxData = async()=>{
    const data =await auxDataApi();
    // console.log(data)
    setprimaryData(data);
    // setChecked(data?.data?.shipping_company[0]?.shipping_mark)
  }
  useEffect(()=>{
    auxData()
  },[route?.params?.BookingID])


  const submitBookingData = async()=>{
    setLoading(true);
    const finatData = UpdateFinalArray(formValues);
    if(input1 && Shipment && paymentCurrency && checked && shippingMark && country && finatData){
      const submitData = {
        tracking_id:input1,
        booking:route?.params?.BookingID,
        shipment:Shipment,
        box_route:{
          origin:country,
          destination:"BD"
      },
        extra_work: paymentCurrency,
        shipping_mark :{
        company_mark:checked,
        client:shippingMark
        },
        cartons:finatData?.cartons,
        mother_carton:finatData?.mother_carton,
      }
  
  
      const dataSubmit = await submitBookingApi(submitData);
      // setCongoMsg(true);
      setLoading(false);
      setErrorMsg('');
  
      if(dataSubmit?.status){
        if(route?.params?.TRimg && dataSubmit?.booking_id){
          const formData = new FormData();
          formData.append('file', {
            uri: route?.params?.TRimg,
            type: 'image/jpeg',
            name: 'image.jpg',
          });
          formData.append('booking_id',dataSubmit?.booking_id);
          const submittedImage = await imagesubmitBookingApi(formData);
            if(submittedImage?.status){{
              setCongoMsg(true);
              setLoading(false);
              setErrorMsg('');
            }}
        }else{
          setCongoMsg(true);
          setLoading(false);
          setErrorMsg('');
        }
      }else{
        setErrorMsg('Something want wrong. Please try again!');
        setLoading(false);
        setCongoMsg(false);
      }
     
    } 
    else{
      console.log('error');
      setLoading(false);
      setErrorMsg('');
      setErrorMsg('You must fill all fields!');
    }
  
  }


  const submitReturnREson = async()=>{
    setREturnLoading(true);
    if(reason && route?.params?.trackingID){
      const value = {
        tracking_id:route?.params?.trackingID,
        reason:reason
      }
      const returnReson = await submitReturnApi(value);

      if(returnReson?.status){
        setReturnError('');
        navigation.navigate('Home');
        setREturnLoading(false);
      }else{
        setReturnError("Something want wrong!!");
        setREturnLoading(false);
      }
      
    }
    setReturnError("Please Write Return Reason!");
    setREturnLoading(false);
  }



  return (
    <Provider>
    <View style={{backgroundColor:'#fff',position:'relative',zIndex:1}}>
      <TopNavbar setIsNavOpen={setIsNavOpen} isNavOpen={isNavOpen} navigation={navigation}></TopNavbar>
     </View>
     {
        primaryData ? <ScrollView>
          <View style={{flex: 1,marginHorizontal:10,marginTop:10}}>
        <View>
          <GeneralUpdateBooking paymentCurrency = {paymentCurrency} setCountry={setCountry} country={country} primaryData={primaryData} setPaymentCurrency={setPaymentCurrency}  input1={input1} setInput1={setInput1} checked={checked} setChecked={setChecked} extraWork={extraWork} setExtraWork={setExtraWork} shippingMark={shippingMark} setShippingMark={setShippingMark} Shipment={Shipment} setShipment={setShipment}  >
          </GeneralUpdateBooking> 
        </View>

        <View style={{marginBottom:30,paddingBottom:20,zIndex:-1}}>
            <MemoizedCartonComponent  showModal={showModal} formValues={formValues} setFormValues={setFormValues} ></MemoizedCartonComponent>
        </View>
        </View>
    </ScrollView>   : <View style={{marginTop:40}}><LoadingScreen></LoadingScreen></View>
     }


      {
        congoMsg &&  <Congo   setCongoMsg={setCongoMsg} navigation={navigation}></Congo>
      }
 

    
        {
        errorMsg &&  <ErrorModal errorMsg={errorMsg} setLoading={setLoading} setErrorMsg={setErrorMsg}></ErrorModal>
        }


        {
          visible && <BookingItemUpdateModal style={{height:100}} setVisible={setVisible} openINdex={openINdex} formValues={formValues} setFormValues={setFormValues} visible={visible}></BookingItemUpdateModal>
        }



<View style={{position:'absolute',bottom:0,width:'100%',backgroundColor:'#fff'}}>
     <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between',gap:5}}>
     <View style={{width:'40%'}}>
       <TouchableOpacity
        style={{
          backgroundColor: '#d90429',
          padding: 15,
          borderTopLeftRadius:5,
          borderTopRightRadius:5,
          alignItems: 'center',
          justifyContent: 'center',
          width:"100%"
        }}
        onPress={() => setReturnModal(true)}
        >
        <Text style={{ color: 'white', fontSize: 16 }}>Return</Text>
    </TouchableOpacity>
       </View>
    <View style={{width:'60%'}}>
    {
        loading ?  <TouchableOpacity style={styles.buttonActive} >
        <ActivityIndicator size="small" color="#0000ff" />
        </TouchableOpacity> :  <TouchableOpacity
        style={{
          backgroundColor: '#00aeef',
          padding: 15,
          borderTopLeftRadius:5,
          borderTopRightRadius:5,
          alignItems: 'center',
          justifyContent: 'center',
          width:"100%"
        }}
        onPress={() => submitBookingData()}
        >
        <Text style={{ color: 'white', fontSize: 16 }}>Update Booking</Text>
    </TouchableOpacity>
      }
    </View>
     </View>
    </View>


    

      {
       openReturnModal &&  <ReturnModal returnError={returnError} setReturnError={setReturnError} returnLoading={returnLoading} submitReturnREson={submitReturnREson} setReason={setReason} openReturnModal={openReturnModal} setReturnModal={setReturnModal}></ReturnModal>
      }


        {
          extraWork === "Payment" && <UpdateCurrency visibleCurrency={visibleCurrency} showModal={showModal} setVisiblecurrency={setVisiblecurrency} extraWork={extraWork} setPaymentCurrency={setPaymentCurrency} paymentCurrency={paymentCurrency}></UpdateCurrency>
        }


    </Provider>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  buttonActive: {
    width: '100%',
    height: 50,
    backgroundColor: '#00aeef',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius:5,
    borderTopRightRadius:5,
    opacity:.5
  },
});

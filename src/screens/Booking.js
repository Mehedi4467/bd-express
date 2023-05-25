import { View, StyleSheet,ScrollView, TouchableOpacity, Text } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Provider } from 'react-native-paper';
import GeneralBooking from '../components/BookingComponent/GeneralBooking';
import CartonDetails from '../components/BookingComponent/CartonDetails';
import BookingItemModal from '../components/Modal/BookingItemModal';
import Currency from '../components/Modal/Currency';
// import MyContext from '../utility/MyContext';
import { submitBookingApi } from '../api/BookingApi/SubmitApi';
import Congo from '../components/Modal/Congro';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ErrorModal from '../components/Modal/ErrorModal';
import { FinalArray } from '../utility/ArrayBeutify';
const MemoizedCartonComponent = React.memo(CartonDetails);
import LoadingScreen from '../screens/LoadingScreen';
import TopNavbar from '../components/Home/TopNavbar';
import { imagesubmitBookingApi } from '../api/BookingApi/imageUpload';
import { auxDataApi } from '../api/Shipment/VerifyShipment';
import ReturnModal from '../components/Modal/ReturnModal';
import { submitReturnApi } from '../api/BookingApi/returnApi';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



export default function Booking({route,navigation}) {
  const [screenLoading,setScreen]=useState(false);
  const [loading,setLoading]=useState(false);
  const [errorMsg,setErrorMsg]=useState('');
  const [congoMsg,setCongoMsg]=useState(false);
  const [input1, setInput1] = useState(route?.params?.id || '');
  const [extraWork,setExtraWork]=useState('None');
  const [shippingMark,setShippingMark]=useState('');
  const [Shipment,setShipment]=useState('');
  const [primaryData,setprimaryData]=useState([]);
  const [openReturnModal,setReturnModal]=useState(false);
  const [returnLoading,setREturnLoading]=useState(false);
  const [returnError,setReturnError]=useState('');
  const [reason,setReason]=useState('');
  const [extraWorkData,setExtraWorkData]=useState([{
    name:'None',
    status:true,
  }]);

  const [SpecialPacking,setSpecialPacking]=useState({
    name:'',
    status:false,
  })
  const [ProductInspection,setProductInspection]=useState({
    name:'',
    status:false,
  })
  const [PackedbyWarehouse,setPackedbyWarehouse]=useState({
    name:'',
    status:false,
  })

  const [payment,setPayment]=useState({
    name:'',
    status:false
  });


useEffect(()=>{
const extraData = [SpecialPacking,ProductInspection,PackedbyWarehouse,payment];
const exist = extraData?.filter(item => item?.status && item);
setExtraWorkData(exist);
},[SpecialPacking,ProductInspection,PackedbyWarehouse,payment])


// console.log(extraWorkData)

  const auxData = async()=>{
    const data =await auxDataApi();
    setprimaryData(data)
  }
  useEffect(()=>{
    auxData()
  },[route?.params?.id])

  const [country,setCountry]=useState('');
  const [checked, setChecked] = useState(primaryData?.data?.shipping_company[0]?.shipping_mark || '');
  const [visibleCurrency, setVisiblecurrency] =useState(false);
  const [image,setImage]=useState(route?.params?.TRimg);
  const [paymentCurrency,setPaymentCurrency]=useState({
    id:extraWork,
    currency:false,
    amount: 0
  });



useEffect(()=>{
  if(primaryData?.status=== "Accepted"){
    setScreen(false);
  }else{
    setScreen(true)
  }
},[primaryData])

const [formValues, setFormValues] = useState([]);
const [openINdex,setOpenIndex]=useState(0);
const [visible, setVisible] = useState(false);
const [isNavOpen, setIsNavOpen] = useState(false);




const userDetails = useCallback(async() => {
  const x = await AsyncStorage.getItem('user');
  const userInfo = JSON.parse(x);
  setCountry(userInfo?.country)
}, []);


useEffect(()=>{
  userDetails();
},[])


const showModal = useCallback((value) => {
  if(value == formValues[value]?.items[0]?.index){
    setVisible(true);
    setOpenIndex(value);
  }
},[formValues]) 


useEffect(()=>{
  setImage(route?.params?.TRimg)
},[route?.params?.TRimg])


useEffect(()=>{
  // setRefatchData(!refetchDatar);
  setChecked(primaryData?.data?.shipping_company[0]?.shipping_mark) 
},[route?.params?.id,primaryData])



useEffect(()=>{
  if(extraWork ==="Payment"){
    setVisiblecurrency(true)
  }
},[extraWork]);



const submitBookingData = async()=>{
  setLoading(true);
  const finatData = FinalArray(formValues)

  if(input1 && Shipment && checked && shippingMark && country && finatData){
    const submitData = {
      tracking_id:input1,
      booking:false,
      shipment:Shipment,
      box_route:{
        origin:country,
        destination:"BD"
    },
      extra_work: extraWorkData,
      shipping_mark :{
      company_mark:checked,
      client:shippingMark
      },
      cartons:finatData?.cartons,
      mother_carton:finatData?.mother_carton,
    }


    const dataSubmit = await submitBookingApi(submitData);
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
    setErrorMsg('You must fill all fields!');
  }

}



const submitReturnREson = async()=>{
  setREturnLoading(true);
  if(reason && route?.params?.id){
    const value = {
      tracking_id:route?.params?.id,
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
    screenLoading ? <LoadingScreen></LoadingScreen>: <KeyboardAwareScrollView extraScrollHeight={200} enableOnAndroid={true} 
    scrollToOverflowEnabled={true}
    enableAutomaticScroll={true} scrollEnabled={!visible}>
    <View style={styles.container}>
      <View>
        <GeneralBooking paymentCurrency = {paymentCurrency} setCountry={setCountry} country={country} primaryData={primaryData} setPaymentCurrency={setPaymentCurrency} input1={input1} setInput1={setInput1} checked={checked} setChecked={setChecked} extraWork={extraWork} setExtraWork={setExtraWork} shippingMark={shippingMark} setShippingMark={setShippingMark} Shipment={Shipment} setShipment={setShipment} setPayment={setPayment} payment={payment} setPackedbyWarehouse={setPackedbyWarehouse} PackedbyWarehouse={PackedbyWarehouse} setProductInspection={setProductInspection} ProductInspection={ProductInspection} setSpecialPacking={setSpecialPacking} SpecialPacking={SpecialPacking} >
        </GeneralBooking>
      </View>
      <View style={{marginBottom:30,paddingBottom:20,zIndex:-1}}>
        <MemoizedCartonComponent showModal={showModal} formValues={formValues} setFormValues={setFormValues} ></MemoizedCartonComponent>
      </View>
    </View>
</KeyboardAwareScrollView >

  }
 

    {
      visible && <BookingItemModal style={{height:100}} setVisible={setVisible} openINdex={openINdex} formValues={formValues} setFormValues={setFormValues} visible={visible}></BookingItemModal>
    }


    {
      congoMsg &&  <Congo   setCongoMsg={setCongoMsg} navigation={navigation}></Congo>
    }
 

    
    {
    errorMsg &&  <ErrorModal errorMsg={errorMsg} setLoading={setLoading} setErrorMsg={setErrorMsg}></ErrorModal>
    }


    {
       openReturnModal &&  <ReturnModal returnError={returnError} setReturnError={setReturnError} returnLoading={returnLoading} submitReturnREson={submitReturnREson} setReason={setReason} openReturnModal={openReturnModal} setReturnModal={setReturnModal}></ReturnModal>
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
                          <Text style={{ color: 'white', fontSize: 16 }}>Submit Booking</Text>
                      </TouchableOpacity>
                  }
          </View>
        </View>
    
 
    </View>

    <Currency setPayment={setPayment} visibleCurrency={visibleCurrency} showModal={showModal} setVisiblecurrency={setVisiblecurrency} extraWork={extraWork} setPaymentCurrency={setPaymentCurrency}></Currency>

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
  
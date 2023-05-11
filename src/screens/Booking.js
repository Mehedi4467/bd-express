import { View, StyleSheet,ScrollView, TouchableOpacity, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Provider } from 'react-native-paper';
import GeneralBooking from '../components/BookingComponent/GeneralBooking';
import CartonDetails from '../components/BookingComponent/CartonDetails';
import BookingItemModal from '../components/Modal/BookingItemModal';
import Currency from '../components/Modal/Currency';
import MyContext from '../utility/MyContext';
import { submitBookingApi } from '../api/BookingApi/SubmitApi';

export default function Booking({route}) {
  const [loading,setLoading]=useState(false);
  const [errorMsg,setErrorMsg]=useState('');
  const { primaryData, setRefatchData,refetchDatar } = useContext(MyContext);
  const [input1, setInput1] = useState(route?.params?.id || '');
  const [extraWork,setExtraWork]=useState('None');
  const [shippingMark,setShippingMark]=useState('');
  const [Shipment,setShipment]=useState('');
  const [visible, setVisible] = useState();
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [ModalValue, setModalValue] = useState([{index: '',item: '',qty: ''},]);
  const [checked, setChecked] = useState(primaryData?.data?.shipping_company[0]?.shipping_mark || '');
  const [visibleCurrency, setVisiblecurrency] =useState(false);
  const [image,setImage]=useState(route?.params?.TRimg);
  const [paymentCurrency,setPaymentCurrency]=useState({
    id:'',
    currency:'',
    value:''
  });


// console.log('booking img',image)
// console.log(primaryData?.data?.shipping_company[0]?.shipping_mark)
// console.log(primaryData)



useEffect(()=>{
  setImage(route?.params?.TRimg)
},[route?.params?.TRimg])


useEffect(()=>{
  setRefatchData(!refetchDatar);
  setChecked(primaryData?.data?.shipping_company[0]?.shipping_mark) 
},[route?.params?.id])



useEffect(()=>{
  if(extraWork ==="Payment"){
    setVisiblecurrency(true)
  }
},[extraWork]);



const submitBookingData = async()=>{
  setLoading(true);
  const submitData = {
    shipping_mark :{
    company_mark:checked,
    client:shippingMark
    }
  }
  const data=await submitBookingApi(submitData)
  console.log('submitted',data)
}


  return (
  <Provider>

    <ScrollView scrollEnabled={!visible}>
          <View style={styles.container}>
            <View>
              <GeneralBooking primaryData={primaryData} setPaymentCurrency={setPaymentCurrency} input1={input1} setInput1={setInput1} checked={checked} setChecked={setChecked} extraWork={extraWork} setExtraWork={setExtraWork} shippingMark={shippingMark} setShippingMark={setShippingMark} Shipment={Shipment} setShipment={setShipment}  >
              </GeneralBooking>
            </View>
            <View style={{marginBottom:30,paddingBottom:20,zIndex:-1}}>
              <CartonDetails showModal={showModal} ></CartonDetails>
            </View>
          </View>
    </ScrollView >

    <BookingItemModal style={{height:100}} ModalValue={ModalValue} setModalValue={setModalValue} visible={visible} hideModal={hideModal}></BookingItemModal>

  
    <View style={{position:'absolute',bottom:0,width:'100%'}}>
  <TouchableOpacity
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
    </View>

    <Currency visibleCurrency={visibleCurrency} setVisiblecurrency={setVisiblecurrency} extraWork={extraWork} setPaymentCurrency={setPaymentCurrency}></Currency>

  </Provider>
  )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 20,
    },
  });
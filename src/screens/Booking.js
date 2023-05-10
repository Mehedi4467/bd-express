import { View, StyleSheet,ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Divider, Provider, RadioButton } from 'react-native-paper';
import GeneralBooking from '../components/BookingComponent/GeneralBooking';
import CartonDetails from '../components/BookingComponent/CartonDetails';
import BookingItemModal from '../components/Modal/BookingItemModal';
import Currency from '../components/Modal/Currency';
import MyContext from '../utility/MyContext';

export default function Booking({route}) {
  const { primaryData, setRefatchData,refetchDatar } = useContext(MyContext);
    const [input1, setInput1] = useState(route?.params?.id || '');
    const [extraWork,setExtraWork]=useState('None');
    const [shippingMark,setShippingMark]=useState('');
    const [Shipment,setShipment]=useState('');
    const [visible, setVisible] = React.useState();
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const [ModalValue, setModalValue] = useState([{index: '',item: '',qty: ''},]);
    const [paymentCurrency,setPaymentCurrency]=useState({
      id:'',
      currency:'',
      value:''
    });
    const [checked, setChecked] = React.useState(primaryData?.data?.shipping_company[0]?.shipping_mark || '');

    const [visibleCurrency, setVisiblecurrency] =useState(false);



    console.log(primaryData?.data?.shipping_company[0]?.shipping_mark)


useEffect(()=>{
  if(extraWork ==="Payment"){
    setVisiblecurrency(true)
  }
},[extraWork])



  return (
    <Provider>
    <ScrollView scrollEnabled={!visible}>
        <View style={styles.container}>
          <View>
          <GeneralBooking primaryData={primaryData} input1={input1} setInput1={setInput1} checked={checked} setChecked={setChecked} extraWork={extraWork} setExtraWork={setExtraWork} shippingMark={shippingMark} setShippingMark={setShippingMark} Shipment={Shipment} setShipment={setShipment}  ></GeneralBooking>
          </View>

          <Divider style={{marginVertical:15,padding:1}} />
          <View>
            <CartonDetails showModal={showModal} ></CartonDetails>
          </View>
        </View>
  </ScrollView >
  <BookingItemModal style={{height:100}} ModalValue={ModalValue} setModalValue={setModalValue} visible={visible} hideModal={hideModal}></BookingItemModal>

<Currency visibleCurrency={visibleCurrency} setVisiblecurrency={setVisiblecurrency} setPaymentCurrency={setPaymentCurrency}></Currency>
  </Provider>
  )
}

const styles = StyleSheet.create({
    container: {
       
      flex: 1,
      margin: 20,
    },
  });
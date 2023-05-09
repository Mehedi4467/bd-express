import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Button, Divider, Provider, RadioButton } from 'react-native-paper';
import GeneralBooking from '../components/BookingComponent/GeneralBooking';
import CartonDetails from '../components/BookingComponent/CartonDetails';
import BookingItemModal from '../components/Modal/BookingItemModal';
export default function Booking({route}) {
    console.log('router params',route?.params?.id);


    const [input1, setInput1] = useState(route?.params?.id || '');
    const [checked, setChecked] = React.useState('BD EXpress Cargo');
    const [extraWork,setExtraWork]=useState('None');
    const [shippingMark,setShippingMark]=useState('');
    const [Shipment,setShipment]=useState('');
    const [visible, setVisible] = React.useState();
    const showModal = () => setVisible(true);
  
    const hideModal = () => setVisible(false);

    const [ModalValue, setModalValue] = useState([{index: '',item: '',qty: ''},]);


console.log(ModalValue)

  return (
    <Provider>
    <ScrollView scrollEnabled={!visible}>
         

<View style={styles.container}>
<View>
<GeneralBooking input1={input1} setInput1={setInput1} checked={checked} setChecked={setChecked} extraWork={extraWork} setExtraWork={setExtraWork} shippingMark={shippingMark} setShippingMark={setShippingMark} Shipment={Shipment} setShipment={setShipment}  ></GeneralBooking>
</View>

<Divider style={{marginVertical:15,padding:1}} />

<View>
  <CartonDetails showModal={showModal} ></CartonDetails>
</View>
</View>

  </ScrollView >
  <BookingItemModal style={{height:100}} ModalValue={ModalValue} setModalValue={setModalValue} visible={visible} hideModal={hideModal}></BookingItemModal>
  </Provider>
  )
}


const styles = StyleSheet.create({
    container: {
       
      flex: 1,
      margin: 20,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    },
  
 
  });
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Divider, RadioButton } from 'react-native-paper';
import GeneralBooking from '../components/BookingComponent/GeneralBooking';
import CartonDetails from '../components/BookingComponent/CartonDetails';
export default function Booking({route}) {
    console.log('router params',route?.params?.id);


    const [input1, setInput1] = useState(route?.params?.id || '');
    const [checked, setChecked] = React.useState('BD EXpress Cargo');
    const [extraWork,setExtraWork]=useState('None');
    const [shippingMark,setShippingMark]=useState('');
    const [Shipment,setShipment]=useState('');






  return (
  
    <ScrollView >

<View style={styles.container}>
<View>
<GeneralBooking input1={input1} setInput1={setInput1} checked={checked} setChecked={setChecked} extraWork={extraWork} setExtraWork={setExtraWork} shippingMark={shippingMark} setShippingMark={setShippingMark} Shipment={Shipment} setShipment={setShipment}  ></GeneralBooking>
</View>

<Divider style={{marginVertical:15,padding:1}} />

<View>
  <CartonDetails></CartonDetails>
</View>
</View>

  </ScrollView >
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
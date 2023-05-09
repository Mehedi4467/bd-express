import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { RadioButton, TextInput } from 'react-native-paper';

export default function GeneralBooking({input1,setInput1,checked,setChecked,extraWork,setExtraWork,shippingMark,setShippingMark,Shipment,setShipment}) {
  return (
    <View>
       <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Scanned Tracking Number"
        value={input1}
        onChangeText={(text) => setInput1(text)}
        editable={false}
      />
      
    </View>



   <View>
   <View style={{flexDirection:'row',alignItems:'center'}}>
    
    <View style={{flexDirection:'row',alignItems:'center'}}>
    <RadioButton
      value="BD EXpress Cargo"
      status={ checked === 'BD EXpress Cargo' ? 'checked' : 'unchecked' }
      onPress={() => setChecked('BD EXpress Cargo')}
    />
    <Text>BD EXpress Cargo  </Text>
    </View>
    <View style={{flexDirection:'row',alignItems:'center'}}>
    <RadioButton
      value="Moveon"
      status={ checked === 'Moveon' ? 'checked' : 'unchecked' }
      onPress={() => setChecked('Moveon')}
    />
    <Text>Moveon </Text>
    </View>
   
  </View>
  <View style={{flexDirection:'row',alignItems:'center'}}>
      
  <RadioButton
      value="China Online BD"
      status={ checked === 'China Online BD' ? 'checked' : 'unchecked' }
      onPress={() => setChecked('China Online BD')}
    />
    <Text>China Online BD</Text>
  </View>
   </View>





<View style={{marginTop:20}}>
    <View>
<Text style={{fontWeight:600}}>Extra Work: </Text>
    </View>
    <View style={{flexDirection:'row',flexWrap: 'wrap',width:'100%'}}>
    <View style={{flexDirection:'row',alignItems:'center'}}>
      
      <RadioButton
          value="None"
          status={ extraWork === 'None' ? 'checked' : 'unchecked' }
          onPress={() => setExtraWork('None')}
        />
        <Text>None</Text>
      </View>
    <View style={{flexDirection:'row',alignItems:'center'}}>
      
      <RadioButton
          value="Packed by Warehouse"
          status={ extraWork === 'Packed by Warehouse' ? 'checked' : 'unchecked' }
          onPress={() => setExtraWork('Packed by Warehouse')}
        />
        <Text>Packed by Warehouse</Text>
      </View>
    <View style={{flexDirection:'row',alignItems:'center'}}>
      
      <RadioButton
          value="Payment"
          status={ extraWork === 'Payment' ? 'checked' : 'unchecked' }
          onPress={() => setExtraWork("Payment")}
        />
        <Text>Payment</Text>
      </View>

    <View style={{flexDirection:'row',alignItems:'center'}}>
      
      <RadioButton
          value="Special Packing"
          status={ extraWork === 'Special Packing' ? 'checked' : 'unchecked' }
          onPress={() => setExtraWork('Special Packing')}
        />
        <Text>Special Packing</Text>
      </View>
    <View style={{flexDirection:'row',alignItems:'center'}}>
      
      <RadioButton
          value="Product Inspection"
          status={ extraWork === 'Product Inspection' ? 'checked' : 'unchecked' }
          onPress={() => setExtraWork('Product Inspection')}
        />
        <Text>Product Inspection</Text>
      </View>


    </View>

</View>





<View style={{ width:'100%',
      marginTop: 10,}}>
        <Text style={{fontWeight:600,marginBottom:10}}>Shipping Mark: </Text>

        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
          <View style={{backgroundColor:'#00aeef',height:45,flexDirection:'row',alignItems:'center', borderTopLeftRadius:5,borderBottomLeftRadius:5,width:135}}>
          <Text style={{color:'#fff',padding:5}}>{checked}/</Text>
          </View>
          
          <TextInput
        style={{width: '65%',
        // borderWidth: 1,
        height:44,
        borderTopRightRadius:5,
        borderBottomRightRadius:5,
        backgroundColor:'#fff'}}
        placeholder="Shipping Mark"
        value={shippingMark}
        onChangeText={(text) => setShippingMark(text)}
       
      />
        </View>
   
      
    </View>

<View style={{ width:'100%',
      marginTop: 10,}}>
        <Text style={{fontWeight:600,marginBottom:10}}>Shipment:</Text>
      <TextInput
        style={styles.input}
        placeholder="Shipment"
        value={Shipment}
        onChangeText={(text) => setShipment(text)}
       
      />
      
    </View>

    </View>
  )
}


const styles = StyleSheet.create({
  
    inputContainer: {
        width:'100%',
      flexDirection: 'row',
      marginBottom: 20,
    },
    input: {
      width: '100%',
      borderWidth: 1,
      height:45,
      borderRadius: 5,
      backgroundColor:'#fff'
    },
 
  });
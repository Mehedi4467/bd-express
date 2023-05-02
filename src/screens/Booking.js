import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { RadioButton } from 'react-native-paper';
export default function Booking({route}) {
    console.log('router params',route?.params?.id);

    
    const [input1, setInput1] = useState('');
    const [checked, setChecked] = React.useState('BD EXpress Cargo');
    const [extraWork,setExtraWork]=useState('None')
  return (
  
    <ScrollView style={styles.container}>


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
    inputContainer: {
        width:'100%',
      flexDirection: 'row',
      marginBottom: 20,
    },
    input: {
      width: '100%',
      padding: 5,
      borderWidth: 1,
      borderRadius: 5,
      marginRight: 10,
    },
 
  });
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Divider, RadioButton, TextInput } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
export default function GeneralBooking({input1,setInput1,checked,setChecked,extraWork,setExtraWork,shippingMark,setShippingMark,Shipment,setShipment,primaryData,setPaymentCurrency}) {

  // console.log(primaryData)

  const [suggestion,setSuggestion]=useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(primaryData?.data?.current_shipment || '');
  const [searchSuggestionData,setSuggestionData]=useState([]);
  const suggestionData = (value)=>{
    const data = value?.filter(data=> data.client && data.client.toLowerCase().includes(shippingMark.toLowerCase()))
    setSuggestionData(data)
  }

  useEffect(()=>{
    shippingMark && primaryData?.data?.shipping_mark_suggestion?.suggestion &&  suggestionData(primaryData?.data?.shipping_mark_suggestion?.suggestion)
  },[shippingMark])

  const suggestionSubmit = (value)=>{
    setShippingMark(value);
    setSuggestion(false);
  }

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
        <View style={{flexDirection:'row',flexWrap: 'wrap',alignItems:'center'}}>
              {
               primaryData?.data?.shipping_company &&  primaryData?.data?.shipping_company?.map((item,index)=> <View key={index} style={{flexDirection:'row',alignItems:'center'}}>
                <RadioButton
                  value={item?.shipping_mark}
                  status={ checked === item?.shipping_mark ? 'checked' : 'unchecked' }
                  onPress={() => setChecked(item?.shipping_mark)}
                />
                <Text>{item?.company}</Text>
                </View>)
              }
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
          onPress={() => {setPaymentCurrency({
            id:'None',
            currency:'',
            value:''
          });
          setExtraWork('None')} }
        />
        <Text>None</Text>
      </View>
    <View style={{flexDirection:'row',alignItems:'center'}}>
      
      <RadioButton
          value="Packed by Warehouse"
          status={ extraWork === 'Packed by Warehouse' ? 'checked' : 'unchecked' }
          onPress={() => {setPaymentCurrency({
            id:'Packed by Warehouse',
            currency:'',
            value:''
          });
          setExtraWork('Packed by Warehouse')} }
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
          onPress={() => {setPaymentCurrency({
            id:'Special Packing',
            currency:'',
            value:''
          });
          setExtraWork('Special Packing')} }
        />
        <Text>Special Packing</Text>
      </View>
    <View style={{flexDirection:'row',alignItems:'center'}}>
      
      <RadioButton
          value="Product Inspection"
          status={ extraWork === 'Product Inspection' ? 'checked' : 'unchecked' }
          onPress={() => {setPaymentCurrency({
            id:'Product Inspection',
            currency:'',
            value:''
          });
          setExtraWork('Product Inspection')} }
  
        />
        <Text>Product Inspection</Text>
      </View>


    </View>

</View>

<View style={{ width:'100%',marginTop: 10,zIndex:99999999}}>
        <Text style={{fontWeight:600,marginBottom:10}}>Shipping Mark: </Text>

      <View style={{position:'relative'}}>
      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <View style={{backgroundColor:'#00aeef',height:45,flexDirection:'row',alignItems:'center', borderTopLeftRadius:5,borderBottomLeftRadius:5,width:135}}>
                    <Text style={{color:'#fff',padding:5}}>{checked}/</Text>
                </View>
              <TextInput
                  style={{width: '65%',
                  height:44,
                  borderTopRightRadius:5,
                  borderBottomRightRadius:5,
                  backgroundColor:'#fff'}}
                  placeholder="Shipping Mark"
                  value={shippingMark}
                  onChangeText={(text) => setShippingMark(text)}
                  onFocus={()=>setSuggestion(true)}
                  // onBlur={()=>setSuggestion(false)} 
              />
        </View>
        {
          shippingMark && suggestion && searchSuggestionData && searchSuggestionData.length > 0 &&  <View style={{position:'absolute',top:45,right:0, backgroundColor:'#fff',zIndex:99999999,width:250}}>

          {
            searchSuggestionData?.slice(0,6)?.map((item,index)=> item?.client &&  <TouchableOpacity key={index}
            style={{
              padding: 5,
              alignItems: 'center',
              justifyContent: 'center',
              width:"100%"
            }}onPress={() => suggestionSubmit(item?.client)}>
            <Text style={{  fontSize: 16 }}>{item?.client}</Text>
          </TouchableOpacity>)
          }
      
        </View>
        }
     

     
      </View>
</View>





<View style={{ width:'100%',marginTop: 10}}>
    <Text style={{fontWeight:600,marginBottom:10}}>Shipment:</Text>
    <Picker
      style={{ width: '100%',
      borderWidth: 1,
      height:45,
      borderRadius: 5,
      backgroundColor:'#fff',zIndex:1}}
      selectedValue={selectedLanguage}
      onValueChange={(itemValue, itemIndex) =>
      setSelectedLanguage(itemValue)
  }>

    {
      primaryData?.data?.total_shipment?.map((item,index)=><Picker.Item  key={index} label={item.shipment} value={item.shipment} />)
    }
  
    </Picker>
</View>








<Divider style={{marginVertical:15,padding:1,zIndex:1}} />

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
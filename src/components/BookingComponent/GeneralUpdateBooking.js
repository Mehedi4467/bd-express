import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Divider, RadioButton, TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import CheckBoxItem from './CheckBoxItem';
import UpdateCheckBox from './UpdateCheckBox';

export default function GeneralUpdateBooking({input1,setInput1,checked,setChecked,extraWork,setExtraWork,shippingMark,setShippingMark,Shipment,setShipment,primaryData,setPaymentCurrency,country,setCountry,paymentCurrency,setPayment,payment,setPackedbyWarehouse,PackedbyWarehouse,setProductInspection,ProductInspection,setSpecialPacking,SpecialPacking,updateCheckBoxItem,setUpdateCheckBoxItem}) {
    const [countrySelect, setcountrySelect] = useState(country || '');
    const [suggestion,setSuggestion]=useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(Shipment || '');
    const [searchSuggestionData,setSuggestionData]=useState([]);
    const suggestionData = (value)=>{
      const data = value?.filter(data=> data?.client && data?.client.toLowerCase().includes(shippingMark.toLowerCase()))
      setSuggestionData(data)
    }
    useEffect(()=>{
        shippingMark && primaryData?.data?.shipping_mark_suggestion?.suggestion &&  suggestionData(primaryData?.data?.shipping_mark_suggestion?.suggestion)
      },[shippingMark])
    
      const suggestionSubmit = (value)=>{
        setShippingMark(value);
        setSuggestion(false);
      }
    
    
      useEffect(()=>{
        setShipment(selectedLanguage)
      },[selectedLanguage])
    
      useEffect(()=>{
        setCountry(countrySelect)
      },[countrySelect])



  return (
    <View>
      <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        textColor="black"
        placeholder="Scanned Tracking Number"
        value={input1}
        onChangeText={(text) => setInput1(text)}
        editable={false}
      />
    </View>




    <View style={{flexDirection:'row',justifyContent:'space-between',gap:5, width:'100%',marginTop:-10,marginBottom:10}}>

   <View style={{width:'50%'}}>
   <Text style={{fontWeight:600,marginBottom:5}}>Origin:</Text>
    <Picker
      style={{ width: '100%',
      borderWidth: 1,
      height:45,
      borderRadius: 5,
      backgroundColor:'#fff',zIndex:1}}
      selectedValue={countrySelect}
      onValueChange={(itemValue, itemIndex) =>
        setcountrySelect(itemValue)
  }>

 {
     country === "ALL" ?  primaryData?.data?.country_json?.map((item,index)=><Picker.Item  key={index} label={item.code} value={item.code} /> ) : <Picker.Item   label={country} value={country} />
    }  


  
    </Picker>
   </View>


    <View>
    <Text style={{fontWeight:600,marginBottom:5}}>Destination:</Text>
    <View style={{height:53,backgroundColor:'#00aeef',flexDirection:'row',justifyContent:'center',width:'100%', alignItems:'center'}}>
    <Text style={{color:'white'}} >BD</Text>
    </View>
      
    </View>

</View>



        <View>
              <View style={{flexDirection:'row',flexWrap: 'wrap',alignItems:'center'}}>
                        {
                        primaryData?.data?.shipping_company &&  primaryData?.data?.shipping_company?.map((item,index)=> <View key={index} style={{flexDirection:'row',alignItems:'center'}}>
                  <RadioButton
                  value={item?.shipping_mark}
                  color='#1c75bc'
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

    {/* <View style={{flexDirection:'row',flexWrap: 'wrap',width:'100%'}}>
    <View style={{flexDirection:'row',alignItems:'center'}}>
      
      <RadioButton
          value="None"
          status={ extraWork === 'None' ? 'checked' : 'unchecked' }
          onPress={() => {setPaymentCurrency({
            id:'None',
            currency:false,
            amount:0
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
            currency:false,
            amount:0
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
        <Text>Payment({paymentCurrency?.amount})</Text>
      </View>

    <View style={{flexDirection:'row',alignItems:'center'}}>
      
      <RadioButton
          value="Special Packing"
          status={ extraWork === 'Special Packing' ? 'checked' : 'unchecked' }
          onPress={() => {setPaymentCurrency({
            id:'Special Packing',
            currency:false,
            amount:0
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
            currency:false,
            amount:0
          });
          setExtraWork('Product Inspection')} }
  
        />
        <Text>Product Inspection</Text>
      </View>


    </View> */}

<UpdateCheckBox setUpdateCheckBoxItem={setUpdateCheckBoxItem} updateCheckBoxItem={updateCheckBoxItem} payment={payment} setPayment={setPayment} setPackedbyWarehouse={setPackedbyWarehouse} PackedbyWarehouse={PackedbyWarehouse} setProductInspection={setProductInspection} ProductInspection={ProductInspection} setSpecialPacking={setSpecialPacking} SpecialPacking={SpecialPacking} ></UpdateCheckBox>

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

{/* <Picker.Item  label={'haghadgahgd'} value={'hsjfhjshf'} />
<Picker.Item  label={'java'} value={'java'} />
<Picker.Item  label={'vhsdjvsd'} value={'jdvdvdava'} />
<Picker.Item  label={'jadvdvdva'} value={'javdvdvda'} />
<Picker.Item  label={'jadvdvdva'} value={'dvdvd'} /> */}
  
    </Picker>
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
                  textColor="black"
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
import { View, Text } from 'react-native'
import React from 'react'
import { Checkbox } from 'react-native-paper'

export default function UpdateCheckBox({SpecialPacking,setSpecialPacking,ProductInspection,setProductInspection,PackedbyWarehouse,setPackedbyWarehouse,setPayment,payment,updateCheckBoxItem,setUpdateCheckBoxItem}) {

  return (
    <View style={{flexDirection:'row',flexWrap: 'wrap',width:'100%'}}>    
    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
    <Checkbox  status={ProductInspection?.status ? "checked" :"unchecked" }  onPress={()=>setProductInspection({
      name:'Product Inspection',
      status:!ProductInspection?.status 
    })} />
        <Text>Product Inspection</Text>
        
    </View>
    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
    <Checkbox status={PackedbyWarehouse?.status ?  "checked" : "unchecked"} onPress={()=>setPackedbyWarehouse({
      name:'Packed by Warehouse' ,
      status: !PackedbyWarehouse?.status
    })} />
      <Text>Packed by Warehouse</Text>
      
    </View>
    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
    <Checkbox status={SpecialPacking?.status ? "checked" : "unchecked" } onPress={()=>setSpecialPacking({
      name:'Special Packing',
      status:!SpecialPacking?.status
    })} />
        <Text>Special Packing</Text>
      
    </View>
    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
    <Checkbox status={payment?.status ? "checked" : "unchecked"}  onPress={()=>{
    setUpdateCheckBoxItem(!payment?.status ? true : false);
    setPayment({
        name:'Payment',
        status:!payment?.status
      })
    }}/>
        <Text>Payment({payment?.amount || 0})</Text>
        
    </View>
   
    
  </View>
  )
}
import { View, Text } from 'react-native'
import React from 'react'
import { Checkbox } from 'react-native-paper'

export default function CheckBoxItem({SpecialPacking,setSpecialPacking,ProductInspection,setProductInspection,PackedbyWarehouse,setPackedbyWarehouse,setPayment,payment}) {

  return (
    <View style={{flexDirection:'row',flexWrap: 'wrap',width:'100%'}}>

    {/* <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
      <Checkbox  status={none?.status ? "checked" : "unchecked"  } onPress={()=>setNone({name:'None',status:!none?.status})}  />
      <Text>None</Text>
    </View> */}
    
    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
    <Checkbox color='#1c75bc' status={ProductInspection?.status ? "checked" :"unchecked" }  onPress={()=>setProductInspection({
      name:'Product Inspection',
      status:!ProductInspection?.status 
    })} />
        <Text style={{color:'black'}}>Product Inspection</Text>
        
    </View>
    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
    <Checkbox color='#1c75bc' status={PackedbyWarehouse?.status ?  "checked" : "unchecked"} onPress={()=>setPackedbyWarehouse({
      name:'Packed by Warehouse' ,
      status: !PackedbyWarehouse?.status
    })} />
      <Text style={{color:'black'}}>Packed by Warehouse</Text>
      
    </View>
    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
    <Checkbox color='#1c75bc' status={SpecialPacking?.status ? "checked" : "unchecked" } onPress={()=>setSpecialPacking({
      name:'Special Packing',
      status:!SpecialPacking?.status
    })} />
        <Text style={{color:'black'}}>Special Packing</Text>
      
    </View>
    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
    <Checkbox color='#1c75bc' status={payment?.status ? "checked" : "unchecked"}  onPress={()=>setPayment({
      name:'Payment',
      status:!payment?.status
    })}/>
        <Text style={{color:'black'}}>Payment({payment?.amount || 0})</Text>
        
    </View>
   
    
  </View>
  )
}
import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Card, RadioButton, TextInput } from 'react-native-paper'


export default function CartonDetails({showModal}) {
  const [cartons,setCarton]=useState(0);
  const [formValues, setFormValues] = useState([]);
 
useEffect(()=>{
const newArray = [];
  if(+cartons > 0){
    for (let i = 0; i < +cartons ; i++) {
      newArray.push({ carton: i+1, cartonNumber: '', weigth: '',route:'' })
    }
  }
  setFormValues(newArray)
},[cartons]);



let handleChange = (i, name,value) => {
  let newFormValues = [...formValues];
  newFormValues[i][name] = value;
  setFormValues(newFormValues);
};


console.log(formValues)


  return (
    <View>
      <View style={{flexDirection:'row',alignItems:'center',width:'100%'}}>
        <Text style={{fontWeight:600}}>Cartons: </Text>
        <TextInput
        placeholder="Carton Number"
        value={cartons.toString()}
        keyboardType="numeric"
        onChangeText={(text) => setCarton(text)}
        style={{backgroundColor:'#fff', height:40,width:200, borderWidth: 1,fontSize:10}}
      />
      </View>

<View style={{marginVertical:10}}>

{
  formValues.length > 0 && formValues.map((item,index)=><Card key={index} style={{borderWidth: 1,marginBottom:10}}>
  <Card.Content style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
    <View>
    <Text>Carton</Text>
    <View style={{height:25,width:25,flexDirection:'row',justifyContent:'center',alignItems:'center', backgroundColor:'#fff',borderRadius:25}}>
    <Text style={{textAlign:'center',fontWeight:800}}>{item?.carton}</Text>
    </View>
    </View>

    <View>
    <Text>Carton Number</Text>
    <TextInput
      // placeholder="Carton Number"
      value={item?.cartonNumber}
      // keyboardType="numeric"
      onChangeText={(text) => handleChange(index, 'cartonNumber',text)}
      style={{backgroundColor:'#fff', height:25,borderWidth: 1,width: 100}}
    />
    </View>
    <View>
    <Text>Weight</Text>
    <TextInput
      // placeholder="Carton Number"
      value={item?.weigth}
      keyboardType="numeric"
      onChangeText={(text) => handleChange(index, 'weigth',text)}
      style={{backgroundColor:'#fff', height:25,borderWidth: 1,width: 60}}
    />
    </View>

    <View>



    <Button style={{marginTop:10}} icon="plus" mode="contained" onPress={showModal}>
  Items
</Button>
    </View>

  </Card.Content>




  <View style={{padding:10}}>
  <View style={{marginTop:20}}>
  <View>
<Text style={{fontWeight:600}}>Shipment Route: </Text>
  </View>
  <View style={{flexDirection:'row',flexWrap: 'wrap',width:'100%'}}>
  <View style={{flexDirection:'row',alignItems:'center'}}>
    
    <RadioButton
        value="GZ"
        status={ item?.route === 'GZ' ? 'checked' : 'unchecked' }
        onPress={() => handleChange(index, 'route','GZ')}
        // onPress={() => setShipMentRoute('GZ')}
      />
      <Text>GZ</Text>
    </View>
  <View style={{flexDirection:'row',alignItems:'center'}}>
    
    <RadioButton
        value="HK"
        status={ item?.route === 'HK' ? 'checked' : 'unchecked' }
        // onPress={() => setShipMentRoute('HK')}
        onPress={() => handleChange(index, 'route',"HK")}
      />
      <Text>HK</Text>
    </View>
  </View>

</View>
  </View>

</Card>)
}




</View>



    </View>
   
  )
}





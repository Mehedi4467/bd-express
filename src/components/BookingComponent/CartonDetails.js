import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Card, RadioButton, TextInput } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome';
// import BookingItemModal from '../Modal/BookingItemModal';


export default function CartonDetails({formValues,setFormValues,showModal}) {


  const [cartons,setCarton]=useState(0);
  // const [disabled, setDisabled] = useState(false);
  useEffect(()=>{
const newArray = [];
  if(+cartons > 0){
    for (let i = 0; i < +cartons ; i++) {
      newArray.push({index:i, carton: i+1, cartonNumber: '', weigth: '',route:'',items:[{index: i,item: '',qty: ''}] })
    }
  }
  setFormValues(newArray)
},[cartons]);



let handleChange = (i, name,value) => {
  let newFormValues = [...formValues];
  newFormValues[i][name] = value;
  setFormValues(newFormValues);
  
};


// const onFocusView = (inputIndex)=>{

//   scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
//   console.log(inputRef.current.setNativeProps())
// }



  return (
    <View>
      <View style={{flexDirection:'row',alignItems:'center',width:'100%'}}>
        <Text style={{fontWeight:600}}>Cartons: </Text>
        <TextInput
        placeholder="Carton Number"
        textColor="black"
        value={cartons.toString()}
        keyboardType="numeric"
        onChangeText={(text) => setCarton(text)}
        style={{backgroundColor:'#fff', height:40,width:200, borderWidth: 1,fontSize:10}}
      />
      </View>

<View style={{marginVertical:10}}>

{
  formValues.length > 0 && formValues.map((item,index)=>
  <Card key={index} style={{borderWidth: 1,marginBottom:10,backgroundColor:'#fff'}}>
  <Card.Content style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
    <View>
    <Text>Carton</Text>
    <View style={{height:25,width:25,flexDirection:'row',justifyContent:'center',alignItems:'center', backgroundColor:'#fff',borderRadius:25}}>
    <Text style={{textAlign:'center',fontWeight:800}}>{item?.carton}</Text>
    </View>
    </View>

    <View style={{color:'#fff'}}>
    <Text>Carton Number</Text>
    <TextInput
      // placeholder="Carton Number"
      value={item?.cartonNumber}
      keyboardType="numeric"
      textColor="black"
      onChangeText={(text) => handleChange(index, 'cartonNumber',text)}
      style={{backgroundColor:'#fff', height:25,borderWidth: 1,width: 100}}
    />
    </View>
    <View>
    <Text>Weight</Text>
    <TextInput
      value={item?.weigth}
      keyboardType="numeric"
      textColor="black"
      onChangeText={(text) => handleChange(index, 'weigth',text)}
      style={{backgroundColor:'#fff', height:25,borderWidth: 1,width: 60,color: '#fff'}}
      theme={{
        colors: {
          text: '#fff' // Change this to the desired text color
        }
      }}
    />
    </View>

    <View>

    <TouchableOpacity onPress={()=>showModal(index)} icon="plus" style={{marginTop:10,backgroundColor: formValues[index]?.items?.every(item=>item?.item && item?.qty) ? "#00aeef" : 'red',borderRadius:5,padding:5}}>
      <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center',gap:5}}>
      <Icon name="plus" size={20} color="#fff" />
      <Text style={{color:'#fff'}}>Items</Text>
      </View>
    </TouchableOpacity>
    </View>

  </Card.Content>

  <View style={{padding:10,flexDirection:'row',justifyContent:'space-between'}}>
  <View style={{marginTop:20}}>
  <View>
<Text style={{fontWeight:600}}>Shipment Route: </Text>
  </View>
  <View style={{flexDirection:'row',flexWrap: 'wrap',width:'100%'}}>
  <View style={{flexDirection:'row',alignItems:'center'}}>
    
    <RadioButton
        value="GZ"
        color='#1c75bc'
        status={ item?.route === 'GZ' ? 'checked' : 'unchecked' }
        onPress={() => handleChange(index, 'route','GZ')}
      />
      <Text>GZ</Text>
    </View>
  <View style={{flexDirection:'row',alignItems:'center'}}>
    
    <RadioButton
        value="HK"
        color='#1c75bc'
        status={ item?.route === 'HK' ? 'checked' : 'unchecked' }
        onPress={() => handleChange(index, 'route',"HK")}
      />
      <Text>HK</Text>
    </View>
  </View>

</View>

      {/* <View style={{marginTop:20}}>
      <View>
          <Text style={{fontWeight:600}}>Final Weight: </Text>
      </View>
        <View style={{flexDirection:'row',flexWrap: 'wrap',width:'100%'}}>
          <View>
            <TextInput
              value={item?.finalWeight}
              keyboardType="numeric"
              onChangeText={(text) => handleChange(index, 'finalWeight',text)}
              style={{backgroundColor:'#fff', height:25,borderWidth: 1,width: 80,marginTop:5}}
            />
          </View>
        </View>
      </View> */}
  </View>

</Card>)

}

</View>
    </View>
   
  )
}





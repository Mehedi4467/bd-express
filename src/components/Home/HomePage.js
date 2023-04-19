import React, { useState } from 'react';
import { View,Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const HomePage = ({inputCode,setUnputCode,finalCode,setFinalCode}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [checkID,setCheckId]=useState('');

  // console.log('check',finalCode.length <=0 ?checkID : finalCode[checkID]);


  const handlePress = () => {
    // Handle button press here
    // console.log(inputCode);
  }

const handleArrayUpdate=(value,index)=>{

const newArray = [...finalCode];
newArray[index] = value; 
setFinalCode(newArray);
  }

  const handleOptionPress = (option,value) => {
    setSelectedOption(option);
      setCheckId(option);
    // console.log(value)
  };

  return (
    <View style={styles.container}>
      {/* {
        finalCode.map((item,index)=>
        <TextInput 
        key={index}
        style={styles.input}
        onChangeText={(value)=>handleArrayUpdate(value,index)}
        // onChange={(e)=>handleArrayUpdate(e.target.value,index)}
        value={finalCode[index]}
        placeholder="Enter Bar Code"
      />
      )
      } */}


{

finalCode.length <=0 ? <TextInput 
style={styles.input}
onChangeText={(value)=>setCheckId(value)}
placeholder="Enter Bar Code"
/> :
finalCode.map((item,index)=>
<View key={index}>
<View  style={{ flexDirection: 'row', alignItems: 'center',width:'80%' }}>
  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => handleOptionPress(index,item)}>
    <Text style={{ fontSize: 40,marginBottom:25,marginRight:10 }}>{selectedOption === index ? '◉' : '○'}</Text>
  </TouchableOpacity>
  <TextInput 

  style={styles.input}
  onChangeText={(value)=>handleArrayUpdate(value,index)}
  // onChange={(e)=>handleArrayUpdate(e.target.value,index)}
  value={finalCode[index]}
  placeholder="Enter Bar Code"
/>
</View>

</View>)
}




      
 
<TouchableOpacity
        style={styles.button}
        onPress={handlePress}
      ><Text style={styles.buttonText}>Create Booking</Text></TouchableOpacity>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    height:'100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#00aeef',
    borderRadius: 20,
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#00aeef',
    borderRadius:5,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default HomePage;
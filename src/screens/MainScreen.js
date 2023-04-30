import { View, Text,Vibration, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import HomePage from '../components/Home/HomePage';
import BottomNavbar from '../components/Home/BottomNavbar';
import Scanner from '../components/Scanner/Scanner';


export default function MainScreen({navigation}) {

  const [code, setCode] = useState('');
  const [stopScanner, setScannerClose] = useState(true);
  const [inputCode,setInputCode]=useState('');




  const handleVibrate = () => {
    Vibration.vibrate(500);
  }


  useEffect(()=>{
    if(code){
      handleVibrate();
      setScannerClose(true);
      setInputCode(code);
    }
  },[code])

  useEffect(()=>{
    if(!stopScanner){
      setCode('');
    }
  },[stopScanner]);


  return (
   <>
      {stopScanner ? <View style={{ paddingLeft: 20, paddingRight: 20}}>
        <HomePage code={code} setCode={setCode} inputCode={inputCode} setInputCode={setInputCode}></HomePage>
      </View> : <Scanner setScannerClose={setScannerClose}  setCode={setCode} code={code}></Scanner>}

      <View style={styles.Bottomcontainer}>
        <BottomNavbar
          setScannerClose={setScannerClose}
          stopScanner={stopScanner}
          navigation={navigation}
        ></BottomNavbar>
      </View>

     
    </>
  )
}


const styles = StyleSheet.create({
  Bottomcontainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#00aeef',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});

import { View, Text,Vibration, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import HomePage from '../components/Home/HomePage';
import BottomNavbar from '../components/Home/BottomNavbar';
import Scanner from '../components/Scanner/Scanner';


export default function MainScreen() {
  const [code, setCode] = useState('');
  const [stopScanner, setScannerClose] = useState(true);
  const [resData, setResData] = useState('');
  const [inputCode, setUnputCode] = useState('');
  const [finalCode,setFinalCode]=useState([]);






  const handleVibrate = () => {
    Vibration.vibrate(500);
  }


  useEffect(()=>{
    if(code){
      handleVibrate();
      // setScannerClose(true);
      setUnputCode(code);
    }
  },[code])

  useEffect(()=>{
    if(!stopScanner){
      setUnputCode('');
      setCode('');
      setFinalCode([]);
    }
  },[stopScanner]);


  return (
   <>
      {stopScanner ? <View style={{ paddingLeft: 20, paddingRight: 20}}>
        <HomePage inputCode={inputCode} setFinalCode={setFinalCode} finalCode={finalCode} setUnputCode={setUnputCode}></HomePage>
      </View> : <Scanner setScannerClose={setScannerClose}   setFinalCode={setFinalCode} finalCode={finalCode} setCode={setCode} code={code}></Scanner>}

      <View style={styles.Bottomcontainer}>
        <BottomNavbar
          setScannerClose={setScannerClose}
          stopScanner={stopScanner}
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

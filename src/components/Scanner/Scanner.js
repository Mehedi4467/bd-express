import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import LoadingScreen from '../../screens/LoadingScreen';


export default function Scanner({ code, setCode, }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  // const [finalCode,setFinalCode]=useState([]);
  const [flashLight, setFlashLight] = useState(true);



  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

 

  const handleBarCodeScanned = ({ type, data }) => {

    // if(finalCode.includes(data)){
    //   alert(`You have already scanned ${data} this code  `);
    //   setFinalCode([...finalCode]);
    // }else{
    //   setFinalCode([...finalCode,data]);
    // }

    if(data){
      setCode(data);
    }

    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return(
     <View style={{ height:'100%',
     justifyContent: 'center',
     alignItems: 'center',}}>
      <LoadingScreen></LoadingScreen>
      <Text>Requesting for camera permission</Text>
     </View>
    )
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.middleButton}>
        {scanned && (
          <>
       
          <Button
          title={'Tap to Scan Again'}
          onPress={() => setScanned(false)}
        />
        
          <View style={{ marginTop: 20 }}></View>
        <Button
          title={'ID Check or Booking'}
          onPress={() => setScannerClose(true)}
        />
        
        </>
          
        )}
      </View>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        // style={{ width: '100%', height: '100%' }}
        zoom={1}
        style={[StyleSheet.absoluteFillObject, styles.barcodeScanner]}
        barCodeScannerProps={{
         
        }}
        FlashMode= 'on' 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    marginBottom: 30,
  },
  middleButton: {
    position: 'absolute',
    top: '50%',
    zIndex: 999999999,
    // bottom: 0,
  },
});

// const { width } = Dimensions.get('window');
// const scannerHeight = 300;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   barcodeScanner: {
//     height: scannerHeight,
//     width: width,
//   },
// });



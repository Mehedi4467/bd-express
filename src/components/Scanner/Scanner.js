import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Dimensions, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import LoadingScreen from '../../screens/LoadingScreen';
import { Camera } from 'expo-camera';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function Scanner({ code, setCode,setScannerClose }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  // const [finalCode,setFinalCode]=useState([]);
  const [flashLight, setFlashLight] = useState(false);



  const [imageUri, setImageUri] = useState(null);
  const scannerRef = useRef(null);

  console.log(imageUri)

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

 

  const handleBarCodeScanned = async({ type, data }) => {

    // if(finalCode.includes(data)){
    //   alert(`You have already scanned ${data} this code  `);
    //   setFinalCode([...finalCode]);
    // }else{
    //   setFinalCode([...finalCode,data]);
    // }




    const photo = await scannerRef.current.takePictureAsync();
    setImageUri(photo.uri);


  //   const formData = new FormData();
  // formData.append('image', {
  //   uri: photo.uri,
  //   type: 'image/jpeg',
  //   name: 'image.jpg',
  // });

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
        {/* {true && (
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
          
        )} */}
        {/* <Image source={{ uri: imageUri }} style={styles.image} /> */}
    <TouchableOpacity style={{backgroundColor:flashLight ? 'black':'#00aeef', height:50,width:50,flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',borderRadius:25}} onPress={()=>setFlashLight(!flashLight)}>
    <Icon name="flash" color='#fff' size={20} />
    </TouchableOpacity>

    <TouchableOpacity style={{backgroundColor:'#00aeef', height:50,width:50,flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',borderRadius:25}} onPress={()=>setScannerClose(true)}>
    <Icon name="times" color="#fff" size={20} />
    </TouchableOpacity>
      </View>
      <Camera
      ref={scannerRef}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ zIndex: 1,
          width: '90%',
          height: 200*1.1 }}
          flashMode={flashLight? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}
        zoom={.5}
        // ratio='16:9'
        // style={[StyleSheet.absoluteFillObject, styles.barcodeScanner]} 
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
    width:'70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: '10%',
    
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



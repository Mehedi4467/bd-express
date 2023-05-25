import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import logo from '../../assets/scanner.jpg';
import { auxDataApi } from '../../api/Shipment/VerifyShipment';
import { verifyUserPath } from '../../api/Auth/allPathVerify';
import { pathLogOutApi } from '../../api/Auth/pathLogOut';

export default function BottomNavbar({ setScannerClose, stopScanner,navigation }) {

  const showToast = (s) => {
    ToastAndroid.show(s, ToastAndroid.SHORT,ToastAndroid.TOP);
  };


  const handlePress =async () => {
    const data = await auxDataApi();

    const x = await verifyUserPath();
    if(!x?.status || x?.exception === 'yes'){
      pathLogOutApi();
      navigation.navigate('Login');
    }else{
      if(data?.data?.current_shipment){
        setScannerClose(!stopScanner);
      }else{
        navigation.navigate('Shipment', {name: 'Shipment'});
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.column} color="#00aeef" onPress={async() => {
         const x = await verifyUserPath();
         if(!x?.status || x?.exception === 'yes'){
           pathLogOutApi();
           navigation.navigate('Login');
         }else{
          navigation.navigate('Shipment', {name: 'Shipment'});
         }
      }
      }>
        <Text style={{ color: 'white', fontSize: 16 }}>SHIPMENT</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoContainer} onPress={handlePress}>
        <Image source={logo} style={styles.logo} />
      </TouchableOpacity>

      <TouchableOpacity style={{flex:1}} color="#00aeef" onPress={async()=>{
        const x = await verifyUserPath();
        if(!x?.status || x?.exception === 'yes'){
          pathLogOutApi();
          navigation.navigate('Login');
        }else{
          navigation.navigate('cbm');
        }
      }}>
        <Text style={{ color: 'white', fontSize: 16 ,textAlign:'right'}}>CBM</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#00aeef',
    // height: 80,
    padding: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  column:{
    flex: 1
  },
  logoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    width: 50,
    height: 50,
    shadowColor: '#00aeef',
    justifyContent:'center',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 50,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

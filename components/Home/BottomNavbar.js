import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import logo from '../../assets/scanner.jpg';

export default function BottomNavbar({ setScannerClose, stopScanner }) {
  const handlePress = () => {
    setScannerClose(!stopScanner);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} color="#00aeef">
        <Text style={{ color: 'white', fontSize: 16 }}>SHIPMENT</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoContainer} onPress={handlePress}>
        <Image source={logo} style={styles.logo} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} color="#00aeef">
        <Text style={{ color: 'white', fontSize: 16 }}>BOOKING</Text>
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

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    width: 50,
    height: 50,
    shadowColor: '#00aeef',
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

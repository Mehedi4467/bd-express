import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import logo from '../../assets/logo.png';
export default function TopNavbar() {
  return (
    <View style={styles.logoContainer}>
      <Image source={logo} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
});

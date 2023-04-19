import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#00aeef" />
    </View>
  );
};

export default LoadingScreen;
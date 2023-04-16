import { View, Text } from 'react-native';
import React from 'react';

export default function HomePage({ code, resData }) {
  return (
    <View>
      <Text>Scan Code : {code}</Text>
      <Text>API Response : {resData}</Text>
    </View>
  );
}

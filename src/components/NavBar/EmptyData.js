import { View, Text, Image } from 'react-native'
import React from 'react'
import empty from '../../assets/empty.png';
export default function EmptyData() {
  return (
    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',width:'100%',height:'100%'}}>
        <Image source={empty} style={{height:300,width:300}} />
    </View>
  )
}
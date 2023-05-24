import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import TopNavbar from '../components/Home/TopNavbar'
import { Card } from 'react-native-paper';

export default function DeepCheck({route,navigation}) {
const [isNavOpen, setIsNavOpen] = useState(false);

const updateBooking = (trackingID,BookingID)=>{
  navigation.navigate('update',{trackingID: trackingID,BookingID :BookingID });
}
  return (
    <View>
          <View style={{backgroundColor:'#fff',position:'relative',zIndex:1}}>
                <TopNavbar setIsNavOpen={setIsNavOpen} isNavOpen={isNavOpen} navigation={navigation}></TopNavbar>
          </View>
            <View style={{marginVertical:10,marginHorizontal:10}}>
              {
                  route?.params?.data?.data?.result?.map((item,index)=><Card key={index} style={{marginBottom:10}}>
                  <Card.Content style={{flexDirection:'row',justifyContent:'space-between'}}>
                  <View>
                    <Text variant="titleLarge" style={{marginBottom:5}}>Tracking ID : {item?.tracking_id}</Text>
                    <Text variant="titleLarge">Date : {item?.data}</Text>
                  </View>
                  <TouchableOpacity style={{backgroundColor:'#00aeef',borderRadius:5,padding:4,flexDirection:'row',alignItems:'center',justifyContent:'center'}} onPress={()=>updateBooking(item?.tracking_id,item?.booking)}>
                    <Text style={{color:'#fff'}}>Update Booking</Text>
                  </TouchableOpacity>
                  </Card.Content>
              </Card>) 
              }
          </View>
    
    </View>
  )
}
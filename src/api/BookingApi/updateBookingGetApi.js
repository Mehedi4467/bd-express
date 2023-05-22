import axios from 'axios';
import {BASE_URL,APP_AUTHOR,APP_TOKEN} from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';


export const viewUpdate =async(trackingId)=> {
    const x = await AsyncStorage.getItem('user');
    const userInfo = JSON.parse(x);

    if(userInfo){
    try{
        const data = await  axios.get(`${BASE_URL}/v1/scanner/china/operator/get/booking-details?booking=${trackingId}`,{
            headers: {
                Author: APP_AUTHOR,
                "App-token":APP_TOKEN,
                User:userInfo?.user,
                "Access-token":userInfo?.access_token,
                "App-token":APP_TOKEN
              },
        })
        .then(response => {
          return response.data;
        })
        .catch(error => {
          return error.response.data;
        });

        return data;
    }catch(err){
        console.log(err);
        return false;
    }
    }

return null
   
}
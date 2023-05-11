import axios from 'axios';
import {BASE_URL,APP_AUTHOR,APP_TOKEN} from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';


export const submitBookingApi =async(bookingSubmitData)=> {
    const x = await AsyncStorage.getItem('user');
    const userInfo = JSON.parse(x);

    const submitBookin = await  axios.patch(`${BASE_URL}/v1/scanner/china/operator/submit/booking`,bookingSubmitData,{
            headers: {
                'Content-Type': 'application/json',
                Author: APP_AUTHOR,
                User:userInfo?.user,
                "App-token":APP_TOKEN,
                "Access-token":userInfo?.access_token
              },
        })
        .then(response => {
          return response.data;
        })
        .catch(error => {
          return error.response.data;
        });
   
   return submitBookin;

}
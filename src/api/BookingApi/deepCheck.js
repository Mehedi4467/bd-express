import axios from 'axios';
import {BASE_URL,APP_AUTHOR,APP_TOKEN} from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';


export const deepCheckTrackingId =async(trackingId)=> {
    const x = await AsyncStorage.getItem('user');
    const userInfo = JSON.parse(x);

    if(userInfo){
        const data = await  axios.get(`${BASE_URL}/v1/scanner/china/operator/verify/tracking-id/deep-check?tracking_id=${trackingId}`,{
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
    }

return null
   
}
import axios from 'axios';
import {BASE_URL,APP_AUTHOR,APP_TOKEN} from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ExtraWorkUpdatePOUp =async(Updatedata)=> {
    const x = await AsyncStorage.getItem('user');
    const userInfo = JSON.parse(x);

    const submitBookin = await  axios.post(`${BASE_URL}/v1/scanner/china/operator/update/extra/work/status`,Updatedata,{
            headers: {
                Author: APP_AUTHOR,
                User:userInfo?.user,
                "App-token":APP_TOKEN,
                "Access-token":userInfo?.access_token
              },
        })
        .then(response => {
          return response?.data;
        })
        .catch(error => {
            console.log(error)
          return error.response.data;
        });
   
   return submitBookin;

}
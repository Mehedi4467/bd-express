import axios from 'axios';
import {BASE_URL,APP_AUTHOR,APP_TOKEN} from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';


export const pathLogOutApi =async()=> {
    const x = await AsyncStorage.getItem('user');
    const userInfo = JSON.parse(x);
    const pathLogOut = await  axios.get(`${BASE_URL}/v1/scanner/china/log/out`,{
            headers: {
                Author: APP_AUTHOR,
                "App-token":APP_TOKEN,
                User:userInfo?.user,
                "Access-token":userInfo?.token,
                "App-token":APP_TOKEN
              },
        })
        .then(response => {
          return response.data;
        })
        .catch(error => {
          return error.response.data;
        });
    await AsyncStorage.removeItem('user');

   return pathLogOut;

}
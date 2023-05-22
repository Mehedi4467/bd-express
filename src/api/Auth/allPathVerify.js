import axios from 'axios';
import {BASE_URL,APP_AUTHOR,APP_TOKEN} from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';


export const verifyUserPath =async()=> {
const x = await AsyncStorage.getItem('user');
const userInfo = JSON.parse(x);

const verifyPath = await  axios.get(`${BASE_URL}/v1/scanner/china/path/verify`,{
            headers: {
                'Content-Type': 'application/json',
                Author: APP_AUTHOR,
                "App-token":APP_TOKEN,
                User:  userInfo?.user,
                "Access-token":userInfo?.access_token
              },
        })
        .then(response => {
          return response.data;
        })
        .catch(error => {
          return error.response.data;
        });
  //  console.log(verifyPath)

   return verifyPath;

}
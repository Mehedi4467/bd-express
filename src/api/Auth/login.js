import axios from 'axios';
import {BASE_URL,APP_AUTHOR,APP_TOKEN} from '@env'


export const loginApi =async(userInfo)=> {
   
    const apiData = await  axios.post(`${BASE_URL}/v1/scanner/china/log/in`,userInfo,{
            headers: {
                'Content-Type': 'application/json',
                Author: APP_AUTHOR,
                "App-token":APP_TOKEN
              },
        })
        .then(response => {
          return response.data;
        })
        .catch(error => {
          console.log(error)
          return error.response.data;
        });
   
   return apiData;

}

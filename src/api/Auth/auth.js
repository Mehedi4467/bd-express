import axios from 'axios';
import {BASE_URL,APP_AUTHOR,APP_TOKEN} from '@env'


export const verifyUser =async(user,token)=> {
   
    const verify = await  axios.get(`${BASE_URL}/v1/scanner/china/path/verify`,{
            headers: {
                'Content-Type': 'application/json',
                Author: APP_AUTHOR,
                "App-token":APP_TOKEN,
                User:user,
                "Access-token":token
              },
        })
        .then(response => {
          return response.data;
        })
        .catch(error => {
          return error.response.data;
        });
   
   return verify;

}

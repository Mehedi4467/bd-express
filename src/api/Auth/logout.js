import axios from 'axios';
import {BASE_URL,APP_AUTHOR,APP_TOKEN} from '@env'


export const logOutApi =async(user,token)=> {
   
    const logOut = await  axios.get(`${BASE_URL}/v1/scanner/china/log/out`,{
            headers: {
                Author: APP_AUTHOR,
                "App-token":APP_TOKEN,
                User:user,
                "Access-token":token,
                "App-token":APP_TOKEN
              },
        })
        .then(response => {
          return response.data;
        })
        .catch(error => {
          return error.response.data;
        });
   
   return logOut;

}

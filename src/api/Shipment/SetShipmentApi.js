import axios from 'axios';
import {BASE_URL,APP_AUTHOR,APP_TOKEN} from '@env'


export const setShipmentApi =async(shipment,user,token)=> {

    const setShepment = await  axios.post(`${BASE_URL}/v1/scanner/china/operator/set/shipment`,shipment,{
            headers: {
                'Content-Type': 'application/json',
                Author: APP_AUTHOR,
                User:user,
                "App-token":APP_TOKEN,
                "Access-token":token
              },
        })
        .then(response => {
          return response.data;
        })
        .catch(error => {
          return error.response.data;
        });
   
   return setShepment;

}
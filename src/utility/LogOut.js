import AsyncStorage from "@react-native-async-storage/async-storage";
import { logOutApi } from "../api/Auth/logout";

export const logOut= async()=>{
    const x = await AsyncStorage.getItem('user');
    const userInfo = JSON.parse(x);
    if(userInfo){
      const verify = await logOutApi(userInfo?.user, userInfo?.access_token);
      if(verify?.status){
        try {
          await AsyncStorage.removeItem('user');
          console.log('Item removed successfully');
          // navigation.navigate('Login')
          // <LoginScreen></LoginScreen>
        } catch (e) {
          console.log('Error removing item:', e);
        }
      }
    }
  }
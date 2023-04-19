import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, useIsFocused, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoadingScreen from './src/screens/LoadingScreen';
import { verifyUser } from './src/api/Auth/auth';


const Stack = createStackNavigator();
const withAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    useEffect(() => {
      const checkAuthentication = async () => {
        const x = await AsyncStorage.getItem('user');
        const userInfo = JSON.parse(x)

        if(userInfo){
         const verify = await verifyUser(userInfo?.user, userInfo?.access_token);
         if(verify?.status){
          setIsAuthenticated(true);
         }
        

         setIsLoading(false);

        }else{
          setIsAuthenticated(false);
          setIsLoading(false);
        }

        // if (userInfo) {
        //   setIsAuthenticated(true);
        // }
        // setIsLoading(false);
      };

      checkAuthentication();
    }, []);

    if (isLoading) {
      return <LoadingScreen></LoadingScreen>;
    }

    if (!isAuthenticated) {
      // Redirect the user to the Login screen if they're not authenticated
      // return (

      //   <NavigationContainer>
      //     <Stack.Navigator >
      //       <Stack.Screen name="Login" component={LoginScreen} />
      //     </Stack.Navigator>
      //   </NavigationContainer>
      //   <LoginScreen></LoginScreen>
      // );
  //  navigation.navigate('Home')
   return  navigation.navigate('Login');
    }
    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
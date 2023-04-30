
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './src/screens/MainScreen';
// import withAuth from './withAuth';
import TopNavbar from './src/components/Home/TopNavbar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
// import { Router, Scene, Stack } from 'react-native-router-flux';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import withAuth from './withAuth';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { verifyUser } from './src/api/Auth/auth';
import LoadingScreen from './src/screens/LoadingScreen';
import Shipment from './src/screens/Shipment';

const Stack = createNativeStackNavigator();
// const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

// useEffect(() => {
//     // Simulate loading time
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 3000);
//   }, []);


const [auth,setAuth]=useState(false);

const [gobalLoader,setGobalLoader]=useState(false);


useEffect(() => {
  const checkAuthentication = async () => {
    const x = await AsyncStorage.getItem('user');
    const userInfo = JSON.parse(x);

    if(userInfo){
     const verify = await verifyUser(userInfo?.user, userInfo?.access_token);
     if(verify?.status){
      setAuth(true);
     }
    

     setIsLoading(false);

    }else{
      setAuth(false);
      setIsLoading(false);
    }

    // if (userInfo) {
    //   setIsAuthenticated(true);
    // }
    // setIsLoading(false);
  };

  checkAuthentication();
}, [gobalLoader]);



if(isLoading){
  return <LoadingScreen></LoadingScreen>
}

  

  return (
    <View style={{ flex: 1 }}>

      
      <NavigationContainer>
      <TopNavbar setGobalLoader={setGobalLoader} gobalLoader={gobalLoader}></TopNavbar>
      {
        auth ?  
        <Stack.Navigator >
        <Stack.Screen name="Home" component={MainScreen}  options={{ headerShown: false }} /> 
        <Stack.Screen name="Shipment" component={Shipment}  options={{ headerShown: false }} /> 
      </Stack.Navigator> 
      : <Stack.Navigator >
        <Stack.Screen name="Login" component={(props) => <LoginScreen {...props} gobalLoader={gobalLoader} setGobalLoader={setGobalLoader} />}  options={{ headerShown: false }}/>
      </Stack.Navigator>
      }
      </NavigationContainer>

  </View>



  // <Router>
  // <Stack key="main">
  //     <Scene>
  //        <Scene key = "Home" component={withAuth(MainScreen)} title = "Home" initial = {true} />
  //        <Scene key = "Login" component={LoginScreen} title = "Login" />
  //     </Scene>
  //     </Stack>
  //  </Router>


  );
}




import MainScreen from './src/screens/MainScreen';
import TopNavbar from './src/components/Home/TopNavbar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import {  Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { verifyUser } from './src/api/Auth/auth';
import LoadingScreen from './src/screens/LoadingScreen';
import Shipment from './src/screens/Shipment';
import Booking from './src/screens/Booking';
import { Divider, Menu, Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { logOut } from './src/utility/LogOut';
import { auxDataApi } from './src/api/Shipment/VerifyShipment';
import MyContext from './src/utility/MyContext';
import NavBar from './src/components/NavBar/NavBar';
const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(false);
const [auth,setAuth]=useState(false);
const [gobalLoader,setGobalLoader]=useState(false);




const [primaryData,setPrimaryData]=useState([]);
const [refetchData,setRefatchData]=useState(false);

const auxData = async()=>{
  const data =await auxDataApi();
  // console.log(data)
  setPrimaryData(data)
}


useEffect(()=>{
  auxData();
},[refetchData])


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
  };

  checkAuthentication();
}, [gobalLoader]);

if(isLoading){
  return <LoadingScreen></LoadingScreen>
}

  return (
    <MyContext.Provider value={{ primaryData, setRefatchData,refetchData }}>
    <PaperProvider>
    <View style={{ flex: 1 }}>
      <NavigationContainer>
      <TopNavbar setIsNavOpen={setIsNavOpen} isNavOpen={isNavOpen}></TopNavbar>
      {
        auth ?  
        <Stack.Navigator >
        <Stack.Screen name="Home" component={MainScreen}  options={{ headerShown: false }}  /> 
        <Stack.Screen name="Shipment" component={Shipment}  options={{ headerShown: false }} />
        <Stack.Screen name="booking" component={Booking}  options={{ headerShown: false }} />
      </Stack.Navigator> 
      : <Stack.Navigator >
        <Stack.Screen name="Login" component={(props) => <LoginScreen {...props} gobalLoader={gobalLoader} setGobalLoader={setGobalLoader} />}  options={{ headerShown: false }}/>
      </Stack.Navigator>
      }
      </NavigationContainer>


{
  isNavOpen &&  
  <NavBar setGobalLoader={setGobalLoader} gobalLoader={gobalLoader}></NavBar>
}
     
         </View>
  </PaperProvider>
  </MyContext.Provider>
  );
}



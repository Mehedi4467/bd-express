
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './src/screens/MainScreen';
import withAuth from './withAuth';
import TopNavbar from './src/components/Home/TopNavbar';
import LoginScreen from './src/screens/LoginScreen';

const Stack = createStackNavigator();

export default function App() {
  // const [isLoading, setIsLoading] = useState(true);



// useEffect(() => {
//     // Simulate loading time
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 3000);
//   }, []);

  

  return (
    
    <NavigationContainer>
      <TopNavbar></TopNavbar>
     <Stack.Navigator >
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={withAuth(MainScreen)} options={{ headerShown: false }} />
      </Stack.Navigator>
  </NavigationContainer>
  );
}



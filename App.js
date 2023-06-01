import MainScreen from "./src/screens/MainScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import { useEffect, useState } from "react";
import Shipment from "./src/screens/Shipment";
import Booking from "./src/screens/Booking";
import { Provider as PaperProvider } from "react-native-paper";
import { auxDataApi } from "./src/api/Shipment/VerifyShipment";
import MyContext from "./src/utility/MyContext";
import ViewCarton from "./src/screens/ViewCarton";
import CBMCalculator from "./src/screens/CBMCalculator";
import CbmScreen from "./src/screens/CbmScreen";
import DeepCheck from "./src/screens/DeepCheck";
import UpdateBooking from "./src/screens/UpdateBooking";
const Stack = createNativeStackNavigator();

export default function App() {
  const [primaryData, setPrimaryData] = useState([]);
  const [refetchData, setRefatchData] = useState(false);

  const auxData = async () => {
    const data = await auxDataApi();
    setPrimaryData(data);
  };

  useEffect(() => {
    auxData();
  }, [refetchData]);

  return (
    <MyContext.Provider value={{ primaryData, setRefatchData, refetchData }}>
      <PaperProvider>
        <View style={{ flex: 1, position: "relative" }}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Home"
                component={MainScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Shipment"
                component={Shipment}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="booking"
                component={Booking}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="view_carton"
                component={ViewCarton}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="setCbm"
                component={CBMCalculator}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="cbm"
                component={CbmScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="check"
                component={DeepCheck}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="update"
                component={UpdateBooking}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </PaperProvider>
    </MyContext.Provider>
  );
}

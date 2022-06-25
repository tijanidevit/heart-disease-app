import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import {
  Home,
  Login,
  Register,
  Predict,
  Splash,
  Profile,
  Predictions,
} from "./screens";
import { NativeBaseProvider, Text, StatusBar, Box } from "native-base";
import { customTheme } from "./themes";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider theme={customTheme}>
      <StatusBar
        backgroundColor="#E11D48"
        translucent={true}
        barStyle="light-content"
      />
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="Splash"
          >
            <Stack.Screen
              name="Splash"
              component={Splash}
              options={{
                headerShown: false,
              }}
              headerTitle={false}
              StatusBar="false"
            />

            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Predict" component={Predict} />
            <Stack.Screen name="Predictions" component={Predictions} />
            <Stack.Screen name="Profile" component={Profile} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}

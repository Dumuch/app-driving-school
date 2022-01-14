import React from "react";
import { Alert } from "react-native";
import { Provider } from "react-redux";
import NetInfo from "@react-native-community/netinfo";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";

import SplashScreen from "./src/screens/SplashScreen";
import LoginScreen from "./src/screens/LoginScreen";
import DrawerNavigationRoutes from "./src/screens/DrawerNavigationRoutes";

import configureStore from "./src/store/index";

const store = configureStore();
const Stack = createStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  const unsubscribe = NetInfo.addEventListener((state) => {
    if (!state.isConnected) {
      Alert.alert(
        "Нет доступа в сеть интернет.",
        "Проверьте подключение к сети"
      );
    }
  });

  unsubscribe();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Auth"
            component={Auth}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DrawerNavigationRoutes"
            component={DrawerNavigationRoutes}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "./DrawerScreens/HomeScreen";
import SettingsScreen from "./DrawerScreens/SettingsScreen";
import LessonsScreen from "./DrawerScreens/LessonsScreen";

import CustomSidebarMenu from "../components/CustomSidebarMenu";
import NavigationDrawerHeader from "../components/NavigationDrawerHeader";

import { THEME } from "../theme";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const homeScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Главная",
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: THEME.HEADER_BACKGROUND_COLOR,
          },
          headerTintColor: THEME.HEADER_TINT_COLOR,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  );
};

const settingScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: THEME.HEADER_BACKGROUND_COLOR,
        },
        headerTintColor: THEME.HEADER_TINT_COLOR,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: "Настройки",
        }}
      />
    </Stack.Navigator>
  );
};



const lessonsScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="LessonsScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: THEME.HEADER_BACKGROUND_COLOR,
        },
        headerTintColor: THEME.HEADER_TINT_COLOR,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="LessonsScreen"
        component={LessonsScreen}
        options={{
          title: "Занятия",
        }}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigatorRoutes = (props) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: THEME.ACTIVE_TINT_COLOR,
        drawerActiveBackgroundColor: THEME.ACTIVE_BACKGROUND_COLOR,
        drawerInactiveTintColor: THEME.INACTIVE_TINT_COLOR,
      }}
      drawerContent={CustomSidebarMenu}
    >
      <Drawer.Screen
        name="homeScreenStack"
        options={{ drawerLabel: "Главная" }}
        component={homeScreenStack}
      />
      <Drawer.Screen
        name="lessonsScreenStack"
        options={{ title: "Занятия" }}
        component={lessonsScreenStack}
      />
      <Drawer.Screen
        name="settingScreenStack"
        options={{ title: "Настройки" }}
        component={settingScreenStack}
      />
     
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;
import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import RightDrawerScreen from "./DrawerNavigator";
import LoginScreen from "../screens/LoginScreen";
import CheckEmailScreen from "../screens/CheckEmailScreen";
import SplashScreen from "../screens/SplashScreen";

const Stack = createStackNavigator();

const StackNavigator = function () {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.headers,
        headerTintColor: "#fff",
        headerTitleStyle: { alignSelf: "flex-start" },
      }}
    >

<Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{
          title: "S'identifier",
          headerStyle: styles.headers,
          headerTintColor: "#fff",
          headerBackVisible: false,
        }}
      />

      <Stack.Screen
        name="CheckEmail"
        component={CheckEmailScreen}
        options={{
          title: "S'identifier",
          headerStyle: styles.headers,
          headerTintColor: "#fff",
          headerBackVisible: false,
        }}
      />

      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: "S'identifier",
          headerStyle: styles.headers,
          headerTintColor: "#fff",
          headerBackVisible: false,
        }}
      />



      <Stack.Screen
        name="Home"
        component={RightDrawerScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headers: {
    backgroundColor: "#0E0E66",
    height: 85,
  },
});

export default StackNavigator;

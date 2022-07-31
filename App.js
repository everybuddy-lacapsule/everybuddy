import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from "react-native";
import StackNavigator from './navigation/StackNavigator'

LogBox.ignoreAllLogs();

// APP ----------------------------------------------------------------
export default function App() {
  return (
    // <Provider store={store}>
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
    // </Provider>
  );
}
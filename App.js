import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, LogBox } from "react-native";
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  headers: {
    backgroundColor: "#0E0E66",
    height: 90,
  },
  left: {
    marginLeft: 20,
  },
  right: {
    marginRight: 20,
  },
});

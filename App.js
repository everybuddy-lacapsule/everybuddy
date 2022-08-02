import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { LogBox, StatusBar } from "react-native";
import StackNavigator from "./navigation/StackNavigator";

import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import userID from "./reducers/userID";
import userEmail from "./reducers/userEmail";

LogBox.ignoreAllLogs();

const store = createStore(combineReducers({ userID, userEmail }));


// APP ----------------------------------------------------------------
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </Provider>
  );
}

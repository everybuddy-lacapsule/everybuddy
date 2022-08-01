import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from "react-native";
import StackNavigator from './navigation/StackNavigator'

import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import user from "./reducers/user";

LogBox.ignoreAllLogs();

const store = createStore(combineReducers({ user }));


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
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { LogBox, StatusBar } from "react-native";
import StackNavigator from "./navigation/StackNavigator";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import userDatas from "./reducers/userDatas";
import userEmail from "./reducers/userEmail";
import {searchResults} from "./reducers/searchResults";
import {discussionInfos} from "./reducers/discussionInfos";
import alumniIDSearch from "./reducers/alumniIDSearch";


LogBox.ignoreAllLogs();

const store = createStore(combineReducers({ userDatas, userEmail, searchResults, discussionInfos, alumniIDSearch }));

// APP ----------------------------------------------------------------
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar backgroundColor="#8686b3" barStyle="default" />
        <StackNavigator />
      </NavigationContainer>
    </Provider>
  );
}

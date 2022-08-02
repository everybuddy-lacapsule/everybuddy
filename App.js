import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { LogBox, StatusBar } from "react-native";
import StackNavigator from "./navigation/StackNavigator";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import userID from "./reducers/userID";
import userEmail from "./reducers/userEmail";
import searchResults from "./reducers/searchResults";

LogBox.ignoreAllLogs();

const store = createStore(combineReducers({ userID, userEmail, searchResults }));

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

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { LogBox, StatusBar } from "react-native";
import StackNavigator from "./navigation/StackNavigator";

LogBox.ignoreAllLogs();

// APP ----------------------------------------------------------------
export default function App() {
	return (
		// <Provider store={store}>
		<NavigationContainer>
			<StatusBar backgroundColor="#8686b3" barStyle="default" />
			<StackNavigator />
		</NavigationContainer>
		// </Provider>
	);
}

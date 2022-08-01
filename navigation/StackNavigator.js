import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import DrawerNavigator from "./DrawerNavigator";
import LoginScreen from "../screens/LoginScreen";

const Stack = createStackNavigator();

const StackNavigator = function () {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: styles.headers,
				headerTintColor: "#fff",
			}}
		>
			<Stack.Screen
				name="Login"
				component={LoginScreen}
				options={{
					title: "S'identifier",
					headerStyle: styles.headers,
					headerTintColor: "#fff",
					headerTitleAlign: 'center',
					headerBackVisible: true,
				}}
			/>
			<Stack.Screen
				name="Home"
				component={DrawerNavigator}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
};

const styles = StyleSheet.create({
	headers: {
		backgroundColor: "#0E0E66",
		height: 55,
	},
});

export default StackNavigator;

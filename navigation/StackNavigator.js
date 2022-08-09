import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import RightDrawerScreen from "./DrawerNavigator";
import LoginScreen from "../screens/LoginScreen";
import CheckEmailScreen from "../screens/CheckEmailScreen";
import SplashScreen from "../screens/SplashScreen";
import OnboardingScreenInfo from "../screens/OnboardingScreenInfo";
import OnBoardingStatus from "../screens/OnBoardingStatus";

const Stack = createStackNavigator();

const StackNavigator = function () {

	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: styles.headers,
				headerTintColor: "#fff",
				headerTitleStyle: { alignSelf: "center" },

			}}
		>

			<Stack.Screen
				name="SplashScreen"
				component={SplashScreen}
				options={{
					title: "",
					headerStyle: styles.headers,
					headerTintColor: "#fff",
					headerBackVisible: false,
					headerShown: false,
				}}
			/>

			<Stack.Screen
				name="CheckEmail"
				component={CheckEmailScreen}
				options={{
					title: "S'identifier",
					headerTitleAlign: 'center',
					headerStyle: styles.headers,
					headerTintColor: "#fff",
					headerBackVisible: false,
				}}
			/>

			<Stack.Screen
				name="LoginScreen"
				component={LoginScreen}
				options={{
					title: "S'identifier",
					headerTitleAlign: 'center',
					headerStyle: styles.headers,
					headerTintColor: "#fff",
					headerBackVisible: false,
				}}
			/>

			<Stack.Screen
				name="OnboardingScreenInfo"
				component={OnboardingScreenInfo}
				options={{
					title: "Faisons connaissance !",
					headerTitleAlign: 'center',
					headerStyle: styles.headers,
					headerTintColor: "#fff",
					headerBackVisible: false,
				}}
			/>

			<Stack.Screen
				name="OnBoardingStatus"
				component={OnBoardingStatus}
				options={{
					title: "Faisons connaissance !",
					headerTitleAlign: 'center',
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
		height: 55,
	},
});

export default StackNavigator;

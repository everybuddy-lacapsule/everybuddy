import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import DrawerNavigator from "./DrawerNavigator";
import LoginScreen from "../screens/LoginScreen";

const Stack = createStackNavigator();

const StackNavigator = function () {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: styles.headers,
				headerTintColor: "#fff",
				headerTitleStyle: { alignSelf: "flex-start" },
				headerLeft: () => (
					<TouchableOpacity style={styles.left}>
						{/* <Feather
							name="menu"
							size={24}
							color="white"
							onPress={() => props.navigation.toggleDrawer()}
						/> */}
					</TouchableOpacity>
				),
				headerRight: () => (
					<TouchableOpacity style={styles.right}>
						{/* <Ionicons name="options" size={24} color="white" /> */}
					</TouchableOpacity>
				),
			}}
		>
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
				component={DrawerNavigator}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
};

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

export default StackNavigator;

import React from "react";
import { StyleSheet } from "react-native";
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem,
} from "@react-navigation/drawer";
import TabsNavigator from "./TabsNavigator";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
	const colors = ["#7C4DFF", "#F94A56", "#FF1744"];

	return (
		<LinearGradient
			colors={colors}
			style={{ flex: 1 }}
			start={{ x: 0.3, y: 0.4 }}
			end={{ x: 2, y: 0.7 }}
		>
			<DrawerContentScrollView {...props}>
				<DrawerItemList {...props} />
				<DrawerItem
					label="Buddies"
					onPress={() => props.navigation.navigate("Buddies")}
				></DrawerItem>
				<DrawerItem
					label="My Profile"
					onPress={() => props.navigation.navigate("MyProfile")}
				></DrawerItem>
				<DrawerItem label="Paramètres"></DrawerItem>
			</DrawerContentScrollView>
		</LinearGradient>
	);
}

const DrawerNavigator = () => {
	return (
		<Drawer.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: "#0E0E66",
				},
				headerTintColor: "#fff",
				overlayColor: "transparent",
				drawerType: "front",
				drawerStyle: {
					width: " 80%",
					marginTop: 84.5,
					marginBottom: 48,
					headerRight: () => (
						<TouchableOpacity style={styles.right}>
							<Ionicons name="options" size={24} color="white" />
						</TouchableOpacity>
					),
				},
			}}
			
			useLegacyImplementation
			drawerContent={(props) => <CustomDrawerContent {...props} />}
		>
			<Drawer.Screen
				name="Home"
				component={TabsNavigator}
				options={{ drawerItemStyle: { height: 0 },headerShown : false }}
			/>
		</Drawer.Navigator>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	left: {
		marginLeft: 20,
	},
	right: {
		marginRight: 20,
	},
});

export default DrawerNavigator;

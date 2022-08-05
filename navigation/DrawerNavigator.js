import React  from "react";
import { StyleSheet } from "react-native";
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem,
} from "@react-navigation/drawer";
import { Divider} from "@rneui/themed";
import TabsNavigator from "./TabsNavigator";
import CustomRightDrawerContent from "../components/RightDrawerContent";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Drawer = createDrawerNavigator();

//*LEFT DRAWER CONTENT
function CustomLeftDrawerContent(props) {
	const colors = ["#7C4DFF", "#F94A56", "#FF1744"];
	const hollowWhite = "rgba(255, 255, 255, 0.5)";

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
					inactiveTintColor={hollowWhite}
					activeTintColor="white"
					onPress={() => props.navigation.navigate("Buddies")}
				></DrawerItem>
				<DrawerItem
					label="My Profile"
					inactiveTintColor={hollowWhite}
					activeTintColor="white"
					onPress={() => props.navigation.navigate("MyProfile")}
				></DrawerItem>
				<Divider
					color={hollowWhite}
					style={{ width: " 90%", marginLeft: "5%" }}
				/>
				<DrawerItem
					label="Paramètres"
					inactiveTintColor={hollowWhite}
				></DrawerItem>
				<DrawerItem
					label="Se déconnecter"
					inactiveTintColor={hollowWhite}
					activeTintColor="white"
					onPress={() => {AsyncStorage.clear(), props.navigation.navigate("LoginScreen")}}
				></DrawerItem>
			</DrawerContentScrollView>
		</LinearGradient>
	);
}
//* LEFT DRAWER
const LeftDrawerScreen = () => {
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
					marginTop: 56,
					marginBottom: 48.5,
					width: " 80%",
				},
			}}
			useLegacyImplementation
			drawerContent={(props) => <CustomLeftDrawerContent {...props} />}
		>
			<Drawer.Screen
				name="Map"
				component={TabsNavigator}
				options={{ drawerItemStyle: { display: "none" }, headerShown: false }}
			/>
		</Drawer.Navigator>
	);
};

//*RIGHT DRAWER Wrapping LEFT DRAWER
const RightDrawer = createDrawerNavigator();
const RightDrawerScreen = () => {
	return (
		<RightDrawer.Navigator
			id="RightDrawer"
			screenOptions={{
				drawerPosition: "right",
				headerShown: false,
				headerStyle: {
					backgroundColor: "#0E0E66",
				},
				headerTintColor: "#fff",
				overlayColor: "transparent",
				drawerType: "front",
				drawerStyle: {
					marginTop: 56,
					marginBottom: 48.5,
					width: " 80%",
					headerRight: () => (
						<TouchableOpacity
							style={styles.right}
							onPress={() => props.navigation.toggleDrawer()}
						>
							<Ionicons name="options" size={24} color="white" />
						</TouchableOpacity>
					),
				},
			}}
			useLegacyImplementation
			drawerContent={(props) => <CustomRightDrawerContent {...props} />}
		>
			<RightDrawer.Screen
				name="HomeDrawer"
				component={LeftDrawerScreen}
				options={{ drawerItemStyle: { height: 0 }, headerShown: false }}
			/>
		</RightDrawer.Navigator>
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
	RDContent: {
		flexGrow: 1,
		marginLeft: 15,
		marginRight: 15,
		marginTop: 10,
		marginBottom: 15,
		borderRadius: 5,
	},
	input: {
		backgroundColor: "rgba(255, 255, 255, 0.5)",
		borderRadius: 3,
		width: 40,
		marginLeft: 5,
		padding: 5,
		textAlign: "center",
	},
	DDitem: {
		flex: 1,
		alignItems: "center",
		marginLeft: 15,
		marginRight: 15,
	},
	text: { color: "rgba(255, 255, 255, 0.7)" },
});

export default RightDrawerScreen;

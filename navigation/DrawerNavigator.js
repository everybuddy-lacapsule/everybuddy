import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem,
} from "@react-navigation/drawer";
import { Divider, Switch } from "@rneui/themed";
import TabsNavigator from "./TabsNavigator";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";

import { ListItem } from "@rneui/base";
import { ListItemAccordion } from "@rneui/base/dist/ListItem/ListItem.Accordion";

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

//* RIGHT DRAWER CONTENT
function CustomRightDrawerContent(props) {
	let colors = ["#FF1744", "#F94A56", "#7C4DFF"];
	const [expanded, setExpanded] = useState(false);
	const [expanded1, setExpanded1] = useState(false);
	const [toggled, setToggled] = useState();
	const [toggled1, setToggled1] = useState();
	const [checked, setChecked] = useState(false);

	const toggleSwitch = () => {
		setChecked(!checked);
	};

	return (
		<LinearGradient
			colors={colors}
			style={{ flex: 1 }}
			start={{ x: -1, y: 0 }}
			end={{ x: 1, y: 0.3 }}
		>
			<DrawerContentScrollView {...props}>
				<View style={[styles.RDContent, { backgroundColor: toggled }]}>
					<ListItemAccordion
						containerStyle={{ backgroundColor: "transparent" }}
						isExpanded={expanded}
						onPress={() => {
							setExpanded(!expanded);
							!expanded
								? setToggled("rgba(255, 255, 255, 0.2)")
								: setToggled("transparent");
						}}
						content={
							<>
								{/*
								//* DROPDOWN #1 - TITLE 
								// <Image source={require('../assetss/caps.png')} style={{ width:24, height:24, marginRight: 10}} color='black' /> 
								*/}
								<ListItem.Content>
									<ListItem.Title style={{ color: "#fff" }}>
										Parcours @ La Capsule
									</ListItem.Title>
								</ListItem.Content>
							</>
						}
					>
						<View
							style={{ flex: 1, color: "#ffffff", flexDirection: "column" }}
						>
							{/*//* DROPDOWN #1 - OPTION #1 */}
							<View style={[styles.DDitem, { flexDirection: "row" }]}>
								<Text style={styles.text}>Batch</Text>
								<TextInput
									style={styles.input}
									placeholder="#_ _"
									placeholderTextColor="rgba(255, 255, 255, 0.5)"
								/>
							</View>
							<Divider
					style={{
						width: " 90%",
						borderWidth: 1,
						borderColor: "rgba(255, 255, 255, 0.25)",
						marginTop: 10,
						marginBottom: 10,
						marginLeft: "5%",
					}}
				/>
							{/*//* DROPDOWN #1 - OPTION #2*/}
							<View
								style={{
									flexDirection: "column",
									justifyContent: "space-evenly",
								}}
							>
								<View style={[styles.DDitem, { flexDirection: "row" }]}>
									<Text style={styles.text}>Campus</Text>
								</View>
								<View
									style={[
										styles.DDitem,
										{ flexDirection: "row", justifyContent: "space-between" },
									]}
								>
									<Text style={styles.text}>Paris</Text>
									<Switch
										style={{ alignSelf: "flex-end" }}
										value={checked}
										color="#fff"
										onValueChange={(value) => setChecked(value)}
									/>
								</View>
								<View
									style={[
										styles.DDitem,
										{ flexDirection: "row", justifyContent: "space-between" },
									]}
								>
									<Text style={styles.text}>Lyon</Text>
									<Switch
										style={{ alignSelf: "flex-end" }}
										value={checked}
										color="#fff"
										onValueChange={(value) => setChecked(value)}
									/>
								</View>
								<View
									style={[
										styles.DDitem,
										{ flexDirection: "row", justifyContent: "space-between" },
									]}
								>
									<Text style={styles.text}>Bordeaux</Text>
									<Switch
										style={{ alignSelf: "flex-end" }}
										value={checked}
										color="#fff"
										onValueChange={(value) => setChecked(value)}
									/>
								</View>
							</View>
							
						</View>
					</ListItemAccordion>
				</View>
				<Divider
					style={{
						width: " 90%",
						borderWidth: 1,
						borderColor: "rgba(255, 255, 255, 0.3)",
						marginLeft: "5%",
					}}
				/>
				<View style={[styles.RDContent, { backgroundColor: toggled1 }]}>
					<ListItemAccordion
						containerStyle={{ backgroundColor: "transparent" }}
						isExpanded={expanded1}
						onPress={() => {
							setExpanded1(!expanded1);
							!expanded1
								? setToggled1("rgba(255, 255, 255, 0.2)")
								: setToggled1("transparent");
						}}
						content={
							<>
								{/*
								//* DROPDOWN #1 - TITLE 
								// <Image source={require('../assetss/caps.png')} style={{ width:24, height:24, marginRight: 10}} color='black' /> 
								*/}
								<ListItem.Content>
									<ListItem.Title style={{ color: "#fff" }}>
										Parcours @ La Capsule
									</ListItem.Title>
								</ListItem.Content>
							</>
						}
					>
						<View
							style={{ flex: 1, color: "#ffffff", flexDirection: "column" }}
						>
							{/*//* DROPDOWN #1 - OPTION #1 */}
							<View style={[styles.DDitem, { flexDirection: "row" }]}>
								<Text style={styles.text}>Batch</Text>
								<TextInput
									style={styles.input}
									placeholder="#_ _"
									placeholderTextColor="rgba(255, 255, 255, 0.5)"
								/>
							</View>
							<Divider
					style={{
						width: " 90%",
						borderWidth: 1,
						borderColor: "rgba(255, 255, 255, 0.25)",
						marginTop: 10,
						marginBottom: 10,
						marginLeft: "5%",
					}}
				/>
							{/*//* DROPDOWN #1 - OPTION #2*/}
							<View
								style={{
									flexDirection: "column",
									justifyContent: "space-evenly",
								}}
							>
								<View style={[styles.DDitem, { flexDirection: "row" }]}>
									<Text style={styles.text}>Status</Text>
								</View>
								<View
									style={[
										styles.DDitem,
										{ flexDirection: "row", justifyContent: "space-between" },
									]}
								>
									<Text style={styles.text}>#OPEN TO WORK</Text>
									<Switch
										style={{ alignSelf: "flex-end" }}
										value={checked}
										color="#fff"
										onValueChange={(value) => setChecked(value)}
									/>
								</View>
								<View
									style={[
										styles.DDitem,
										{ flexDirection: "row", justifyContent: "space-between" },
									]}
								>
									<Text style={styles.text}>#HIRING</Text>
									<Switch
										style={{ alignSelf: "flex-end" }}
										value={checked}
										color="#fff"
										onValueChange={(value) => setChecked(value)}
									/>
								</View>
								<View
									style={[
										styles.DDitem,
										{ flexDirection: "row", justifyContent: "space-between" },
									]}
								>
									<Text style={styles.text}>#PARTNER</Text>
									<Switch
										style={{ alignSelf: "flex-end" }}
										value={checked}
										color="#fff"
										onValueChange={(value) => setChecked(value)}
									/>
								</View>
							</View>
							
						</View>
					</ListItemAccordion>
				</View>
			</DrawerContentScrollView>
		</LinearGradient>
	);
}
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

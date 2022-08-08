import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { connect } from "react-redux";

import MapScreen from "../screens/MapScreen";
import NewsScreen from "../screens/NewsScreen";
import MessengerScreen from "../screens/MessengerScreen";
import BuddiesScreen from "../screens/BuddiesScreen";
import MyProfileScreen from "../screens/MyProfileScreen";
import HeaderSearchBar from "../components/HeaderSearchBar";
import ChatScreen from "../screens/ChatScreen";
import { useDrawerStatus } from "@react-navigation/drawer";

const Tab = createBottomTabNavigator();
const hiddenTabs = ["Buddies", "MyProfile", "Chat"];

const TabsNavigator = function (props) {
	const isLeftDrawerVisible = useDrawerStatus();
	const [isLeftFocused, setIsLeftFocused] = useState(''); 

	useEffect(() => {
		if (isLeftDrawerVisible == "open") {
			console.log('prout', isLeftDrawerVisible);
			setIsLeftFocused(isLeftDrawerVisible)
		} else {
			setIsLeftFocused(isLeftDrawerVisible)
			console.log('prout2', isLeftDrawerVisible);

		}
	}, [isLeftDrawerVisible]);

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerRight: () =>
					props.drawerStatus == "open" ? (
						<View style={styles.right2}>
							<TouchableOpacity
								onPress={() => {
									props.navigation.getParent("RightDrawer").toggleDrawer();
								}}
							>
								<Ionicons name="options" size={24} color="#0E0E66" />
							</TouchableOpacity>
						</View>
					) : (
						<TouchableOpacity
							style={styles.right}
							onPress={() => {
								props.navigation.getParent("RightDrawer").toggleDrawer();
							}}
						>
							<Ionicons name="options" size={24} color="white" />
						</TouchableOpacity>
					),
				headerLeft: () => 
				isLeftFocused == "open" ? (
					<View style={styles.left2}>
						<TouchableOpacity
							onPress={() => {
								props.navigation.toggleDrawer();
							}}
						>
							<Ionicons name="options" size={24} color="#0E0E66" />
						</TouchableOpacity>
					</View>
				) : (
					<TouchableOpacity
						style={styles.left}
						onPress={() => {
							props.navigation.toggleDrawer();
						}}
					>
						<Ionicons name="options" size={24} color="white" />
					</TouchableOpacity>
				),
				headerStyle: {
					backgroundColor: "#0E0E66",
				},
				headerTintColor: "#fff",
				tabBarIcon: ({ color }) => {
					let iconName;
					if (route.name === "HomeMap") {
						iconName = "map-marked-alt";
					} else if (route.name === "Discussions") {
						iconName = "chatbubbles";
					} else if (route.name === "News") {
						iconName = "newspaper";
					}
					if (iconName == "map-marked-alt") {
						return <FontAwesome5 name={iconName} size={24} color={color} />;
					}
					if (iconName == "newspaper" || iconName == "chatbubbles") {
						return <Ionicons name={iconName} size={24} color={color} />;
					}
				},
				tabBarButton: hiddenTabs.includes(route.name) ? () => null : undefined,
			})}
			tabBarOptions={{
				showLabel: false,
				style: {
					height: 55,
					position: "absolute",
					bottom: 0,
					left: 0,
					right: 0,
					// borderRadius: 10,
					borderTopWidth: 0,
					// overflow: "hidden",
				},
				activeBackgroundColor: "#0E0E66",
				inactiveBackgroundColor: "#0E0E66",
				activeTintColor: "#FFFFFF",
				inactiveTintColor: "rgba(255, 255, 255, 0.5)",
			}}
		>
			<Tab.Screen
				name="HomeMap"
				component={MapScreen}
				options={{
					headerStyle: styles.headers,
					headerTintColor: "#fff",
					headerTitleAlign: "center",
					headerTitle:
						props.drawerStatus === "open"
							? "Recherche avancée"
							: (props) => <HeaderSearchBar {...props} />,
				}}
			/>
			<Tab.Screen
				name="Discussions"
				component={MessengerScreen}
				options={{
					headerRight: () => <View style={styles.right}></View>,
				}}
			/>
			<Tab.Screen
				name="Buddies"
				component={BuddiesScreen}
				options={{
					headerRight: () => <View style={styles.right}></View>,
				}}
			/>
			<Tab.Screen
				name="Chat"
				component={ChatScreen}
				options={{
					headerRight: () => <View style={styles.right}></View>,
				}}
			/>
			<Tab.Screen
				name="MyProfile"
				component={MyProfileScreen}
				options={{
					headerRight: () => (
						<TouchableOpacity
							style={styles.right}
							//TODO enable profile modification mode
							//TODO onPress={() => }
						>
							<Ionicons name="pencil" size={20} color="white" />
						</TouchableOpacity>
					),
				}}
			/>
			<Tab.Screen
				name="News"
				component={NewsScreen}
				options={{
					headerRight: () => (
						<TouchableOpacity
							style={styles.right}
							onPress={() => props.navigation.navigate("HomeMap")}
						>
							<Ionicons name="md-close" size={20} color="white" />
						</TouchableOpacity>
					),
				}}
			/>
		</Tab.Navigator>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	searchBar: {
		height: "100%",
		width: "100%",
		backgroundColor: "rgba(255, 255, 255, 0.5)",
		color: "white",
		borderTopLeftRadius: 50,
		borderBottomLeftRadius: 50,
		paddingLeft: 15,
		paddingRight: 15,
	},
	headers: {
		backgroundColor: "#0E0E66",
		height: 56,
	},
	headerTitle: {
		flexDirection: "row",
		marginRight: 30,
	},
	searchButton: {
		alignSelf: "baseline",
		backgroundColor: "#E74C3C",
		padding: 6,
		borderRadius: 50,
	},
	searchButtonBackground: {
		backgroundColor: "rgba(255, 255, 255, 0.5)",
		borderTopRightRadius: 50,
		borderBottomRightRadius: 50,
	},
	left: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		width: 64,
	},
	left2: {
		alignSelf: "center",
		justifyContent: "center",
		alignItems: "center",
		width: 34,
		backgroundColor: "white",
		borderRadius: 5,
		marginLe:20,
	},
	right: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		width: 64,
	},
	right2: {
		alignSelf: "center",
		justifyContent: "center",
		alignItems: "center",
		width: 34,
		backgroundColor: "white",
		borderRadius: 5,
		marginLeft: 20,
	},
});

const mapStateToProps = (state) => {
	return {
		searchResults: state.searchResults,
		userDatas: state.userDatas,
		drawerStatus:state.drawerStatus,
	};
};

function mapDispatchToProps(dispatch) {
	return {
		leftDrawerStatus: function (status) {
			dispatch({ type: "leftDrawer status", leftDrawerStatus: status });
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(TabsNavigator);

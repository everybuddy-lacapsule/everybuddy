import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import MapScreen from "../screens/MapScreen";
import NewsScreen from "../screens/NewsScreen";
import MessengerScreen from "../screens/MessengerScreen";
import BuddiesScreen from "../screens/BuddiesScreen";
import MyProfileScreen from "../screens/MyProfileScreen";

const Tab = createBottomTabNavigator();
const hiddenTabs = ["Buddies", "MyProfile"];

const TabsNavigator = function (props) {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerRight: () => (
					<TouchableOpacity style={styles.right}>
						<Ionicons
							name="options"
							size={25}
							color="white"
							onPress={() =>
								props.navigation.getParent("RightDrawer").toggleDrawer()
							}
						/>
					</TouchableOpacity>
				),
				headerLeft: () => (
					<TouchableOpacity style={styles.left}>
						<Feather
							name="menu"
							size={24}
							color="white"
							onPress={() => props.navigation.toggleDrawer()}
						/>
					</TouchableOpacity>
				),
				headerStyle: {
					backgroundColor: "#0E0E66",
				},
				headerTintColor: "#fff",
				tabBarIcon: ({ color }) => {
					let iconName;
					if (route.name === "Home") {
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
					height: 40,
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
				inactiveTintColor: "#8686b3",
			}}
		>
			<Tab.Screen name="Home" component={MapScreen} />
			<Tab.Screen name="Discussions" component={MessengerScreen} />
			<Tab.Screen name="Buddies" component={BuddiesScreen} />
			<Tab.Screen name="MyProfile" component={MyProfileScreen} />
			<Tab.Screen name="News" component={NewsScreen} />
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
	left: {
		marginLeft: 20,
	},
	right: {
		marginRight: 20,
	},
});

export default TabsNavigator;

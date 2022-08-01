import React from "react";
import { TouchableOpacity, StyleSheet,View, TextInput } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import MapScreen from "../screens/MapScreen";
import NewsScreen from "../screens/NewsScreen";
import MessengerScreen from "../screens/MessengerScreen";
import BuddiesScreen from "../screens/BuddiesScreen";
import MyProfileScreen from "../screens/MyProfileScreen";

const Tab = createBottomTabNavigator();
const hiddenTabs = ["Buddies", "MyProfile"];

const TabsNavigator = function (props) {
	function HeaderSearchBar() {
		return (
			<View style={styles.headerTitle}>
				<TextInput style={styles.searchBar} placeholder="Type in city" />
				<TouchableOpacity style={styles.searchButtonBackground}>
				<FontAwesome style={styles.searchButton} name="search" size={16} color="white" />
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerRight: () => (
					<TouchableOpacity 
					style={styles.right}
					onPress={() =>
					props.navigation.getParent("RightDrawer").toggleDrawer()
					}
					>
						<Ionicons
							name="options"
							size={24}
							color="white"
						/>
					</TouchableOpacity>
				),
				headerLeft: () => (
					<TouchableOpacity style={styles.left}
					onPress={() => props.navigation.toggleDrawer()}
					>
						<Feather
							name="menu"
							size={24}
							color="white"
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
			<Tab.Screen
				name="Home"
				component={MapScreen}
				options={{
					title: "S'identifier",
					headerStyle: styles.headers,
					headerTintColor: "#fff",
					headerTitleAlign: "center",
					headerTitle: (props) => <HeaderSearchBar {...props} />,
				}}
			/>
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
	searchBar: {
		height: "100%",
		width: '100%',
		backgroundColor: "rgba(255, 255, 255, 0.5)",
		color: "white",
		borderTopLeftRadius: 50,
		borderBottomLeftRadius: 50,
		paddingLeft: 15,
		paddingRight: 15,
	},
	headers: {
		backgroundColor: "#0E0E66",
		height:56
	},
	headerTitle:{
		flexDirection:'row',
		marginRight:30,

	},
	searchButton:{
	alignSelf: 'center',
	backgroundColor: '#E74C3C',	
	padding:6,	
	borderRadius:50,
	},
	searchButtonBackground:{
		backgroundColor: "rgba(255, 255, 255, 0.5)",
		borderTopRightRadius: 50,
		borderBottomRightRadius: 50,
	},
	left: {
		flex:1,
		justifyContent: 'center',
		alignItems: 'center',
		width:'100%',
	},
	right: {
		flex:1,
		justifyContent: 'center',
		alignItems: 'center',
		width:'100%',
	},
});

export default TabsNavigator;

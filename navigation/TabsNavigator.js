import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { REACT_APP_DEV_MODE } from "@env";

import MapScreen from "../screens/MapScreen";
import NewsScreen from "../screens/NewsScreen";
import MessengerScreen from "../screens/MessengerScreen";
import BuddiesScreen from "../screens/BuddiesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MyProfileScreen from "../screens/MyProfileScreen";
import HeaderSearchBar from "../components/HeaderSearchBar";
import ChatScreen from "../screens/ChatScreen";
import { useDrawerStatus } from "@react-navigation/drawer";
import editionMode from "../reducers/editionMode";

const Tab = createBottomTabNavigator();
const hiddenTabs = ["Buddies", "MyProfile", "Chat", "ProfileScreen"];

const TabsNavigator = function (props) {
	// console.log("IP in tabs", REACT_APP_DEV_MODE);
	const isLeftDrawerVisible = useDrawerStatus();
	const [isLeftFocused, setIsLeftFocused] = useState("");
	const [alumniDatas, setAlumniDatas] = useState({});
	const [editing, setEditing] = useState(false);

	useEffect(() => {
		props.editionMode(editing);
	}, []);

  useEffect(() => {
    if (isLeftDrawerVisible == "open") {
      setIsLeftFocused(isLeftDrawerVisible);
    } else {
      setIsLeftFocused(isLeftDrawerVisible);
    }
  }, [isLeftDrawerVisible]);
  /*--------------VALIDATION AND SAVE USER DATAS IN DB------------------*/
  // A METTRE DANS LE HEADER CONCERNE
  const updateProfileSumbit = async () => {
    console.log("in tabsnavigator: ", props.userDatas);
    var res = await fetch(`${REACT_APP_DEV_MODE}/users/updateProfile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(props.userDatas),
    });
    res = await res.json();
    let userDatasCopy = {...props.userDatas}
    userDatasCopy.address.country = res.country
    props.setUserDatas(userDatasCopy)

  };

	/*--------------------ADD / REMOVE A BUDDY ------------*/
	const updateBuddies = async (buddy) => {
		if (props.buddiesList.find((o) => o._id === buddy._id)) {
			/*------------------------------Remove buddy if exist in list----------------------- */
			const response = await fetch(
				`${REACT_APP_DEV_MODE}/buddies/deleteBuddy`,
				{
					method: "DELETE",
					headers: { "Content-Type": "application/x-www-form-urlencoded" },
					body: `userID=${props.userDatas._id}&buddyID=${buddy._id}`,
				}
			);
			const responseJSON = await response.json();
			return responseJSON;
		} else {
			/*------------------------------Add buddy if not in list----------------------- */
			const response = await fetch(`${REACT_APP_DEV_MODE}/buddies/addBuddy`, {
				method: "PUT",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: `userID=${props.userDatas._id}&buddyID=${buddy._id}`,
			});
			const responseJSON = await response.json();
			return responseJSON;
		}
	};

	useEffect(() => {
		const getAlumnisDatas = async () => {
			const response = await fetch(
				`${REACT_APP_DEV_MODE}/users/getUserDatas?userID=${props.alumniIDSearch}`
			);
			const dataJSON = await response.json();
			setAlumniDatas(dataJSON.userDatas);
		};
		getAlumnisDatas();
	}, [props.alumniIDSearch]);

	var icon;
	props.editingMode
		? (icon = <Feather name="check" size={24} color="white" />)
		: (icon = <Ionicons name="pencil" size={20} color="white" />);

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerRight: () =>
					props.drawerStatus == "open" ? (
						<TouchableOpacity
							onPress={() => {
								props.navigation.getParent("RightDrawer").toggleDrawer();
							}}
						>
							<Ionicons
								name="options"
								size={24}
								color="#0E0E66"
								style={styles.right2}
							/>
						</TouchableOpacity>
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
						<TouchableOpacity
							style={styles.left2}
							onPress={() => {
								props.navigation.toggleDrawer();
							}}
						>
							<Feather name="menu" size={24} color="#0E0E66" />
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							style={styles.left}
							onPress={() => {
								props.navigation.toggleDrawer();
							}}
						>
							<Feather name="menu" size={24} color="white" />
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
				tabBarShowLabel: false,
				style: {
					height: 55,
					position: "absolute",
					bottom: 0,
					left: 0,
					right: 0,
					borderTopWidth: 0,
				},
				tabBarActiveBackgroundColor: "#0E0E66",
				tabBarInactiveBackgroundColor: "#0E0E66",
				tabBarActiveTintColor: "#FFFFFF",
				tabBarInactiveTintColor: "rgba(255, 255, 255, 0.5)",
				tabBarHideOnKeyboard:true,
			})}
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
							? "Recherche avanc??e"
							: (props) => <HeaderSearchBar {...props} />,
					unmountOnBlur: true,
				}}
			/>
			<Tab.Screen
				name="Discussions"
				component={MessengerScreen}
				options={{
					headerTitleAlign: "center",
					headerRight: () => <View style={styles.right}></View>,
					unmountOnBlur: true,
				}}
			/>
			<Tab.Screen
				name="Buddies"
				component={BuddiesScreen}
				options={{
					headerTitleAlign: "center",
					title: "Mes Buddies",
					headerRight: () => (
						<TouchableOpacity
							style={styles.right}
							onPress={() => props.navigation.navigate("HomeMap")}
						>
							<Ionicons name="md-close" size={20} color="white" />
						</TouchableOpacity>
					),
					unmountOnBlur: true,
				}}
			/>
			<Tab.Screen
				name="Chat"
				component={ChatScreen}
				options={{
					headerTitleAlign: "center",
					headerTitle: `${alumniDatas.firstName} ${alumniDatas.name}`,
					headerRight: () => <TouchableOpacity
					style={styles.right}
					onPress={() => props.navigation.navigate("Discussions")}
				>
					<Ionicons name="md-close" size={20} color="white" />
				</TouchableOpacity>,
					unmountOnBlur: true,
				}}
			/>
			<Tab.Screen
				name="ProfileScreen"
				component={ProfileScreen}
				options={{
					title: "Profil de l'Alumni",
					headerTitleAlign: "center",
					unmountOnBlur: true,
					headerRight: () => (
						<TouchableOpacity
							style={styles.right}
							onPress={() => {
								updateBuddies(alumniDatas).then((response) => {
									props.setBuddiesList(response.buddiesInfos);
								});
							}}
						>
							{props.buddiesList.find(
								(buddy) => buddy._id === props.alumniIDSearch
							) ? (
								<Ionicons name="person" size={25} color="#E74C3C" />
							) : (
								<Ionicons
									name="person-add"
									size={25}
									color="white"
									style={{ paddingRight: 2.5 }}
								/>
							)}
						</TouchableOpacity>
					),
				}}
			/>
			<Tab.Screen
				name="MyProfile"
				component={MyProfileScreen}
				options={{
					headerTitleAlign: "center",
					title: "Mon Profil",
					unmountOnBlur: true,
					headerRight: () => (
						<TouchableOpacity
							style={styles.right}
							//* enable profile modification mode
							onPress={() => {
								// console.log("toggle", editing);
								props.editionMode(!props.editingMode);
								updateProfileSumbit();
							}}
						>
							{icon}
						</TouchableOpacity>
					),
				}}
			/>
			<Tab.Screen
				name="News"
				component={NewsScreen}
				options={{
					headerTitleAlign: "center",
					headerRight: () => (
						<TouchableOpacity
							style={styles.right}
							onPress={() => props.navigation.navigate("HomeMap")}
						>
							<Ionicons name="md-close" size={20} color="white" />
						</TouchableOpacity>
					),
					unmountOnBlur: true,
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
		backgroundColor: "white",
		marginHorizontal: 20,
		borderRadius: 5,
	},
	right: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		width: 64,
	},
	right2: {
		backgroundColor: "white",
		width: 25,
		textAlign: "right",
		marginHorizontal: 21,
		borderRadius: 5,
	},
});

const mapStateToProps = (state) => {
	return {
		drawerStatus: state.drawerStatus,
		alumniIDSearch: state.alumniIDSearch,
		editingMode: state.editionMode,
		userDatas: state.userDatas,
		buddiesList: state.buddiesList,
	};
};

function mapDispatchToProps(dispatch) {
  return {
    leftDrawerStatus: function (status) {
      dispatch({ type: "leftDrawer status", leftDrawerStatus: status });
    },
    editionMode: function (status) {
      dispatch({ type: "toggleEditionMode", editionMode: status });
    },
    setBuddiesList: function (buddiesList) {
      dispatch({ type: "setBuddiesList", buddiesList });
    },
    setUserDatas: function (userDatas) {
      dispatch({ type: "register", userDatas });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TabsNavigator);

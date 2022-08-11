import React from "react";
import {
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem,
	View,
} from "@react-navigation/drawer";
import { Divider } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";

//*LEFT DRAWER CONTENT
function CustomLeftDrawerContent(props) {
	const colors = ["#7C4DFF", "#F94A56", "#FF1744"];
	const hollowWhite = "rgba(255, 255, 255, 0.5)";

	function itemIcon1(){
		return 	<FontAwesome name="user" size={24} color={hollowWhite} />
	}
	function itemIcon2(){
		return 	<FontAwesome name="users" size={20} color={hollowWhite} />
	}
	function itemIcon3(){
		return 	<FontAwesome name="gear" size={24} color={hollowWhite} />
	}
	function itemIcon4(){
		return 	<FontAwesome name="sign-out" size={24} color={hollowWhite} />
	}

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
					label="Mes Buddies"
					labelStyle={{marginLeft: -5}}
					icon={itemIcon2}
					inactiveTintColor="#fff"
					onPress={() => props.navigation.navigate("Buddies")}
				>
				</DrawerItem>
				<Divider
					color={hollowWhite}
					style={{ width: " 90%", marginLeft: "5%" }}
				/>
				<DrawerItem
					label="Mon Profil"
					icon={itemIcon1}
					inactiveTintColor="#fff"
					activeTintColor="white"
					onPress={() => props.navigation.navigate("MyProfile")}
				></DrawerItem>
				<Divider
					color={hollowWhite}
					style={{ width: " 90%", marginLeft: "5%" }}
				/>
				<DrawerItem
				
					label="Paramètres"
					labelStyle={{marginLeft: -3}}
					icon={itemIcon3}
					inactiveTintColor="#fff"
				></DrawerItem>
				<Divider
					color={hollowWhite}
					style={{ width: " 90%", marginLeft: "5%" }}
				/>
				<DrawerItem
					label="Se déconnecter"
					icon={itemIcon4}
					labelStyle={{marginLeft: -4}}
					inactiveTintColor="#fff"
					onPress={() => {
						AsyncStorage.clear(), props.navigation.navigate("SplashScreen");
					}}
				></DrawerItem>
			</DrawerContentScrollView>
		</LinearGradient>
	);
}

export default CustomLeftDrawerContent;

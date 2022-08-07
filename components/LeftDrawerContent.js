import React from "react";
import {
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem,
} from "@react-navigation/drawer";
import { Divider} from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export default CustomLeftDrawerContent;
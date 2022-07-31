import { Button, Text, View, StyleSheet,TouchableOpacity } from "react-native";

export default function BuddiesScreen(props) {
	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "blue",
			}}
		>
			<Text>Hello Buddies</Text>
			<Button
				title="Go to Map"
				onPress={() => {
					props.navigation.navigate("TabsNavigator", { screen: "Map" });
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	bottomNav: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
		backgroundColor: "#0E0E66",
		height: 60,
		color: "#FFFFFF",
	},
});

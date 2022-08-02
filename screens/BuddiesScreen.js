import { Button, Text, View } from "react-native";

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
					props.navigation.navigate("HomeMap");
				}}
			/>
		</View>
	);
}
import { Button, Text, View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function MapScreen() {
	return (
		<View style={styles.container}>
			<MapView
				style={styles.map}
				mapType="mutedStandard"
				userInterfaceStyle="dark"
				zoomEnabled={true}
				zoomTapEnabled={true}
				zoomControlEnabled={true}
			/>
		</View>
	);
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		flex: 1,
		marginLeft: 10,
		marginRight: 10,
	},
});

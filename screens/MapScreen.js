import { Button, Text, View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function MapScreen(props) {
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
      <View style={{flex:0.07, marginBottom:0, flexDirection:'row'}}>
      <Button
        title="Go to Login"
        onPress={() => props.navigation.navigate("Login")}
      ></Button>
      </View>
    </View>
  );
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

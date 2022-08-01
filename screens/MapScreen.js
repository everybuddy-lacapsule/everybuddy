import { Text, View, StyleSheet, Dimensions } from "react-native";
import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import BottomDrawer from "react-native-bottom-drawer-view";

export default function MapScreen() {
  const [resultLink, setResultLink] = useState("list");

  //*BOTTOM DRAWER
  const windowHeight = Dimensions.get("window").height;
  function bottomDrawer() {
    return (
      <View>
        <Text style={styles.listHeader}>
          Y'a 1000000 resultats enculé{" "}
          <Text style={styles.link}>show {resultLink}</Text>
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <MapView
        provider="google"
        style={styles.map}
        mapType="mutedStandard"
        userInterfaceStyle="dark"
        zoomEnabled={true}
        zoomTapEnabled={true}
        zoomControlEnabled={true}
      />
      <BottomDrawer
        containerHeight={windowHeight}
        offset={0}
        startUp={false}
        shadow
        downDisplay={windowHeight * 0.812}
        roundedEdges={false}
        onExpanded={() => {
          setResultLink("map");
        }}
        onCollapsed={() => {
          setResultLink("list");
        }}
      >
        {bottomDrawer()}
      </BottomDrawer>
    </View>
  );
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
  },
  result: {
    flex: 0.2,
    backgroundColor: "red",
  },
  link: {
    fontWeight: "normal",
    color: "#E74C3C",
    textDecorationLine: "underline",
  },
  listHeader: {
    fontWeight: "bold",
    marginLeft: 20,
    height: 32,
    textAlignVertical: "center",
  },
});

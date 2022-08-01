import { Text, View, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import BottomDrawer from "react-native-bottom-drawer-view";
import { connect } from "react-redux";

function MapScreen(props) {
  const [resultLink, setResultLink] = useState("list");

  console.log(props.searchResults);

  /*--------------------Automate apparence of list Redux-------------*/

  const searchResultsList = props.searchResults.map((user, i) => {
    return (
      <Marker
        key={`${i}-${user.address.lat}-${user.address.long}`}
        coordinate={{ latitude: user.address.lat, longitude: user.address.long }}
        title={`${user.name} ${user.firstName}`}
        description={user.post.post}
        pinColor="blue"
      />
    );
  });

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
        initialRegion={{
          latitude: 45.7537667,
          longitude: 4.862333,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="mutedStandard"
        userInterfaceStyle="dark"
        zoomEnabled={true}
        zoomTapEnabled={true}
        zoomControlEnabled={true}
      >
        {searchResultsList}
      </MapView>

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

/*--------------------Component => communicate with Redux and component presentation-------------*/
const mapStateToProps = (state) => {
  return {
    searchResults: state.searchResults,
  };
};

export default connect(mapStateToProps, null)(MapScreen);

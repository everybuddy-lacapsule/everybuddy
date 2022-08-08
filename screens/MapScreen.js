import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker, Circle } from "react-native-maps";
import { ListItem, Avatar } from "@rneui/base";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import BottomDrawer from "react-native-bottom-drawer-view";
import { connect } from "react-redux";
import { IPLOCAL } from "@env";
//const urlLocal = "http://" + IPLOCAL + ":3000";
const urlLocal = 'http://172.16.188.131:3000';

function MapScreen(props) {
  const [resultLink, setResultLink] = useState("liste");
  // Radius default, unit = meter
  const [buddyList, setBuddyList] = useState([]);

  /*--------------------Generate circle radius when search is true (reducer searchResult)-------------*/
  let circle;
  let latDelta = 0.1922;
  let longDelta = 0.1421;
  if (props.searchResults.search) {
    latDelta = 0.03231 * props.searchResults.searchLocation.radius;
    longDelta = 0.01421 * props.searchResults.searchLocation.radius;
    circle = (
      <Circle
        center={{
          longitude: props.searchResults.searchLocation.long,
          latitude: props.searchResults.searchLocation.lat,
        }}
        strokeWidth={1}
        strokeColor={"#1a66ff"}
        fillColor={"rgba(230,238,255,0.5)"}
        radius={props.searchResults.searchLocation.radius * 1000}
      />
    );
  }

  /*--------------------Automate apparence of list Redux-------------*/
  const searchResultsList = props.searchResults.searchResults.map((user, i) => {
    return (
      <Marker
        key={`${i}-${user.address.lat}-${user.address.long}`}
        coordinate={{
          latitude: user.address.lat,
          longitude: user.address.long,
        }}
        title={`${user.name} ${user.firstName}`}
        description={user.work.work}
        pinColor="blue"
      />
    );
  });

  function addBuddy(buddy) {
    if (!buddyList.find((o) => o._id === buddy._id)) {
      setBuddyList([...buddyList, buddy]);
    } else {
      setBuddyList(buddyList.filter((o) => o._id !== buddy._id));
    }
  }

  /*--------------------Get alumni and user's discussion AND get alumni infos-------------*/
  const getDiscussion = async (alumniID) => {
    /*-------------------Receive discussionID from backend-------------------*/
    const discussionIDRes = await fetch(
      `${urlLocal}/discussions/createDiscussion`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `senderID=${props.userDatas._id}&receiverID=${alumniID}`,
      }
    );
    const discussionIDJSON = await discussionIDRes.json();
    /*-------------------Receive alumi information from backend-------------------*/
    const alumniInfos = await fetch(
      `${urlLocal}/users/getUserDatas?userID=${alumniID}`
    );
    const alumniInfosJSON = await alumniInfos.json();
    props.getDiscussionID({
      discussionID: discussionIDJSON,
      anotherMember: alumniInfosJSON.userDatas,
    });
  };

  //*BOTTOM DRAWER
  const windowHeight = Dimensions.get("window").height;
  function bottomDrawer(searchResults) {
    return (
      <View>
        <Text style={styles.listHeader}>
          {searchResults.length} resultats {""}
          <Text style={styles.link}>voir {resultLink}</Text>
        </Text>
        <ScrollView>
          {searchResults.map((r, i) => {
            var buddyIcon = "person-add";
            var buddyIconColor = "#0E0E66";
            var buddyIconStyle = { paddingRight: 2 };
            if (buddyList.find((o) => o._id === r._id)) {
              buddyIcon = "person";
              buddyIconColor = "#E74C3C";
              buddyIconStyle = { paddingRight: 0 };
            }

            return (
              <ListItem key={i} bottomDivider>
                <TouchableOpacity
                  style={{ flex: 1, flexDirection: "row" }}
                  onPress={() => {
                    {
                      props.getAlumniIDSearch(r._id);
                      props.navigation.navigate("ProfileScreen");
                    }
                  }}
                >
                  <Avatar rounded size={90} source={{ uri: r.avatar }} />
                  <ListItem.Content style={{ paddingLeft: 10 }}>
                    <ListItem.Title>
                      {r.firstName} {r.name}{" "}
                    </ListItem.Title>
                    <ListItem.Subtitle>{r.work.company}</ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.listItemText}>
                      Batch #{r.nbBatch}
                    </ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.listItemText}>
                      {r.work.work}
                    </ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.listItemText}>
                      {r.work.typeWork}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </TouchableOpacity>
                <View style={buddyIconStyle}>
                  <Ionicons
                    name={buddyIcon}
                    size={32}
                    color={buddyIconColor}
                    onPress={() => {
                      addBuddy(r);
                    }}
                  />
                </View>
                <FontAwesome
                  name="paper-plane"
                  size={32}
                  color="#0E0E66"
                  onPress={() => {
                    props.getAlumniIDSearch(r._id);
                    getDiscussion(r._id);
                    props.navigation.navigate("Chat");
                  }}
                />
              </ListItem>
            );
          })}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        provider="google"
        style={styles.map}
        region={{
          latitude: Number(props.searchResults.searchLocation.lat),
          longitude: Number(props.searchResults.searchLocation.long),
          latitudeDelta: latDelta,
          longitudeDelta: longDelta,
        }}
        mapType="mutedStandard"
        userInterfaceStyle="dark"
        zoomEnabled={true}
        zoomTapEnabled={true}
        zoomControlEnabled={true}
      >
        {circle}
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
        {bottomDrawer(props.searchResults.searchResults)}
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
  listItemText: {
    fontSize: 12,
  },
});

/*--------------------Component => communicate with Redux and component presentation-------------*/
const mapStateToProps = (state) => {
  return {
    searchResults: state.searchResults,
    userDatas: state.userDatas,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getAlumniIDSearch: function (id) {
      dispatch({ type: "getAlumniIDSearch", id });
    },
    getDiscussionID: function (discussionInfos) {
      dispatch({ type: "getDiscussionID", discussionInfos });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
// export default {
//   MapScreen: connect(mapStateToProps)(MapScreen),
//   bottomDrawer: connect(mapStateToProps)(bottomDrawer)
// }

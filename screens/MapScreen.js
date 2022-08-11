import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Icon,
} from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker, Circle } from "react-native-maps";
import { ListItem, Avatar } from "@rneui/base";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import BottomDrawer from "react-native-bottom-drawer-view";
import { connect } from "react-redux";
import { REACT_APP_DEV_MODE } from "@env";

function MapScreen(props) {
  const [resultLink, setResultLink] = useState("liste");
  // Radius default, unit = meter
  //const [buddyList, setBuddyList] = useState(props.buddiesList);
  //console.log(REACT_APP_DEV_MODE);

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
        title={`${user.firstName} ${user.name}`}
        description={`${user.work.work} ${user.work.typeWork}`}
        pinColor="blue"
        onCalloutPress={() => {
          {
            props.getAlumniIDSearch(user._id);
            props.navigation.navigate("ProfileScreen");
          }
        }}
      >
        <Avatar source={{ uri: user.avatar }} rounded />
      </Marker>
    );
  });
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
      /*------------------------------Add buddy if not exist in list----------------------- */
      const response = await fetch(`${REACT_APP_DEV_MODE}/buddies/addBuddy`, {
        method: "PUT",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `userID=${props.userDatas._id}&buddyID=${buddy._id}`,
      });
      const responseJSON = await response.json();
      return responseJSON;
    }
  };

  /*--------------------Get alumni and user's discussion AND get alumni infos-------------*/
  const getDiscussion = async (alumniID) => {
    /*-------------------Receive discussionID from backend-------------------*/
    const discussionIDRes = await fetch(
      `${REACT_APP_DEV_MODE}/discussions/createDiscussion`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `senderID=${props.userDatas._id}&receiverID=${alumniID}`,
      }
    );
    const discussionIDJSON = await discussionIDRes.json();
    /*-------------------Receive alumi information from backend-------------------*/
    const alumniInfos = await fetch(
      `${REACT_APP_DEV_MODE}/users/getUserDatas?userID=${alumniID}`
    );
    const alumniInfosJSON = await alumniInfos.json();
    props.getDiscussionID({
      discussionID: discussionIDJSON,
      anotherMember: alumniInfosJSON.userDatas,
    });
    props.navigation.navigate("Chat");
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
            if (props.buddiesList.find((o) => o._id === r._id)) {
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
                    {r.work.company?
                    <ListItem.Subtitle>{r.work.company}</ListItem.Subtitle>
                    : <></>}
                    { r.capsule.nbBatch? <ListItem.Subtitle style={styles.listItemText}>
                      Batch #{r.capsule.nbBatch}
                    </ListItem.Subtitle>
                    : <></>
                    }
                    <ListItem.Subtitle style={styles.listItemText}>
                      {r.work.work}
                    </ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.listItemText}>
                      {r.work.typeWork}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </TouchableOpacity>
                <View style={buddyIconStyle}>
                  {r._id === props.userDatas._id ? (
                    <></>
                  ) : (
                    <Ionicons
                      name={buddyIcon}
                      size={32}
                      color={buddyIconColor}
                      onPress={() => {
                        updateBuddies(r).then((response) => {
                          props.setBuddiesList(response.buddiesInfos);
                          props.getAlumniIDSearch(r._id);
                        });
                      }}
                    />
                  )}
                </View>
                <FontAwesome
                  name="paper-plane"
                  size={32}
                  color="#0E0E66"
                  onPress={() => {
                    props.getAlumniIDSearch(r._id);
                    getDiscussion(r._id);
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
    buddiesList: state.buddiesList,
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
    setBuddiesList: function (buddiesList) {
      dispatch({ type: "setBuddiesList", buddiesList });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
// export default {
//   MapScreen: connect(mapStateToProps)(MapScreen),
//   bottomDrawer: connect(mapStateToProps)(bottomDrawer)
// }

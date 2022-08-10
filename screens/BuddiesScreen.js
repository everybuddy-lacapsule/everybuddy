import React, { useEffect, useState } from "react";
import { ScrollView, View, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";

import { ListItem, Avatar } from "@rneui/base";
import { Button } from "@rneui/themed";
import { FontAwesome } from "@expo/vector-icons";
import { REACT_APP_DEV_MODE } from "@env";

function BuddiesScreen(props) {
  async function deleteBuddie(buddy) {
    var res = await fetch(`${REACT_APP_DEV_MODE}/buddies/deleteBuddy`, {
      method: "DELETE",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `userID=${props.userDatas._id}&buddyID=${buddy._id}`,
    });
    res = await res.json();
    if (res.success) {
      var buddiesList = props.buddiesList.filter((o) => o._id !== buddy._id);
      props.setBuddiesList(buddiesList);
    }
  }

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

  return (
    <View>
      <ScrollView>
        {props.buddiesList.map((r, i) => {
          return (
            <ListItem.Swipeable
              key={i}
              bottomDivider
              rightContent={() => (
                <Button
                  title="Delete"
                  onPress={() => {
                    deleteBuddie(r);
                  }}
                  icon={{ name: "delete", color: "white" }}
                  buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
                />
              )}
            >
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
              <FontAwesome
                name="paper-plane"
                size={32}
                color="#0E0E66"
                onPress={() => {
                  props.getAlumniIDSearch(r._id);
                  getDiscussion(r._id);
                }}
              />
            </ListItem.Swipeable>
          );
        })}
      </ScrollView>
    </View>
  );
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItemText: {
    fontSize: 12,
  },
});

const mapStateToProps = (state) => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(BuddiesScreen);

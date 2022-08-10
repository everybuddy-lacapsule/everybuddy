import {StyleSheet } from "react-native";
import { ListItem, Avatar } from "@rneui/themed";

import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

import {REACT_APP_DEV_MODE} from "@env"

function Discussion({ discussionID, discussion, currentUser, navigation, getDiscussionID, getAlumniIDSearch }) {
  const isFocused = useIsFocused();
  const [anotherMember, setAnotherMember] = useState({});
  const [lastMessage, setLastMessage] = useState("");
  console.log(REACT_APP_DEV_MODE)

  useEffect(() => {
    const anotherMemberID = discussion.memberIDs.find(
      (id) => id !== currentUser._id
    );

    const getAnotherMember = async () => {
      const response = await fetch(
        `${REACT_APP_DEV_MODE}/users/getUserDatas?userID=${anotherMemberID}`
      );
      const dataJSON = await response.json();
      setAnotherMember(dataJSON.userDatas);
    };
    getAnotherMember();
  }, [discussion, currentUser._id]);

  useEffect(() => {
    const displayLastMessage = async ()=> {
    const response =  await fetch(
      `${REACT_APP_DEV_MODE}/messages/${discussionID}/lastMessage`
    );

    const dataJSON = await response.json();
    setLastMessage(dataJSON.content);
  }
  displayLastMessage();
}, [isFocused]);

  return (
    <ListItem
      bottomDivider
      onPress={() => {
        navigation.navigate("Chat");
        getDiscussionID({discussionID:discussionID, anotherMember:anotherMember});
        getAlumniIDSearch(anotherMember._id);
      }}
    >
      <Avatar rounded size={90} source={{ uri: anotherMember.avatar }} />
      <ListItem.Content>
        <ListItem.Title>{anotherMember.firstName} {anotherMember.name}</ListItem.Title>
        <ListItem.Subtitle>{lastMessage}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
}

var styles = StyleSheet.create({
  listItemText: {
    fontSize: 12,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAlumniIDSearch: function (id) {
      dispatch({ type: "getAlumniIDSearch", id });
    },
    getDiscussionID: function (discussionInfos) {
      dispatch({ type: "getDiscussionID", discussionInfos: discussionInfos });
    },
  };
};

export default connect(null, mapDispatchToProps)(Discussion);

import {StyleSheet } from "react-native";
import { ListItem, Avatar } from "@rneui/themed";

import { useState, useEffect } from "react";
import { connect } from "react-redux";

import {IPLOCAL} from "@env"
var urlLocal = 'http://'+IPLOCAL+':3000'

function Discussion({ discussionID, discussion, currentUser, navigation, getDiscussionID }) {

  const [anotherMember, setAnotherMember] = useState({});
  const [lastMessage, setLastMessage] = useState("");

  useEffect(() => {
    const anotherMemberID = discussion.memberIDs.find(
      (id) => id !== currentUser._id
    );

    const getAnotherMember = async () => {
      const response = await fetch(
        `${urlLocal}/users/getUserDatas?userID=${anotherMemberID}`
      );
      const dataJSON = await response.json();
      setAnotherMember(dataJSON.userDatas);
    };
    getAnotherMember();
  }, [discussion, currentUser._id]);


  useEffect(() => {
    const displayLastMessage = async ()=> {
    const response =  await fetch(
      `${urlLocal}/messages/${discussionID}/lastMessage`
    );

    const dataJSON = await response.json();
    setLastMessage(dataJSON.content);
  }
  displayLastMessage();
}, []);

  return (
    <ListItem
      bottomDivider
      onPress={() => {
        navigation.navigate("Chat");
        getDiscussionID({discussionID:discussionID, anotherMember:anotherMember});
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

const mapDispatchToProps = (ditpatch) => {
  return {
    getDiscussionID: function (discussionInfos) {
      ditpatch({ type: "getDiscussionID", discussionInfos: discussionInfos });
    },
  };
};

export default connect(null, mapDispatchToProps)(Discussion);

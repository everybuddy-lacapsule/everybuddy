import { Button, StyleSheet, View, ScrollView, Text } from "react-native";
//import { ListItem } from "@rneui/base";
import { ListItem, Avatar } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { connect } from "react-redux";


function Discussion({ discussionID, discussion, currentUser, navigation, getDiscussionID }) {
  var buddyIcon = "person-add";
  var buddyIconColor = "#0E0E66";
  var buddyIconStyle = { paddingRight: 2 };
  buddyIcon = "person";
  buddyIconColor = "#E74C3C";
  buddyIconStyle = { paddingRight: 0 };

  const [anotherMember, setAnotherMember] = useState({});
  const [lastMessage, setLastMessage] = useState("");

  useEffect(() => {
    const anotherMemberID = discussion.memberIDs.find(
      (id) => id !== currentUser._id
    );

    const getAnotherMember = async () => {
      const response = await fetch(
        `http://172.16.190.12:3000/users/getUserDatas?userID=${anotherMemberID}`
      );
      const dataJSON = await response.json();
      //console.log(dataJSON);
      setAnotherMember(dataJSON.userDatas);
    };
    getAnotherMember();
  }, [discussion, currentUser._id]);

  useEffect(() => {
    const displayLastMessage = async ()=> {
    const response =  await fetch(
      `http://172.16.190.12:3000/messages/${discussionID}/lastMessage`
    );

    const dataJSON = await response.json();
    console.log('resLastMess',dataJSON);
    setLastMessage(dataJSON.content);
  }
  displayLastMessage();
}, []);

console.log(discussionID)

  return (
    <ListItem
      bottomDivider
      onPress={() => {
        navigation.navigate("Chat");
        getDiscussionID(discussionID);

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
    getDiscussionID: function (ID) {
      ditpatch({ type: "getDiscussionID", discussionID: ID });
    },
  };
};

export default connect(null, mapDispatchToProps)(Discussion);

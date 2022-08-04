import { Button, StyleSheet, View, ScrollView, Text } from "react-native";
//import { ListItem } from "@rneui/base";
import { ListItem, Avatar } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useState, useEffect } from "react";

function Discussion({ discussion, currentUser, navigation }) {
  var buddyIcon = "person-add";
  var buddyIconColor = "#0E0E66";
  var buddyIconStyle = { paddingRight: 2 };
  buddyIcon = "person";
  buddyIconColor = "#E74C3C";
  buddyIconStyle = { paddingRight: 0 };

  const [anotherMember, setAnotherMember] = useState({});

  useEffect(() => {
    const anotherMemberID = discussion.memberIDs.find(
      id => id !== currentUser._id
    );

    const getAnotherMember = async () => {
      const response = await fetch(
        `http://192.168.0.149:3000/users/getUserDatas?userID=${anotherMemberID}`
      );
      const dataJSON = await response.json();
      console.log(dataJSON);
      setAnotherMember(dataJSON.userDatas);
    };
    getAnotherMember();
  }, [discussion, currentUser._id]);

  return (
    <ListItem
      bottomDivider
      onPress={() => {
        navigation.navigate("Chat");
      }}
    >
      <Avatar rounded size={90} source={{uri: anotherMember.avatar}} />
      <ListItem.Content>
        <ListItem.Title>{anotherMember.name}</ListItem.Title>
        <ListItem.Subtitle>{anotherMember.work?.work}</ListItem.Subtitle>
        <ListItem.Subtitle style={styles.listItemText}>
          {anotherMember.capsule?.nbBatch}
        </ListItem.Subtitle>
        <ListItem.Subtitle style={styles.listItemText}>
          {anotherMember.work?.company}
        </ListItem.Subtitle>
        <ListItem.Subtitle style={styles.listItemText}>
          {anotherMember.work?.typeWork}
        </ListItem.Subtitle>
      </ListItem.Content>
      <View style={buddyIconStyle}>
        <Ionicons name={buddyIcon} size={32} color={buddyIconColor} />
      </View>
      <FontAwesome name="paper-plane" size={32} color="#0E0E66" />
    </ListItem>
  );
}

var styles = StyleSheet.create({
  listItemText: {
    fontSize: 12,
  },
});

export default Discussion;

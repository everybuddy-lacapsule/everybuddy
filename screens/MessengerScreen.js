import { Button, StyleSheet, View, ScrollView, Text } from "react-native";
import { ListItem, Avatar } from "@rneui/base";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { connect } from "react-redux";
import DiscussionComponent from "../components/DiscussionComponent";

//import socketIOClient from "socket.io-client";
import { useEffect, useState } from "react";

//var socket = socketIOClient("http://172.16.188.131:3000");

function MessengerScreen(props) {

  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    const getDiscussions = async () => {
      try{
        const response = await fetch(`http://172.16.190.12:3000/discussions/${props.userDatas._id}`);
        let userDiscussions = await response.json();
        setDiscussions(userDiscussions);
      }
      catch(error){
        console.log(error);
      }
    };
    getDiscussions();
  }, [props.userDatas._id]);

  console.log("userDiscussions is", discussions);
  return (
    <View>
      <ScrollView>
        {discussions.map((discussion) => (
          <DiscussionComponent discussionID = {discussion._id} discussion={discussion} currentUser={props.userDatas} navigation={props.navigation}/>
        ))}
      </ScrollView>
    </View>
  );
}

var styles = StyleSheet.create({
  
});

const mapStateToProps = (state) => {
  return {
    userDatas: state.userDatas,
  };
};

const mapDispatchToProps = (ditpatch) => {
  return {
    discussionID: function (discussionID) {
      dispatch({ type: "getDiscussionID", discussionID: discussionID });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessengerScreen);

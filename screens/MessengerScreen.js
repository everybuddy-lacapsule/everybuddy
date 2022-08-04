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
        const response = await fetch(`http://192.168.0.149:3000/discussions/${props.userDatas._id}`);
        userDiscussions = await response.json();
        console.log(userDiscussions);
        setDiscussions(userDiscussions);
      }
      catch(error){
        console.log(error);
      }
    };
    getDiscussions();
  }, [props.userDatas._id]);

  return (
    <View>
      <ScrollView>
        {discussions.map((discussion) => (
          <DiscussionComponent discussion={discussion} currentUser={props.userDatas} navigation={props.navigation}/>
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
/*

const mapDispatchToProps = (ditpatch) => {
  return {
    sendIdChat: function (idChat) {
      dispatch({ type: "sendIdChat", idChat: idChat });
    },
  };
};
*/

export default connect(mapStateToProps, null)(MessengerScreen);

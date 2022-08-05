import { Button, StyleSheet, View, ScrollView, Text } from "react-native";
import { ListItem, Avatar } from "@rneui/base";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { connect } from "react-redux";
import Discussion from "../components/DiscussionComponent";

import {IPLOCAL} from "@env"

//import socketIOClient from "socket.io-client";
import { useEffect, useState } from "react";


function MessengerScreen(props) {
  var urlLocal = 'http://'+IPLOCAL+ ':3000'


  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    const getDiscussions = async () => {
      try{
        const response = await fetch(`${urlLocal}/discussions/${props.userDatas._id}`);
        let userDiscussions = await response.json();
        setDiscussions(userDiscussions);
      }
      catch(error){
        console.log(error);
      }
    };
    getDiscussions();
  }, [props.userDatas._id]);

  //console.log("userDiscussions is", discussions);
  return (
    <View>
      <ScrollView>
        {discussions.map((discussion, i) => (
          <Discussion key={i} discussionID = {discussion._id} discussion={discussion} currentUser={props.userDatas} navigation={props.navigation}/>
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


export default connect(mapStateToProps, null)(MessengerScreen);

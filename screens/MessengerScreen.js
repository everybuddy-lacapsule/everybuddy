import {StyleSheet, View, ScrollView} from "react-native";

import { connect } from "react-redux";
import Discussion from "../components/DiscussionComponent";

//import {IPLOCAL} from "@env"
const IPLOCAL = "http://172.16.188.131:3000";

//import socketIOClient from "socket.io-client";
import { useEffect, useState } from "react";


function MessengerScreen(props) {

  //const isFocused = useIsFocused();
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    const getDiscussions = async () => {
      try{
        const response = await fetch(`${IPLOCAL}/discussions/${props.userDatas._id}`);
        let userDiscussions = await response.json();
        setDiscussions(userDiscussions);
      }
      catch(error){
        console.log(error);
      }
    };
    getDiscussions();
  //}, [isFocused]);
}, []);

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

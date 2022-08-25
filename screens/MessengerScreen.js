import { StyleSheet, View, ScrollView, Text } from "react-native";
import { connect } from "react-redux";
import Discussion from "../components/DiscussionComponent";

import { REACT_APP_DEV_MODE } from "@env";
// change hook useIsFocused by option unmountOnBlur in the Messenger Screen in TabsNavigator
//import { useIsFocused } from "@react-navigation/native";

//import socketIOClient from "socket.io-client";
import { useEffect, useState } from "react";

function MessengerScreen(props) {
  //const isFocused = useIsFocused();
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    const ac = new AbortController();
    const getDiscussions = async () => {
      try {
        const response = await fetch(
          `${REACT_APP_DEV_MODE}/discussions/${props.userDatas._id}`
        );
        let userDiscussions = await response.json();
        setDiscussions(userDiscussions);
      } catch (error) {
        console.log(error);
      }
    };
    getDiscussions();
    return () => ac.abort();
    //}, [isFocused]);
  }, []);

  return (
    <View>
      <ScrollView>
        {discussions.length > 0 ? (
          discussions.map((discussion, i) => (
            <Discussion
              key={i}
              discussionID={discussion._id}
              discussion={discussion}
              currentUser={props.userDatas}
              navigation={props.navigation}
            />
          ))
        ) : (
          <Text
            style={{
              fontSize: 20,
              marginHorizontal: 30,
              marginVertical: "70%",
              fontStyle: "italic",
              textAlign: "center",
            }}
          >
            Vous êtes seul au monde ...{"\n"}Heureusement, vous pouvez trouver
            des buddies ! 🍻
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

var styles = StyleSheet.create({});

const mapStateToProps = (state) => {
  return {
    userDatas: state.userDatas,
  };
};

export default connect(mapStateToProps, null)(MessengerScreen);

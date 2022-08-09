import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { useState, useEffect, useRef } from "react";
import InsetShadow from "react-native-inset-shadow";
import { connect } from "react-redux";
// import { format } from "timeago.js";
//import moment from "moment";
import moment from 'moment/min/moment-with-locales';

// change hook useIsFocused by option unmountOnBlur in the Chat Screen in TabsNavigator
//import { useIsFocused } from "@react-navigation/native";

import { REACT_APP_DEV_MODE } from "@env";


/*----Web socket----*/
import socketIOClient from "socket.io-client";

function ChatScreen(props) {
  console.log(REACT_APP_DEV_MODE)
  //const isFocused = useIsFocused();
  const socket = useRef();
  const scrollRef = useRef();

  const colors = ["#7C4DFF", "#F94A56", "#FF1744"];
  const colorz = ["#FF1744", "#F94A56", "#7C4DFF"];

  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    // init socket.current value with extraHeader which contain a room id (=> discussionID)
    socket.current = socketIOClient(REACT_APP_DEV_MODE, {
      extraHeaders: {
        roomID: props.discussionInfos.discussionID,
      },
    });
    // set local to fr (default en)
    moment.locale("fr");
    //}, [isFocused]);
  }, []);

  /*GET all messages ONCE TIME from Database when ChatScreen is loaded*/
  useEffect(() => {
    const getMessagesFromDB = async () => {
      const messagesFromDB = await fetch(
        `${REACT_APP_DEV_MODE}/messages/${props.discussionInfos.discussionID}`
      );
      let messagesFromDBJSON = await messagesFromDB.json();
      setAllMessages(messagesFromDBJSON);
      //console.log("discussionId", props.discussionInfos.discussionID);
    };
    getMessagesFromDB();

    // Fire the scroller to scroll to the end of ScrollView
    scrollRef.current.scrollToEnd({
      animated: true,
    });
    // observation on the discussionID for execute the effect
  }, [props.discussionInfos.discussionID]);

  useEffect(() => {
    //console.log("s'inscrire au forfait mobile quand le component est généré");
    // si forfait augmente, on change l'opérateur
    socket.current.on("sendMessageServer", (message) => {
      if (message.senderID !== props.userDatas._id) {
        //console.log('another member');
        setAllMessages([...allMessages, message]);
      }
    });
    // Fire the scroller to scroll to the end of ScrollView
    scrollRef.current.scrollToEnd({
      animated: true,
    });

    // clear the socket before the next execution of the effect
    // on résilie l'ancien opérateur
    return () => {
      socket.current.off("sendMessageServer");
      //console.log("se désabonner");
    }; // for delete all: // socket.off()
    //}, [isFocused, allMessages]); // observer le prix du forfait
  }, [allMessages]); // observer le prix du forfait

  /* Send socket to  */
  const handleGetMessage = async () => {
    const currentMessage = {
      discussionID: props.discussionInfos.discussionID,
      senderID: props.userDatas._id,
      content: message,
    };
    try {
      /* SEND message to DB */
      const messageDB = await fetch(`${REACT_APP_DEV_MODE}/messages/addMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `message=${currentMessage.content}&discussionID=${currentMessage.discussionID}&userID=${currentMessage.senderID}`,
      });
      const messageDBJson = await messageDB.json();

      socket.current.emit("sendMessage", messageDBJson);
      setMessage("");
      setAllMessages([...allMessages, messageDBJson]);
    } catch (error) {
      console.log(error);
    }
  };

  /*Map to display all messages from DB (messages loaded ONCE TIME when ChatScreen is loaded) */
  const allMessagesDisplayed = allMessages.map((m, i) => {
    if (m.senderID === props.userDatas._id) {
      return (
        <View key={`${i}-${m.senderID}`} style={styles.rightMessage}>
          <Image
            style={styles.rightImg}
            rounded
            source={{ uri: props.userDatas.avatar }}
          />

          <LinearGradient
            colors={colorz}
            style={styles.rightMessageBox}
            start={{ x: -1, y: 0 }}
            end={{ x: 1, y: 0.3 }}
          >
            <View style={{ alignSelf: "flex-start", width: "100%" }}>
              <Text style={styles.rightMessageSender}>
                {props.userDatas.firstName} {props.userDatas.name.toUpperCase()}
              </Text>
              <Text style={{ textAlign: "right", color: "white" }}>
                {m.content}
              </Text>
              <Text style={{ textAlign: "right", color: "white", fontSize: 8 }}>
                {moment(m.dateSend).format("lll")}
              </Text>
            </View>
          </LinearGradient>
        </View>
      );
    } else {
      return (
        <View key={`${i}-${m.senderID}`} style={styles.leftMessage}>
          <Image
            style={styles.img}
            rounded
            source={{ uri: props.discussionInfos.anotherMember.avatar }}
          />

          <LinearGradient
            colors={colors}
            style={styles.messageBox}
            start={{ x: 0.3, y: 0.4 }}
            end={{ x: 2, y: 0.7 }}
          >
            <View style={{ alignSelf: "flex-start", width: "100%" }}>
              <Text style={styles.messageSender}>
                {props.discussionInfos.anotherMember.firstName}{" "}
                {props.discussionInfos.anotherMember.name.toUpperCase()}
              </Text>
              <Text style={{ textAlign: "left", color: "white" }}>
                {m.content}
              </Text>
              <Text style={{ textAlign: "left", color: "white", fontSize: 8 }}>
                {moment(m.dateSend).format("lll")}
              </Text>
            </View>
          </LinearGradient>
        </View>
      );
    }
  });

  return (
    <SafeAreaView>
      <InsetShadow
        style={{ flex: 1, elevation: 10, shadowRadius: 10, shadowOpacity: 1 }}
      >
        <ScrollView ref={scrollRef}>{allMessagesDisplayed}</ScrollView>
        <KeyboardAvoidingView
          style={styles.textInput}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              style={styles.searchBar}
              placeholder="Type a message"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={message}
              onChangeText={(value) => setMessage(value)}
              onSubmitEditing={({
                nativeEvent: { text, eventCount, target },
              }) => handleGetMessage()}
            />
            <TouchableOpacity
              style={styles.searchButtonBackground}
              onPress={handleGetMessage}
            >
              <View style={styles.searchButton}>
                <FontAwesome name="send" size={16} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </InsetShadow>
    </SafeAreaView>
  );
}

var styles = StyleSheet.create({
  searchBar: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    width: "80%",
    height: "100%",
    paddingLeft: 15,
    paddingRight: 15,
  },
  searchButton: {
    alignSelf: "center",
    backgroundColor: "#E74C3C",
    padding: 6,
    borderRadius: 50,
  },
  searchButtonBackground: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
  messageBox: {
    alignSelf: "flex-end",
    width: "75%",
    marginLeft: "3%",
    marginBottom: "1%",
    flexGrow: 1,
    padding: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    elevation: 5,
    shadowRadius: 10,
    shadowOpacity: 1,
  },
  rightMessageBox: {
    alignSelf: "flex-end",
    width: "75%",
    marginRight: "3%",
    marginBottom: "3%",
    flexGrow: 1,
    padding: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    elevation: 5,
    shadowRadius: 15,
    shadowOpacity: 1,
  },
  textInput: {
    backgroundColor: "#8686b3",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    alignSelf: "flex-end",
    borderRadius: 50,
    width: 31,
    height: 34,
    paddingTop: 10,
    marginLeft: "3%",
    marginBottom: "1%",
  },
  rightImg: {
    alignSelf: "flex-end",
    borderRadius: 50,
    width: 31,
    height: 34,
    paddingTop: 10,
    marginRight: "3%",
    marginBottom: "3%",
  },
  leftMessage: {
    flexDirection: "row",
    width: "80%",
    marginTop: "5%",
    alignItems: "center",
  },
  rightMessage: {
    flexDirection: "row-reverse",
    alignSelf: "flex-end",
    width: "80%",
    marginTop: "5%",
    alignItems: "center",
  },
  messageSender: {
    textAlign: "left",
    color: "rgba(255, 255, 255, 0.5)",
    fontWeight: "bold",
    fontSize: 10,
  },
  rightMessageSender: {
    textAlign: "right",
    color: "rgba(255, 255, 255, 0.5)",
    fontWeight: "bold",
    fontSize: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    userDatas: state.userDatas,
    discussionInfos: state.discussionInfos,
  };
};

export default connect(mapStateToProps, null)(ChatScreen);

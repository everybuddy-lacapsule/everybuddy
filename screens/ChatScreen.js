import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import InsetShadow from "react-native-inset-shadow";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

/*----Web socket----*/
import socketIOClient from "socket.io-client";
import { discussionID } from "../reducers/discussionID";
var socket = socketIOClient("http://172.16.190.12:3000");

function ChatScreen(props) {
  const colors = ["#7C4DFF", "#F94A56", "#FF1744"];
  const colorz = ["#FF1744", "#F94A56", "#7C4DFF"];

  const [message, setMessage] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("userID", function (error, id) {
      console.log("LocalStorage User Id ==>",id);
	  console.log('Store User Id ==>',props.userDatas._id);

    });
  }, []);

	useEffect(() => {
		socket.on("sendMessageToAll", (message) => {
			console.log('message ==>',message);
			console.log('discussionID ==>', props.discussionID)

		});
		return () => socket.off("sendMessageToAll"); // for delete all: // socket.off()
	}, [message]);

	async function sendMessageToDB(message){
		const sendMessage = await fetch('http://172.16.190.12:3000/messages/addMessage', {
			method: "POST",
        	headers: { "Content-Type": "application/x-www-form-urlencoded" },
        	body: `message=${message}&discussionID=${props.discussionID}&userID=${props.userDatas._id}`,
			})
	}
	
	return (
		<InsetShadow
			style={{ flex: 1, elevation: 10, shadowRadius: 10, shadowOpacity: 1 }}
		>
			<ScrollView style={{ flex: 1, flexDirection:"column-reverse" }}>
				<View style={styles.leftMessage}>
					<Image
						style={styles.img}
						rounded
						source={require("../assets/xav.jpg")}
					/>

					<LinearGradient
						colors={colors}
						style={styles.messageBox}
						start={{ x: 0.3, y: 0.4 }}
						end={{ x: 2, y: 0.7 }}
					>
						<View style={{ alignSelf: "flex-start", width: "100%" }}>
							<Text style={styles.messageSender}>Xavier MELINAND</Text>
							<Text style={{ textAlign: "left", color: "white" }}>
								Coucou Will !
							</Text>
						</View>
					</LinearGradient>
				</View>
				<View style={styles.rightMessage}>
					<Image
						style={styles.rightImg}
						rounded
						source={require("../assets/will.jpeg")}
					/>

					<LinearGradient
						colors={colorz}
						style={styles.rightMessageBox}
						start={{ x: -1, y: 0 }}
						end={{ x: 1, y: 0.3 }}
					>
						<View style={{ alignSelf: "flex-start", width: "100%" }}>
							<Text style={styles.rightMessageSender}>William WERLÉ</Text>
							<Text style={{ textAlign: "right", color: "white" }}>
								Coucou Qui ! Comment ça va ? Moi la pêche, on bosse bien c'est
								cool, mais le front ca commence à me gaver par contre !!
							</Text>
						</View>
					</LinearGradient>
				</View>
			</ScrollView>
			<KeyboardAvoidingView style={styles.textInput}>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<TextInput
						style={styles.searchBar}
						placeholder="Type in city"
						placeholderTextColor="rgba(255, 255, 255, 0.5)"
						onChangeText={(value) => {
							setMessage(value);
							//console.log(value);
						}}
						onSubmitEditing={({ nativeEvent: { text, eventCount, target } }) =>
						socket.emit("sendMessage", message)
						}
					/>
					<TouchableOpacity
						style={styles.searchButtonBackground}
						onPress={() => {socket.emit("sendMessage", message); sendMessageToDB(message)}}
					>
						<View style={styles.searchButton}>
							<FontAwesome name="send" size={16} color="white" />
						</View>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</InsetShadow>
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
	discussionID: state.discussionID
  };
};

export default connect(mapStateToProps, null)(ChatScreen);

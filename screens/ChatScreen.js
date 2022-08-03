import {
	Image,
	KeyboardAvoidingView,
	ScrollView,
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TextInput } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";

export default function ChatScreen() {
	const colors = ["#7C4DFF", "#F94A56", "#FF1744"];
  const colorz = ["#FF1744", "#F94A56", "#7C4DFF"];

	const [message, setMessage] = useState("");

	return (
		<View style={{ flex: 1 }}>
			<ScrollView style={{ flex: 1 }}>
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
							<Text style={{ textAlign: "left", color: "white" }}>Coucou Will !</Text>
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
							<Text
								style={styles.rightMessageSender}
							>
								William WERLÉ
							</Text>
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
							console.log(value);
						}}
						// onSubmitEditing={({ nativeEvent: { text, eventCount, target } }) =>
						// 	loadSearchResults()
						// }
					/>
					<TouchableOpacity
						style={styles.searchButtonBackground}
						// onPress={() => loadSearchResults()}
					>
						<FontAwesome
							style={styles.searchButton}
							name="send"
							size={16}
							color="white"
						/>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

var styles = StyleSheet.create({
	searchBar: {
		backgroundColor: "rgba(255, 255, 255, 0.5)",
		borderTopLeftRadius: 50,
		borderBottomLeftRadius: 50,
		width: "80%",
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
		flexGrow: 1,
		padding: 15,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 15,
		borderBottomRightRadius: 15,
	},
	rightMessageBox: {
		alignSelf: "flex-end",
		width: "75%",
		marginRight: "3%",
		flexGrow: 1,
		padding: 15,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 15,
		borderBottomLeftRadius: 15,
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
	},
	rightImg: {
		alignSelf: "flex-end",
		borderRadius: 50,
		width: 31,
		height: 34,
		paddingTop: 10,
		marginRight: "3%",
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
  messageSender:{
									textAlign: "left",
									color: "rgba(255, 255, 255, 0.5)",
									fontWeight: "bold",
									fontSize: 10,
								},
  rightMessageSender:{
									textAlign: "right",
									color: "rgba(255, 255, 255, 0.5)",
									fontWeight: "bold",
									fontSize: 10,
								}
});

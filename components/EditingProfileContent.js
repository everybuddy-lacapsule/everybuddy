import React, { useState } from "react";
import {
	View,
	StyleSheet,
	Text,
	ScrollView,
	Linking,
	KeyboardAvoidingView,
} from "react-native";
import { TextInput } from "react-native-paper";
import { Divider, SocialIcon, hollowWhite } from "@rneui/themed";
import { Avatar } from "@rneui/base";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

function EditingProfileContent(props) {
	const [userData, setUserData] = useState(props.userData);
	const [presentation, setPresentation] = useState(props.userData.presentation);
	const [searchCurrent, setSearchCurrent] = useState(
		props.userData.searchCurrent
	);
	const [githubLink, setGitHubLink] = useState(props.userData.searchCurrent);
	const [LinkedInLink, setLinkedInLink] = useState(
		props.userData.searchCurrent
	);
	/*----------------Locals Stats => set datas = datas from DB----------------------*/
	const [statusDatasList, setStatusDatasList] = useState([]);
	const [workDatasList, setWorkDatasList] = useState([]);
	const [workTypeDatasList, setWorkTypeDatasList] = useState([]);
	const [tagsDatasList, setTagsDatasList] = useState([]);
	const [location, setLocation] = useState("");
	const [userDatasInput, setUserDatasInput] = useState({
	firstName:"",
	name: "",
	avatar: "",
	presentation:"",
	searchCurrent: "",
	nbBatch :0,
	campus : "",
	cursus : "",
	long:0,
	lat:0,
	city:"",
	country: "",
	work: "",
	company: "",
	typeWork: "",
	linkedin: "",
	github:"",
	location: "", // String
	status: "", // Array
	tags: [], // Array
	userID: "62ee83d7c569cba82e5d7f2e",
	});
	/*----------------Function => get datas from DB----------------------*/
	const getDatasFromDB = async (typeDatas) => {
	const datas = await fetch(`${IPLOCAL}/datas/${typeDatas}`);
	const datasJSON = await datas.json();
	return datasJSON;
	};

	/*--------------GET ALLS DATAS FROM DB ONCE TIME => FILL Statuses/Works/TypeWorks List------------------*/
	useEffect(() => {
	/*------------------------Statuses---------------------*/
	getDatasFromDB("statuses")
		.then((response) => setStatusDatasList(response))
		.catch((error) => console.log(error));
	/*----------------------Works or jobs--------------------*/
	getDatasFromDB("jobs")
		.then((response) => setWorkDatasList(response))
		.catch((error) => console.log(error));
	/*----------------------WorkType--------------------*/
	getDatasFromDB("typeJobs")
		.then((response) => setWorkTypeDatasList(response))
		.catch((error) => console.log(error));
	/*----------------------Tags--------------------*/
	getDatasFromDB("tags")
		.then((response) => setTagsDatasList(response))
		.catch((error) => console.log(error));
	}, []);

	/*--------------VALIDATION AND SAVE USER DATAS IN DB------------------*/
	const handleSubmitValid = async () => {
	var res = await fetch(`${IPLOCAL}/users/updateProfile`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(userDatasInput),
	});
	res = await res.json();
	};
	
	return (
		<ScrollView style={styles.container}>
			<View style={styles.content}>
				<View style={styles.avatar}>
					<Avatar rounded size={150} source={{ uri: props.userData.avatar }} />
				</View>
				<View style={styles.view1}>
					{/* Nom Prénom */}
					<Text style={styles.name}>
						{props.userData.firstName} {props.userData.name}
					</Text>
					{/* TypeJob + Job + Entreprise */}
					<Text style={{ color: "#E74C3C", fontWeight: "bold", fontSize: 14 }}>
						{props.userData.work.typeWork}
					</Text>
					<Text style={styles.text1}>
						{props.userData.work.work}
						{"\n"}
						<Text style={{ color: "#0E0E66", fontWeight: "bold" }}>
							@ {props.userData.work.company}
						</Text>
						{"\n"}
						{"\n"}
						{/* Cursus */}
						Batch #{props.userData.capsule.nbBatch}{" "}
						{props.userData.capsule.campus}
						{"\n"}
						{props.userData.capsule.cursus}
					</Text>
				</View>
			</View>
			<View
				style={[
					{
						flexDirection: "row",
						alignItems: "flex-start",
						justifyContent: "space-between",
						marginHorizontal: 20,
					},
				]}
			>
				{/* Localisation actuelle */}
				<Text style={{ textAlignVertical: "center", alignSelf: "center" }}>
					{props.userData.address.city}, {props.userData.address.country}
				</Text>
				{/* Statut : OpenToWork/ Just Curious / Partner / Hiring */}
				<Text style={styles.badge1}>{props.userData.status}</Text>
			</View>
			<KeyboardAvoidingView style={{ marginVertical: 5 }}>
				<ScrollView
					style={{ marginHorizontal: 20, minHeight: 110 }}
					horizontal={true}
					scrollbar
					contentContainerStyle={styles.tags}
				>
					<Ionicons
						name="add-circle"
						size={40}
						color="#E74C3C"
						style={{ marginTop: 2.5 }}
					/>

					{/* Tags et compétences */}
					{props.userData.tags.map((tag, i) => {
						return (
							<View style={styles.view3} key={i}>
								<Text style={styles.badge2}>{tag}</Text>
								<Ionicons
									name="close"
									size={16}
									color="#0E0E66"
									style={{ marginTop: 2.5 }}
								/>
							</View>
						);
					})}
				</ScrollView>
			</KeyboardAvoidingView>
			<View style={styles.view2} scrollbar>
				<Text style={styles.title}>RECHERCHE ACTUELLE</Text>
				<TextInput
					mode="outlined"
					label="Tell your personal goals"
					outlineColor="#F0F0F0"
					style={[styles.textinput, { textAlignVertical: "top" }]}
					activeOutlineColor="#E74C3C"
					placeholderTextColor="rgba(0, 0, 0, 0.5)"
					multiline={true}
					editable={true}
					numberOfLines={4}
					onChangeText={(text) => setSearchCurrent({ text })}
					value={searchCurrent}
				/>
				<Text style={styles.title}>PRÉSENTATION</Text>
				<TextInput
					mode="outlined"
					label="PortFolio / Github Link"
					outlineColor="#F0F0F0"
					style={styles.textinput}
					activeOutlineColor="#E74C3C"
					placeholderTextColor="rgba(0, 0, 0, 0.5)"
					multiline={true}
					numberOfLines={4}
					onChangeText={(text) => setPresentation({ text })}
					value={presentation}
				/>
			</View>

			<Divider
				color={hollowWhite}
				style={{ width: " 90%", marginLeft: "5%", marginBottom: "3%" }}
			/>

			<View style={styles.icon}>
				{/* ICONES RESEAUX SOCIAUX */}
				{/* ------------- TROUVER COMMENT RECUPERER LES LIENS DE LA BDD ! ---------- */}
				<View
					style={{
						flexDirection: "row",
						marginHorizontal: 20,
						width: "99%",
						alignItems: "center",
					}}
				>
					<SocialIcon
						iconSize={12}
						onPress={() => {
							Linking.openURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
						}}
						type="github"
					/>
					<TextInput
						mode="outlined"
						label="PortFolio / Github Link"
						outlineColor="#F0F0F0"
						style={styles.textinput2}
						activeOutlineColor="#E74C3C"
						placeholder="https://github.com/..."
						placeholderTextColor="rgba(0, 0, 0, 0.5)"
						onChangeText={(text) => setPresentation({ text })}
						value={presentation}
					/>
				</View>
				<View
					style={{
						flexDirection: "row",
						marginHorizontal: 20,
						width: "99%",
						alignItems: "center",
					}}
				>
					<SocialIcon iconSize={12} type="linkedin" />
					<TextInput
						mode="outlined"
						label="LinkedIn page"
						outlineColor="#F0F0F0"
						style={styles.textinput2}
						activeOutlineColor="#E74C3C"
						placeholder="https://www.linkedin.com/in/..."
						placeholderTextColor="rgba(0, 0, 0, 0.5)"
						onChangeText={(text) => setPresentation({ text })}
						value={presentation}
					/>
				</View>
			</View>
		</ScrollView>
	);
}

function mapStateToProps(state) {
	return { userData: state.userDatas };
}

export default connect(mapStateToProps, null)(EditingProfileContent);

// --------- Style CSS --------------------
var styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: -10,
		margin: 5,
	},
	content: {
		flexDirection: "row",
		marginBottom: 10,
		marginTop: 10,
	},
	tags: {
		flexDirection: "row",
		alignItems: "center",
	},
	icon: {
		flexDirection: "column",
		alignSelf: "center",
		marginBottom: 10,
		// marginTop: 10,
		marginHorizontal: 20,
	},
	name: {
		fontWeight: "bold",
		fontSize: 22,
		marginTop: 20,
	},
	avatar: {
		size: 100,
		alignSelf: "flex-start",
		marginTop: 15,
	},
	view1: {
		width: "55%",
		justifyContent: "space-between",
		marginHorizontal: 20,
	},
	view2: {
		justifyContent: "space-between",
		marginHorizontal: 20,
	},
	view3: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderColor: "#0E0E66",
		borderRadius: 50,
		borderWidth: 1.2,
		padding: 5,
		marginRight: 5,
		marginVertical: 2.5,
	},
	text1: {
		fontSize: 14,
		marginBottom: 5,
	},
	text2: {
		fontSize: 14,
		marginBottom: 15,
		textAlign: "left",
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 5,
	},
	badge1: {
		width: "55%",
		backgroundColor: "#0E0E66",
		color: "white",
		fontSize: 18,
		borderColor: "#0E0E66",
		borderRadius: 50,
		borderWidth: 1.2,
		textAlign: "center",
		padding: 2,
	},
	badge2: {
		fontWeight: "bold",
		color: "#0E0E66",
		fontSize: 10,
		textAlign: "center",
		textAlignVertical: "center",
	},
});

import React, { useState, useEffect } from "react";
import {
	View,
	StyleSheet,
	Text,
	ScrollView,
	KeyboardAvoidingView,
} from "react-native";
import { TextInput } from "react-native-paper";
import { Divider, SocialIcon, hollowWhite } from "@rneui/themed";
import { Avatar } from "@rneui/base";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { REACT_APP_DEV_MODE } from "@env";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";

function EditingProfileContent(props) {
	
	const [userDatasInput, setUserDatasInput] = useState(props.userDatas);

	/*----------------Locals Stats => set datas = datas from DB----------------------*/
	const [statusDatasList, setStatusDatasList] = useState([]);
	const [status, setStatus] =  useState('');

	const [workDatasList, setWorkDatasList] = useState([]);
	const [work, setWork] =  useState('');

	const [workTypeDatasList, setWorkTypeDatasList] = useState([]);
	const [workType, setWorkType] =  useState('');

	const [tagsDatasList, setTagsDatasList] = useState([]);
	
	const [cursus, setCursus] = React.useState("");
	const [campus, setCampus] = React.useState("");

	const Item = Picker.Item;


	var cursusList = ["Fullstack", "DevOps", "Code for business"];
	cursusList = cursusList.filter(item => item!==userDatasInput.capsule.cursus);
	var campusList = ["Paris", "Lyon", "Marseille", "Toulouse", "Bordeaux", "Monaco"];
	campusList = campusList.filter(item => item!==userDatasInput.capsule.campus);

	console.log('campus liste de merde', campusList)
	/*----------------Function => get datas from DB----------------------*/
	const getDatasFromDB = async (typeDatas) => {
		const datas = await fetch(`${REACT_APP_DEV_MODE}/datas/${typeDatas}`);
		const datasJSON = await datas.json();
		return datasJSON;
	};

	/*--------------GET ALLS DATAS FROM DB ONCE TIME => FILL Statuses/Works/TypeWorks List------------------*/
	useEffect(() => {
		/*------------------------Statuses---------------------*/
		getDatasFromDB("statuses")
			.then((response) => setStatusDatasList(response.filter(status => status !== userDatasInput.status)))
			.catch((error) => console.log(error));
		/*----------------------Works or jobs--------------------*/
		getDatasFromDB("jobs")
			.then((response) => setWorkDatasList(response.filter(work => work !== userDatasInput.work.work)))
			.catch((error) => console.log(error));
		/*----------------------WorkType--------------------*/
		getDatasFromDB("typeJobs")
			.then((response) => setWorkTypeDatasList(response.filter(workType => workType !== userDatasInput.work.typeWork)))
			.catch((error) => console.log(error));
		/*----------------------Tags--------------------*/
		getDatasFromDB("tags")
		.then((response) => setTagsDatasList(response))
		.catch((error) => console.log(error));
		
	}, []);

	//   Add inputs to the local state
	function addInput(input, value) {
		let userDatasInputCopy = { ...userDatasInput };
		if (input === "tags") {
			if (!userDatasInputCopy[input].find((e) => e === value)) {
				userDatasInputCopy[input] = [...userDatasInputCopy[input], value];
			} else {
				userDatasInputCopy[input] = userDatasInputCopy[input].filter(
					(e) => e !== value
				);
			}
		} else if (
			input === "campus" ||
			input === "cursus" ||
			input === "nbBatch"
		) {
			userDatasInputCopy.capsule[input] = value;
		} else if (input === "city") {
			userDatasInputCopy.address[input] = value;
		} else if (
			input === "work" ||
			input === "typeWork" ||
			input === "company"
		) {
			userDatasInputCopy.work[input] = value;
		} else if (input === "linkedin" || input === "github") {
			userDatasInputCopy.linkRs[input] = value;
		} else if (input ==="location"){
			userDatasInputCopy.address.city = value;

		}else {
			userDatasInputCopy[input] = value;
		}
		setUserDatasInput(userDatasInputCopy);
	}
	useEffect(() => {
		console.log('in editing profile content', userDatasInput);
		props.setUserDatas(userDatasInput);
	}, [userDatasInput]);

	return (
		<ScrollView style={styles.container}>
			<View style={styles.avatar}>
				<Avatar rounded size={150} source={{ uri: userDatasInput.avatar }} />
			</View>
			<View style={{ marginHorizontal: 20 }}>
				<TextInput
					mode="outlined"
					label="Prénom"
					outlineColor="#F0F0F0"
					style={[styles.textinput3, { textAlignVertical: "top" }]}
					activeOutlineColor="#E74C3C"
					placeholderTextColor="rgba(0, 0, 0, 0.5)"
					editable={true}
					onChangeText={(text) => addInput("firstName", text)}
					value={userDatasInput.firstName}
				/>
				<TextInput
					mode="outlined"
					label="Nom"
					outlineColor="#F0F0F0"
					style={[styles.textinput3, { textAlignVertical: "top" }]}
					activeOutlineColor="#E74C3C"
					placeholderTextColor="rgba(0, 0, 0, 0.5)"
					editable={true}
					onChangeText={(text) => addInput("name", text)}
					value={userDatasInput.name}
				/>

					<Divider color={hollowWhite} style={{ width: " 90%", marginLeft: "5%" }}/>

				{/* //!  STATUT PRO */}
				<Picker
						selectedValue={workType}
						onValueChange={(v) => setWorkType(v)}
						mode="dropdown"
						enabled={true}
						style={styles.textinput3}
					>
						<Item label={userDatasInput.work.typeWork} value={userDatasInput.work.typeWork} />
						{workTypeDatasList.map((workType, i) => {
						return (
							<Item key={i} label={workType} value={workType} />
						);
					})}
					</Picker>
					<Picker
						selectedValue={work}
						onValueChange={(v) => setWorkType(v)}
						mode="dropdown"
						enabled={true}
						style={styles.textinput3}
					>
						<Item label={userDatasInput.work.work} value={userDatasInput.work.work} />
						{workDatasList.map((work, i) => {
						return (
							<Item key={i} label={work} value={work} />
						);
					})}
					</Picker>
				<TextInput
					mode="outlined"
					label="Entreprise"
					outlineColor="#F0F0F0"
					style={[styles.textinput3, { textAlignVertical: "top" }]}
					activeOutlineColor="#E74C3C"
					placeholderTextColor="rgba(0, 0, 0, 0.5)"
					editable={true}
					onChangeText={(text) => addInput("company", text)}
					value={userDatasInput.work.company}
				/>

<Divider color={hollowWhite} style={{ width: " 90%", marginLeft: "5%" }}/>


				<View
					style={[
						{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
						},
					]}
				>

					
					{/* //!CURSUS */}
					<Picker
						selectedValue={cursus}
						onValueChange={(v) => setCursus(v)}
						mode="dropdown"
						enabled={true}
						style={styles.textinput4}
					>
						<Item label={userDatasInput.capsule.cursus} value={userDatasInput.capsule.cursus} />
						{cursusList.map((cursus, i) => {
						return (
							<Item key={i} label={cursus} value={cursus} />
						);
					})}
					
					</Picker>
					{/* //!CAMPUS */}
					<Picker
						selectedValue={campus}
						onValueChange={(v) => setCampus(v)}
						mode="dropdown"
						enabled={true}
						style={styles.textinput4}
					>
						<Item label={userDatasInput.capsule.campus} value={userDatasInput.capsule.campus} />
						{campusList.map((campus, i) => {
						return (
							<Item key={i} label={campus} value={campus} />
						);
					})}
					</Picker>
				</View>
				<TextInput
						mode="outlined"
						label="Batch#"
						keyboardType="numeric"
						outlineColor="#F0F0F0"
						style={[styles.textinput4, { textAlignVertical: "top" }]}
						activeOutlineColor="#E74C3C"
						placeholderTextColor="rgba(0, 0, 0, 0.5)"
						editable={true}
						onChangeText={(text) => addInput("nbBatch", Number(text))}
						value={`${userDatasInput.capsule.nbBatch}`}
					/>
				
				<Divider color={hollowWhite} style={{ width: " 90%", marginLeft: "5%" }}/>

				<View
					style={[
						{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
						},
					]}
				>
					{/* //!Localisation actuelle */}
					<TextInput
						mode="outlined"
						label="Ville de résidence"
						outlineColor="#F0F0F0"
						style={styles.textinput4}
						activeOutlineColor="#E74C3C"
						placeholderTextColor="rgba(0, 0, 0, 0.5)"
						editable={true}
						onChangeText={(text) => addInput("location", text)}
						value={userDatasInput.address.city}
					/>
					{/* Statut : OpenToWork/ Just Curious / Partner / Hiring */}
					<Picker
						selectedValue={status}
						onValueChange={(v) => setCampus(v)}
						mode="dropdown"
						enabled={true}
						style={styles.textinput4}
					>
						<Item label={userDatasInput.status} value={userDatasInput.status} />
						{statusDatasList.map((status, i) => {
						return (
							<Item key={i} label={status} value={status} />
						);
					})}
					</Picker>
				</View>
			</View>
			<KeyboardAvoidingView style={{ marginVertical: 5 }}>
				<ScrollView
					style={{ marginHorizontal: 20, minHeight: 110 }}
					horizontal={true}
					scrollbar
					contentContainerStyle={styles.tags}
				>
					{/* Tags et compétences */}
					<Ionicons
						name="add-circle"
						size={40}
						color="#E74C3C"
						style={{ marginTop: 1.5 }}
						//   onPress={()=> }
					/>
					{userDatasInput.tags.map((tag, i) => {
						return (
							<View style={styles.view3} key={i}>
								<Text style={styles.badge2}>{tag}</Text>
								<Ionicons
									name="close"
									size={16}
									color="#0E0E66"
									style={{ marginTop: 1.5 }}
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
					onChangeText={(text) => addInput("searchCurrent", text)}
					value={userDatasInput.searchCurrent}
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
					onChangeText={(text) => addInput("presentation", text)}
					value={userDatasInput.presentation}
				/>
			</View>
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
					<SocialIcon iconSize={12} type="github" style={{ marginTop: 14 }} />
					<TextInput
						mode="outlined"
						label="PortFolio / Github Link"
						outlineColor="#F0F0F0"
						style={styles.textinput2}
						activeOutlineColor="#E74C3C"
						placeholder="https://github.com/..."
						placeholderTextColor="rgba(0, 0, 0, 0.5)"
						onChangeText={(text) => addInput("github", text)}
						value={userDatasInput.linkRs.github}
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
					<SocialIcon iconSize={12} type="linkedin" style={{ marginTop: 14 }} />
					<TextInput
						mode="outlined"
						label="LinkedIn page"
						outlineColor="#F0F0F0"
						style={styles.textinput2}
						activeOutlineColor="#E74C3C"
						placeholder="https://www.linkedin.com/in/..."
						placeholderTextColor="rgba(0, 0, 0, 0.5)"
						onChangeText={(text) => addInput("linkedin", text)}
						value={userDatasInput.linkRs.linkedin}
					/>
				</View>
			</View>
		</ScrollView>
	);
}

function mapStateToProps(state) {
	return { userDatas: state.userDatas };
}
function mapDispatchToProps(dispatch) {
	return {
		setUserDatas: function (userDatas) {
			dispatch({ type: "register", userDatas });
		},
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditingProfileContent);

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
		alignSelf: "center",
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
		flexDirection: "column",
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
	textinput: {
		backgroundColor: "white",
		// height: 140,
		width: "100%",
	},
	textinput2: {
		backgroundColor: "white",
		borderRadius: 5,
		textAlignVertical: "top",
		marginVertical: 10,
		height: 40,
		width: "89%",
	},
	textinput3: {
		backgroundColor: "white",
		marginVertical: 10,
		height: 40,
		width: "100%",
	},
	textinput4: {
		backgroundColor: "white",
		borderRadius: 5,
		marginVertical: 10,
		height: 40,
		width: "48%",
	},
	modalbutton: {
		backgroundColor: "#E74C3C",
		height: 40,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		fontSize: 14,
		borderRadius: 50,
		marginVertical: 10,
	},
	modalText: { fontWeight: "bold", color: "white", marginHorizontal: "12%" },
});

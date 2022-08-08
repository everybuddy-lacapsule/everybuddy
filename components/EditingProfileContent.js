import React, { useState } from "react";
import {
	View,
	StyleSheet,
	TextInput,
	Text,
	ScrollView,
	Linking,
	KeyboardAvoidingView,
} from "react-native";
import { Divider, SocialIcon, hollowWhite } from "@rneui/themed";
import { Avatar } from "@rneui/base";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

function EditingProfileContent(props) {
	const [userData, setUseData] = useState(props.userData);
	const [presentation, setPresentation] = useState("");
	console.log("caca", userData);
	return (
		<ScrollView style={styles.container}>
			<View style={styles.content}>
				<View style={styles.avatar}>
					<Avatar rounded size={142} source={{ uri: props.userData.avatar }} />
				</View>
				<View style={styles.view1}>
					{/* Nom Prénom */}
					<Text style={styles.name}>
						{props.userData.firstName} {props.userData.name}
					</Text>
					{/* Cursus */}
					<Text style={styles.text1}>
						Batch {props.userData.capsule.nbBatch}{" "}
						{props.userData.capsule.campus}
					</Text>
					{/* Job + Entreprise */}
					<Text style={styles.text1}>
						{props.userData.work.work} @ {props.userData.work.company}
					</Text>
					{/* Statut : OpenToWork/ Just Curious / Partner / Hiring */}
					<Text style={styles.badge1}>{props.userData.status}</Text>
				</View>
			</View>
			<View style={styles.view1}>
				{/* Localisation actuelle */}
				<Text style={styles.text2}>
					{props.userData.address.city} {props.userData.address.country}
				</Text>
			</View>
			<KeyboardAvoidingView style={{marginVertical:5}}>
			<ScrollView
				style={{ marginHorizontal: 20 }}
				horizontal={true}
				scrollbar
				contentContainerStyle={styles.tags}
			>
				<Ionicons
					name="add-circle"
					size={30}
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
					style={{ backgroundColor: 'white', borderRadius:5, textAlignVertical:'top', padding:10}}
					placeholder={props.userData.searchCurrent}
					placeholderTextColor= "rgba(0, 0, 0, 0.5)"
					multiline={true}
					numberOfLines={4}
					onChangeText={(text) => setPresentation({ text })}
					value={presentation}
				/>				
				<Text style={styles.title}>PRÉSENTATION</Text>
				<TextInput
					style={{flexGrow:0.8 ,backgroundColor: 'white', borderRadius:5, textAlignVertical:'top', padding:10}}
					placeholder={props.userData.presentation}
					placeholderTextColor= "rgba(0, 0, 0, 0.5)"
					multiline={true}
					numberOfLines={4}
					onChangeText={(text) => setPresentation({ text })}
					value={presentation}
				/>
			</View>

			<Divider
				color={hollowWhite}
				style={{ width: " 90%", marginLeft: "5%", marginBottom:'3%' }}
			/>

			<View style={styles.icon}>
				{/* ICONES RESEAUX SOCIAUX */}
				{/* ------------- TROUVER COMMENT RECUPERER LES LIENS DE LA BDD ! ---------- */}
				<View style={{ flexDirection:'row', marginHorizontal:20,width:'100%',}}>
				<SocialIcon
					iconSize={12}
					onPress={() => {
						Linking.openURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
					}}
					type="github"
				/>
				<TextInput
					style={{backgroundColor: 'white', borderRadius:5, textAlignVertical:'top', padding:10}}
					placeholder='https://github.com/...'
					placeholderTextColor= "rgba(0, 0, 0, 0.5)"
					onChangeText={(text) => setPresentation({ text })}
					value={presentation}
				/>
				</View>
				<View style={{ flexDirection:'row', marginHorizontal:20, width:'100%',}}>
				<SocialIcon
				iconSize={12}
					type="linkedin"
				/>
					<TextInput
					style={{backgroundColor: 'white', borderRadius:5, textAlignVertical:'top', padding:10, marginVertical:10}}
					placeholder='https://www.linkedin.com/in/...'
					placeholderTextColor= "rgba(0, 0, 0, 0.5)"
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
		marginTop: 10,
		marginHorizontal: 20,

	},
	name: {
		fontWeight: "bold",
		fontSize: 22,
		marginBottom: 10,
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
		margin: 20,
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
		fontSize: 16,
		marginBottom: 5,
	},
	text2: {
		fontSize: 15,
		marginBottom: 15,
		textAlign: "justify",
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 5,
	},
	badge1: {
		marginRight: 10,
		backgroundColor: "#0E0E66",
		color: "white",
		fontSize: 18,
		borderColor: "#0E0E66",
		borderRadius: 50,
		borderWidth: 1.2,
		textAlign: "center",
		paddingTop: 2,
	},
	badge2: {
		marginLeft: 5,
		fontWeight: "bold",
		color: "#0E0E66",
		fontSize: 10,
		textAlign: "center",
		textAlignVertical: "center",
	},
});

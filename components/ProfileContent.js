import React from "react";
import { View, StyleSheet, Text, ScrollView, Linking } from "react-native";
import { Divider, SocialIcon, hollowWhite } from "@rneui/themed";
import { Avatar } from "@rneui/base";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

function ProfileContent(props) {
	return (
		<View style={styles.container}>
            {/* //* Bloc info top */}
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
			<ScrollView
				style={{ marginHorizontal: 20, minHeight:'6%' }}
				horizontal={true}
				scrollbar
				contentContainerStyle={styles.tags}
			>
				{/* Tags et compétences */}
				{props.userData.tags.map((tag, i) => {
					return (
						<View style={styles.view3} key={i}>
							<Text style={styles.badge2}>{tag}</Text>
						</View>
					);
				})}
			</ScrollView>

			<ScrollView contentContainerStyle={styles.view2} scrollbar>
				<Text style={styles.title}>RECHERCHE ACTUELLE</Text>
				<Text style={styles.text2}>{props.userData.searchCurrent}</Text>
				<Text style={styles.title}>PRÉSENTATION</Text>
				<Text style={styles.text2}>{props.userData.presentation}</Text>
			</ScrollView>

			<Divider
				color={hollowWhite}
				style={{ width: " 90%", marginLeft: "5%" }}
			/>

			<View style={styles.icon}>
				{/* ICONES RESEAUX SOCIAUX */}
				{/* ------------- TROUVER COMMENT RECUPERER LES LIENS DE LA BDD ! ---------- */}
				<SocialIcon
					onPress={() => {
						Linking.openURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
					}}
					type="github"
				/>
				<SocialIcon
					onPress={() => {
						Linking.openURL("https://www.linkedin.com/");
					}}
					type="linkedin"
				/>
			</View>
		</View>
	);
}

function mapStateToProps(state) {
	return { userData: state.userDatas };
}

export default connect(mapStateToProps, null)(ProfileContent);

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
		flexDirection: "row",
		flexwrap: "wrap",
		alignSelf: "center",
		marginBottom: 10,
		marginTop: 10,
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
		fontWeight: "bold",
		color: "#0E0E66",
		fontSize: 10,
		textAlign: "center",
		textAlignVertical: "center",
	},
});
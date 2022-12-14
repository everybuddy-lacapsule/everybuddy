import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Linking,
  TouchableOpacity,
} from "react-native";
import { Divider, SocialIcon, hollowWhite, Overlay } from "@rneui/themed";
import { Avatar } from "@rneui/base";
import { connect } from "react-redux";
import { REACT_APP_DEV_MODE } from "@env";

function ProfileScreen(props) {
  const [alumniDatas, setAlumniDatas] = useState({});
  const [visible, setVisible] = useState(false);
  const [msgSent, setMsgSent] = useState(null);
  const [discussionID, setDiscussionID] = useState("");
  console.log(REACT_APP_DEV_MODE);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    const getAlumnisDatas = async () => {
      const response = await fetch(
        `${REACT_APP_DEV_MODE}/users/getUserDatas?userID=${props.alumniIDSearch}`
      );
      const dataJSON = await response.json();
      setAlumniDatas(dataJSON.userDatas);
    };
    getAlumnisDatas();

    const getDiscussion = async () => {
      /* --------------- FIND DISCUSSIONID IF EXIST/ ELSE CREATE A NEW DISCUSSION  ---------------- */
      const discussionIDRes = await fetch(
        `${REACT_APP_DEV_MODE}/discussions/createDiscussion`,
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `senderID=${props.userDatas._id}&receiverID=${props.alumniIDSearch}`,
        }
      );
      const discussionIDJSON = await discussionIDRes.json();
      setDiscussionID(discussionIDJSON);
    };
    getDiscussion();
  }, [props.alumniIDSearch]);

  /* ----------------------SEND MESSAGE AND SAVE TO DB---------------- */
  useEffect(() => {
    // Create an obj === a document saved in message collection when BUTTON SEND default MSG actived
    // Send default msg if button 'red' cliked
    const defautMsg = `Hello ${alumniDatas.firstName}, envie d’aller boire une bière ?`;
    const sendDefaultMsg = async () => {
      if (msgSent) {
        //console.log("MSG default", defautMsg);
        const defautMsgToDB = {
          discussionID: discussionID,
          senderID: props.userDatas._id,
          content: defautMsg,
        };
        try {
          // SEND message to DB
          const saveMsgToDB = await fetch(
            `${REACT_APP_DEV_MODE}/messages/addMessage`,
            {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: `message=${defautMsgToDB.content}&discussionID=${defautMsgToDB.discussionID}&userID=${defautMsgToDB.senderID}`,
            }
          );
        } catch (error) {
          console.log(error);
        }
      }
      if (msgSent === false) {
        // Dispatch infos of the discussion to store => transfert to ChatScreen
        props.getDiscussionID({
          discussionID: discussionID,
          anotherMember: alumniDatas,
        });
        props.navigation.navigate("Chat");
      }
    };
    sendDefaultMsg();
    setMsgSent(null);
  }, [msgSent]);

  return (
    <View style={styles.container}>
      <Overlay
        overlayStyle={{
          width: 350,
          height: 280,
          justifyContent: "space-between",
        }}
        isVisible={visible}
        onBackdropPress={toggleOverlay}
      >
        <Text style={styles.overlayTitle}>
          Proposer une bière à {alumniDatas.firstName} ?
        </Text>
        <Text style={{ color: "#0e0e66" }}>
          Sur everyBuddy, nous souhaitons vous inciter à partager un verre / un
          repas avec les alumnis !
        </Text>
        <Text style={{ color: "#0e0e66" }}>
          On trouve ça plus sympa pour rencontrer les gens !
        </Text>
        <Text style={{ color: "#0e0e66", marginTop: 20 }}>
          En cliquant sur Oui, un message automatique sera envoyé :
        </Text>
        <Text style={{ color: "#0e0e66" }}>
          “Hello {alumniDatas.firstName}, envie d’aller boire une bière ?”
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity
            style={[styles.overlayButton]}
            onPress={() => {
              setMsgSent(true);
              toggleOverlay();
            }}
          >
            <Text style={{ fontSize: 18, color: "#FFFFFF" }}>
              {"\uD83C\uDF7B"} Oui
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.overlayButton]}
            onPress={() => {
              toggleOverlay();
            }}
          >
            <Text style={{ fontSize: 18, color: "#FFFFFF" }}>Non</Text>
          </TouchableOpacity>
        </View>
      </Overlay>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.avatar}>
            <Avatar rounded size={140} source={{ uri: alumniDatas.avatar }} />
          </View>
          {/* //*Right infos */}
          <View style={styles.view1}>
					{/* Nom Prénom */}
					<Text style={styles.name}>
						{alumniDatas.firstName} {alumniDatas.name}
					</Text>
					{/* TypeJob + Job + Entreprise */}
					<Text style={{ color: "#E74C3C", fontWeight: "bold", fontSize: 14 }}>
						{alumniDatas.work?.typeWork ? alumniDatas.work.typeWork  : ""}
					</Text>
					<Text style={styles.text1}>
						{alumniDatas.work?.work ? alumniDatas.work.work : ''}
						{"\n"}
						<Text style={{ color: "#0E0E66", fontWeight: "bold" }}>
						{alumniDatas.work?.company ? "@ " + alumniDatas.work.company : ''}
						</Text>
						{"\n"}
						{/* Cursus */}
						{alumniDatas.capsule?.nbBatch ? `Batch# ${alumniDatas.capsule.nbBatch} ` : ''}
						{alumniDatas.capsule?.campus ? alumniDatas.capsule.campus : ''}
						{"\n"}
						{alumniDatas.capsule?.cursus ? alumniDatas.capsule.cursus : ''}
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
					{alumniDatas.address?.city}, {alumniDatas.address?.country}
				</Text>
				{/* Statut : OpenToWork/ Just Curious / Partner / Hiring */}
				<Text style={styles.badge1}>{alumniDatas.status}</Text>
			</View>
        <ScrollView
          style={{ marginHorizontal: 20, minHeight: "7%", marginVertical:20}}
          contentContainerStyle={styles.tags}
          horizontal={true}
        >
          {/* Tags et compétences */}
          {alumniDatas.tags?.map((tag, i) => {
            return (
              <View style={styles.view3} key={i}>
                <Text style={styles.badge2}>{tag}</Text>
              </View>
            );
          })}
        </ScrollView>

        <View style={{ marginHorizontal: 20 }}>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => {
              toggleOverlay();
            }}
          >
            <Text style={{ fontSize: 18, color: "#FFFFFF" }}>
              {"\uD83C\uDF7B"} Proposer une bière
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => {
              setMsgSent(false);
            }}
          >
            <Text style={{ fontSize: 18, color: "#FFFFFF" }}>
              {"\uD83D\uDCAA"} Envoyer un message
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.view2} scrollbar>
          <Text style={styles.title}>RECHERCHE ACTUELLE</Text>
          <Text style={styles.text2}>{alumniDatas.searchCurrent}</Text>
          <Text style={styles.title}>PRÉSENTATION</Text>
          <Text style={styles.text2}>{alumniDatas.presentation}</Text>
        </ScrollView>

        <Divider
          color={hollowWhite}
          style={{ width: " 90%", marginLeft: "5%" }}
        />

        <View style={styles.icon}>
          {/* ICONES RESEAUX SOCIAUX */}
          <SocialIcon
            onPress={() => { alumniDatas.linkRs.linkedin?
              Linking.openURL(alumniDatas.linkRs.linkedin) : alert("Aucun lien GitHub renseigné");
            }}  
            type="github"
          />
          <SocialIcon
            onPress={() => { alumniDatas.linkRs.linkedin?
              Linking.openURL(alumniDatas.linkRs.linkedin) : alert("Aucun lien LinkedIn renseigné")
            }}
            type="linkedin"
          />
        </View>
      </View>
    </View>
  );
}

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
    margin: 3,
  },
  name: {
    color:"#0E0E66",
		fontWeight: "bold",
		fontSize: 22,
		marginTop: 20,
  },
	avatar: {
		alignSelf: "flex-start",
		marginTop: 25,
		marginLeft: 20,
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
    color: "#0e0e66",
    fontSize: 16,
    marginBottom: 5,
  },
  text2: {
    fontSize: 15,
    textAlign: "justify",
    color: "#0e0e66",
  },
  title: {
    color: "#0e0e66",
    fontSize: 18,
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
    margin: 5,
  },
  button: {
    width: "100%",
    margin: 3,
    backgroundColor: "#E74C3C",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    height: 33,
    borderRadius: 5,
  },
  overlayButton: {
    width: "45%",
    margin: 8,
    backgroundColor: "#E74C3C",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    height: 33,
    borderRadius: 5,
  },
  overlayTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0e0e66",
    marginBottom: 15,
    textAlign: "center",
  },
  overlayText: {
    marginTop: 20,
  },
});

const mapStateToProps = (state) => {
  return {
    userDatas: state.userDatas,
    alumniIDSearch: state.alumniIDSearch,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDiscussionID: function (discussionInfos) {
      dispatch({ type: "getDiscussionID", discussionInfos: discussionInfos });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

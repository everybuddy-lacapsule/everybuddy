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
// import { IPLOCAL } from "@env";
const IPLOCAL = "http://172.16.189.144:3000";

function ProfileScreen(props) {
  const [alumniDatas, setAlumniDatas] = useState({});
  const [visible, setVisible] = useState(false);
  const [msgSent, setMsgSent] = useState(null);
  const [discussionID, setDiscussionID] = useState('');

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    const getAlumnisDatas = async () => {
      const response = await fetch(
        `${IPLOCAL}/users/getUserDatas?userID=${props.alumniIDSearch}`
      );
      //console.log("reponse", response);
      const dataJSON = await response.json();
      //console.log("ça marche", dataJSON);
      setAlumniDatas(dataJSON.userDatas);
    };
    getAlumnisDatas();
  }, [props.alumniIDSearch]);

    /* ----------------------SEND MESSAGE AND SAVE TO DB---------------- */
    useEffect(() => {
      /* --------------- SEND A DEFAULT MESSAGE ---------------- */
      const getDiscussion = async () => {
        /* --------------- FIND DISCUSSIONID IF EXIST/ ELSE CREATE A NEW DISCUSSION  ---------------- */
        const discussionIDRes = await fetch(
          `${IPLOCAL}/discussions/createDiscussion`,
          {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `senderID=${props.userDatas._id}&receiverID=${props.alumniIDSearch}`,
          }
        );
        const discussionIDJSON = await discussionIDRes.json();
        setDiscussionID(discussionIDJSON);
        //console.log("DiscussionIDJSON", discussionIDJSON);
      };
      getDiscussion();
      // Create an obj === a document saved in message collection when BUTTON SEND default MSG actived
      // Send default msg if button 'red' cliked
      const defautMsg = `Hello ${alumniDatas.firstName}, envie d’aller boire une bière ?`;
      console.log("TEST", defautMsg);
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
            const saveMsgToDB = await fetch(`${IPLOCAL}/messages/addMessage`, {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: `message=${defautMsgToDB.content}&discussionID=${defautMsgToDB.discussionID}&userID=${defautMsgToDB.senderID}`,
            });
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
        }
      };
      sendDefaultMsg();
    }, [msgSent]);

  return (
    <View style={styles.container}>
      <Overlay
        overlayStyle={{ width: 350, height: 280, justifyContent: "space-between" }}
        isVisible={visible}
        onBackdropPress={toggleOverlay}
      >
        <Text style={styles.overlayTitle}>
          Proposer une bière à {alumniDatas.firstName} ?
        </Text>
        <Text style={{color: "#0e0e66"}}>
          Sur everyBuddy, nous souhaitons vous inciter partager un verre / un
          repas avec les alumnis !
        </Text>
        <Text style={{color: "#0e0e66"}}>On trouve ça plus sympa pour rencontrer les gens !</Text>
        <Text style={{color: "#0e0e66", marginTop: 20}}>
          En cliquant sur Oui, un message automatique sera envoyé :
        </Text>
        <Text style={{color: "#0e0e66"}}>“Hello {alumniDatas.firstName}, envie d’aller boire une bière ?”</Text>
        <View style={{flexDirection: 'row', justifyContent: "center"}}>
          <TouchableOpacity
            style={[styles.overlayButton]}
            onPress={() => {setMsgSent(true); toggleOverlay()}}
          >
            <Text style={{ fontSize: 18, color: "#FFFFFF" }}>
              {"\uD83C\uDF7B"} Oui
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.overlayButton]} onPress={() => {toggleOverlay()}}>
            <Text style={{ fontSize: 18, color: "#FFFFFF" }}>
              Non
            </Text>
          </TouchableOpacity>
        </View>
      </Overlay>
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.avatar}>
          <Avatar rounded size={142} source={{ uri: alumniDatas.avatar }} />
        </View>
        <View style={styles.view1}>
          {/* Nom Prénom */}
          <Text style={styles.name}>
            {alumniDatas.firstName} {alumniDatas.name}
          </Text>
          {/* Cursus */}
          <Text style={styles.text1}>
            Batch {alumniDatas.capsule?.nbBatch} {alumniDatas.capsule?.campus}
          </Text>
          {/* Job + Entreprise */}
          <Text style={styles.text1}>
            
            {alumniDatas.work?.work} @ {alumniDatas.work?.company}
          </Text>
          {/* Statut : OpenToWork/ Just Curious / Partner / Hiring */}
          <Text style={styles.badge1}>{alumniDatas.status}</Text>
        </View>
      </View>
      <View style={styles.view1}>
        {/* Localisation actuelle */}
        <Text style={styles.text2}>
          {alumniDatas.address?.city} {alumniDatas.address?.country}
        </Text>
      </View>
      <View style={styles.tags}>
        {/* Tags et compétences */}
        {alumniDatas.tags?.map((tag, i) => {
          return (
            <Text style={styles.badge2} key={i}>
              {tag}
            </Text>
          );
        })}
      </View>

      <View>
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
        <TouchableOpacity style={[styles.button]}
        onPress={() => {setMsgSent(false);
          props.navigation.navigate("Chat");}}>
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
    // marginLeft: 10
  },
  tags: {
    color: "#0e0e66",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 0,
    margin: 8,
  },
  icon: {
    flexDirection: "row",
    flexwrap: "wrap",
    alignSelf: "center",
    margin: 3,
  },
  name: {
    color: "#0e0e66",
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 5,
    marginTop: 20,
  },
  avatar: {
    size: 100,
    alignSelf: "flex-start",
    marginTop: 15,
  },
  view1: {
    justifyContent: "space-between",
    marginLeft: 20,
  },
  view2: {
    justifyContent: "space-between",
    margin: 20,
  },
  text1: {
    color: "#0e0e66",
    fontSize: 16,
    marginBottom: 5,
  },
  text2: {
    fontSize: 15,
    marginBottom: 15,
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
    margin: 10,
    marginTop: 0,
    fontWeight: "bold",
    color: "#0E0E66",
    fontSize: 11.4,
    borderColor: "#0E0E66",
    borderRadius: 50,
    borderWidth: 1.2,
    textAlign: "center",
    padding: 6,
  },
  button: {
    width: "92%",
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

const mapDispatchToProps = (ditpatch) => {
  return {
    getDiscussionID: function (discussionInfos) {
      ditpatch({ type: "getDiscussionID", discussionInfos: discussionInfos });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

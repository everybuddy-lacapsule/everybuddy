import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Linking,
  Button,
} from "react-native";
import { Divider, SocialIcon, hollowWhite } from "@rneui/themed";
import { Avatar } from "@rneui/base";
import { connect } from "react-redux";
import { IPLOCAL } from "@env";
//const urlLocal = "http://" + IPLOCAL + ":3000";
const urlLocal = 'http://'+'172.16.188.131'+':3000';

// --------------- COPIE DE MYPROFILESCREEN ----------------

function ProfileScreen(props) {
  const [alumniDatas, setAlumniDatas] = useState({});
  const [discussionID, setDiscussionID] = useState("");
  const [msgSent, setMsgSent] = useState(null);

  useEffect(() => {
    const getAlumnisDatas = async () => {
      const response = await fetch(
        `${urlLocal}/users/getUserDatas?userID=${props.alumniIDSearch}`
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
        `${urlLocal}/discussions/createDiscussion`,
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
    const defautMsg = `Hello ${alumniDatas.name}, envie d’aller boire une bière ?`;
    //console.log("TEST", defautMsg);
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
          const saveMsgToDB = await fetch(`${urlLocal}/messages/addMessage`, {
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
      <Button
        onPress={() => {
          setMsgSent(true); // Set condition to send default msg
        }}
        title="Proposer une bière"
        color="red"
      />
      <Button
        onPress={() => {
          setMsgSent(false);
          props.navigation.navigate("Chat"); // Go to ChatScreen, default msg not actived
        }}
        title="Envoyer un message"
        color="blue"
      />
      <View style={styles.view1}>
        {/* Localisation actuelle */}
        <Text style={styles.text2}>
          {alumniDatas.address?.city} {alumniDatas.address?.country}
        </Text>
      </View>
      <View style={styles.tags}>{/* Tags et compétences */}</View>

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
    // )}
    // )}
  );
}

// --------- Style CSS --------------------
var styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
  },
  content: {
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 10,
    // marginLeft: 10
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
    marginTop: 10,
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
    fontSize: 23,
    marginBottom: 10,
    marginTop: 15,
  },
  avatar: {
    size: 100,
    alignSelf: "flex-start",
    marginTop: 20,
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
    fontSize: 18,
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
    fontSize: 20,
    borderColor: "#0E0E66",
    borderRadius: 50,
    borderWidth: 1.2,
    textAlign: "center",
    paddingTop: 2,
  },
  badge2: {
    margin: 10,
    marginTop: 5,
    fontWeight: "bold",
    color: "#0E0E66",
    fontSize: 12,
    borderColor: "#0E0E66",
    borderRadius: 50,
    borderWidth: 1.2,
    textAlign: "center",
    padding: 5,
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

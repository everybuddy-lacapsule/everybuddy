import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, Linking } from "react-native";
import { Divider, SocialIcon, hollowWhite } from "@rneui/themed";
import { Avatar } from "@rneui/base";
import { connect } from "react-redux";
import { IPLOCAL } from "@env";
const urlLocal = "http://172.16.189.134:3000";

// --------------- COPIE DE MYPROFILESCREEN ----------------

function ProfileScreen(props) {
  const [alumniDatas, setAlumniDatas] = useState({});

  useEffect(() => {
    const getAlumnisDatas = async () => {
      const response = await fetch(
        `${urlLocal}/users/getUserDatas?userID=${props.alumniIDSearch}`
      );
      var dataJSON = await response.json();
      setAlumniDatas(dataJSON.userDatas);
    };
    getAlumnisDatas();
  }, []);

  console.log("TEEEESSSTT", alumniDatas);

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
    alumniIDSearch: state.alumniIDSearch,
  };
};

export default connect(mapStateToProps, null)(ProfileScreen);

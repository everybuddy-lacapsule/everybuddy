import React from "react";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, ImageBackground, } from "react-native";
import { Divider, Icon, hollowWhite } from "@rneui/themed";
import { connect } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

export default function OnboardingScreenInfo(props) {
  return (
    <ImageBackground 
    style={styles.container}
    source={require("../assets/back.png")}
    >
      <ScrollView>
        <View style={styles.view1}>
          <Text style={styles.badge2}>1</Text>

          <Text style={styles.text2}>
            EveryBuddy te permet de trouver les Alumnis de la Capsule selon tes
            critères et ta zone de recherche !
          </Text>
          <Divider
            color={hollowWhite}
            style={{ width: " 90%", marginLeft: "5%" }}
          />

          <Text style={styles.badge2}>2</Text>
          <Text style={styles.text2}>
            Tu vas pouvoir préciser les interactions que tu recherches : un
            emploi, un collaborateur, un buddy pour échanger...
          </Text>
          <Divider
            color={hollowWhite}
            style={{ width: " 90%", marginLeft: "5%" }}
          />

          <Text style={styles.badge2}>3</Text>

          <Text style={styles.text2}>
            N'oublie pas de compléter ta page de Profil pour améliorer la
            recherche !
          </Text>
        </View>
      </ScrollView>

      <View style={styles.bottom}>
        <TouchableOpacity>
        <AntDesign
          name="right"
          size={25}
          color="white"
          onPress={() => {
            props.navigation.navigate("OnBoardingStatus");
          }}
        />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

// --------- Style CSS --------------------
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  view1: {
    justifyContent: "center",
    marginRight: 10,
    marginLeft: 10,
  },
  text2: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center",
  },
  badge2: {
    alignSelf: "center",
    marginBottom: 40,
    marginTop: 40,
    color: "white",
    fontSize: 25,
    borderColor: "#E74C3C",
    borderRadius: 50,
    borderWidth: 1.2,
    textAlign: "center",
    padding: 5,
    backgroundColor: "#E74C3C",
    width: 45,
  },
  bottom: {
    backgroundColor: "#0E0E66",
    height: 55,
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
});

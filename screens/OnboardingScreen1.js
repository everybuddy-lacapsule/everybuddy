import React from "react";
import {View, StyleSheet, Text, ScrollView, Linking} from "react-native";
import { Divider, SocialIcon, hollowWhite,  } from "@rneui/themed";
import { Avatar } from "@rneui/base";
import {connect} from 'react-redux';



function OnboardingScreen1(props) {

    return (
<View 
style={styles.container} 
>

</View>
    )
}

 export default connect(mapStateToProps, null)(OnboardingScreen1);

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

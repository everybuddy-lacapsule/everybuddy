import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
import { CheckBox } from "@rneui/base";
import { AntDesign, Octicons } from "@expo/vector-icons";

function OnBoardingStatus(props) {
  const [page, setPage] = useState(1);
  const [userDatasInput, setUserDatas] = useState({
    location: "", // String
    status: "", // Array
    tags: [], // Array
    work: "", // Array
    workType: "", // Array
    id: props.userDatas._id,
  });

  const statusDatasList = [
    "#OPEN TO WORK",
    "#HIRING",
    "#PARTNER",
    "#JUST CURIOUS",
  ];

  const workDatasList = [
    "Développeur",
    "Product Owner",
    "Data Scientist",
    "DevOps",
    "Scrum Master",
  ];
  const workTypeDatasList = [
    "Entrepreneur",
    "En contrat",
    "Freelance",
    "En recherche",
  ];

  function addData(filter, value) {
    let userDatasInputCopy = { ...userDatasInput };
    userDatasInputCopy[filter] = value;
    setUserDatas(userDatasInputCopy);
  }

  //   function addTags(filter, value) {
  //     let userDatasCopy = { ...userDatas };
  //       if (!userDatasCopy[filter].find((e) => e === value)) {
  //         userDatasCopy[filter] = [...userDatasCopy[filter], value];
  //       } else {
  //         userDatasCopy[filter] = userDatasCopy[filter].filter((e) => e !== value);
  //     }
  //     setUserDatas(userDatasCopy);
  //   }

  console.log(userDatasInput);
  console.log("numéro", page);

  // PAGE POUR LES STATUTS
  var status = (
    <View>
      <Text style={styles.title}>Alors, pourquoi es-tu ici ?</Text>
      {statusDatasList.map(function (status, i) {
        var checked = false;
        if (userDatasInput.status === status) {
          checked = true;
        }
        return (
          <CheckBox
            key={i}
            textStyle={{ fontSize: 24, color: "#0E0E66" }}
            containerStyle={{ backgroundColor: "rgba(255,255,255,0)" }}
            title={status}
            checked={checked}
            checkedColor="#0E0E66"
            onPress={() => addData("status", status)}
          />
        );
      })}
    </View>
  );

  // PAGE POUR LE METIER
  var work = (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Tu es ?</Text>
      {workDatasList.map(function (work, i) {
        var checked = false;
        if (userDatasInput.work === work) {
          checked = true;
        }
        return (
          <CheckBox
            key={i}
            textStyle={{ fontSize: 24, color: "#0E0E66" }}
            containerStyle={{ backgroundColor: "rgba(255,255,255,0)" }}
            title={work}
            checked={checked}
            checkedColor="#0E0E66"
            onPress={() => addData("work", work)}
          />
        );
      })}
      <Text style={styles.title}>Et plutôt ?</Text>
      {workTypeDatasList.map(function (work, i) {
        var checked = false;
        if (userDatasInput.workType === work) {
          checked = true;
        }
        return (
          <CheckBox
            key={i}
            textStyle={{ fontSize: 24, color: "#0E0E66" }}
            containerStyle={{ backgroundColor: "rgba(255,255,255,0)" }}
            title={work}
            checked={checked}
            checkedColor="#0E0E66"
            onPress={() => addData("workType", work)}
          />
        );
      })}
    </ScrollView>
  );

  // VARIABLE POUR LE DEFILEMENT DES PAGES
    var firstDot = (
      <Octicons name="dot-fill" size={24} color="white" />,
      <Octicons name="dot" size={24} color="white" />,
      <Octicons name="dot" size={24} color="white" />
    )

    var secondDot = (
      <Octicons name="dot" size={24} color="white" />,
      <Octicons name="dot-fill" size={24} color="white" />,
      <Octicons name="dot" size={24} color="white" />
    )

    var thirdDot = (
      <Octicons name="dot" size={24} color="white" />,
      <Octicons name="dot" size={24} color="white" />,
      <Octicons name="dot-fill" size={24} color="white" />
    )

  var advance
  var content;
  if (page === 1) {
    content = status;
    advance = firstDot
  }
  if (page === 2) {
    content = work;
    advance = secondDot
  }

  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/back.png")}
    >
      <View style={styles.content}>{content}</View>
      <View style={styles.bottom}>
        <AntDesign
          name="left"
          size={25}
          color="white"
          onPress={() => {
            setPage(page - 1);
          }}
        />
        {advance}
        <AntDesign
          name="right"
          size={25}
          color="white"
          onPress={() => {
            setPage(page + 1);
          }}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  content: {
    alignItems: "center",
    height: "90%",
  },
  background: {
    opacity: 0.5,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#e74c3c",
    marginTop: "30%",
    marginBottom: 50,
  },
  bottom: {
    flexDirection: "row",
    backgroundColor: "#0E0E66",
    height: 55,
    justifyContent: "space-between",
    padding: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    userDatas: state.userDatas,
  };
};

export default connect(mapStateToProps, null)(OnBoardingStatus);

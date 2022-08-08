import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { CheckBox } from "@rneui/base";
import { AntDesign } from "@expo/vector-icons";
import { Badge } from "@rneui/themed";
import { FontAwesome } from "@expo/vector-icons";

const IPLOCAL = "http://192.168.0.149:3000";

function OnBoardingStatus(props) {
  const [page, setPage] = useState(1);

  /*----------------Locals Stats => set datas = datas from DB----------------------*/
  const [statusDatasList, setStatusDatasList] = useState([]);
  const [workDatasList, setWorkDatasList] = useState([]);
  const [workTypeDatasList, setWorkTypeDatasList] = useState([]);
  const [tagsDatasList, setTagsDatasList] = useState([]);

  const [location, setLocation] = useState("");

  const [userDatasInput, setUserDatas] = useState({
    location: "", // String
    status: "", // Array
    tags: [], // Array
    work: "", // Array
    workType: "", // Array
    userID: "62ee83d7c569cba82e5d7f2e",
  });
  /*----------------Function => get datas from DB----------------------*/
  const getDatasFromDB = async (typeDatas) => {
    const datas = await fetch(`${IPLOCAL}/datas/${typeDatas}`);
    const datasJSON = await datas.json();
    return datasJSON;
  };

  /*--------------GET ALLS DATAS FROM DB ONCE TIME => FILL Statuses/Works/TypeWorks List------------------*/
  useEffect(() => {
    /*------------------------Statuses---------------------*/
    getDatasFromDB("statuses")
      .then((response) => setStatusDatasList(response))
      .catch((error) => console.log(error));
    /*----------------------Works or jobs--------------------*/
    getDatasFromDB("jobs")
      .then((response) => setWorkDatasList(response))
      .catch((error) => console.log(error));
    /*----------------------WorkType--------------------*/
    getDatasFromDB("typeJobs")
      .then((response) => setWorkTypeDatasList(response))
      .catch((error) => console.log(error));
    /*----------------------Tags--------------------*/
    getDatasFromDB("tags")
      .then((response) => setTagsDatasList(response))
      .catch((error) => console.log(error));
  }, []);

  /*--------------VALIDATION AND SAVE USER DATAS IN DB------------------*/
  const handleSubmitValid = async () => {
    var res = await fetch(`${IPLOCAL}/users/userDatas`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userDatasInput),
    });
    res = await res.json();
  };

  /*
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

  const tagsDatasList = [
    "Frontend",
    "Backend",
    "Fullstack",
    "JavaScript",
    "AngularJS",
    "ReactJS",
    "VueJS",
    "TypeScript",
    "ReactNative",
    "Swift",
    "Kotlin",
    "Flutter",
    "BDD",
    "API",
    "Java",
    "Python",
    "PHP",
  ];
  */

  function addData(filter, value) {
    let userDatasInputCopy = { ...userDatasInput };
    userDatasInputCopy[filter] = value;
    setUserDatas(userDatasInputCopy);
  }

  function addFilters(filter, value) {
    let userDatasInputCopy = { ...userDatasInput };
    if (!userDatasInputCopy[filter].find((e) => e === value)) {
      userDatasInputCopy[filter] = [...userDatasInputCopy[filter], value];
    } else {
      userDatasInputCopy[filter] = userDatasInputCopy[filter].filter(
        (e) => e !== value
      );
    }
    setUserDatas(userDatasInputCopy);
  }

  useEffect(() => {
    setUserDatas({ ...userDatasInput, location: location });
  }, [location]);

  //console.log(userDatasInput);
  //console.log("numéro", page);

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

  var work = (
    <ScrollView showsVerticalScrollIndicator={true}>
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

  var tag = (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>CHOISIS TES TAGS PUTAIN</Text>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          margin: 30,
          paddingBottom: 10,
          paddingLeft: 10,
        }}
      >
        {tagsDatasList.map(function (tag, i) {
          var color = "#0E0E66";
          var status = "";
          if (userDatasInput.tags.find((i) => i === tag)) {
            color = "#0e0e66";
            status = "white";
          }
          return (
            <Badge
              key={i}
              value={tag}
              onPress={() => addFilters("tags", tag)}
              containerStyle={{ margin: 5 }}
              status={status}
              textStyle={{ color: color, fontSize: 16 }}
              badgeStyle={{
                borderColor: "#ffffff",
                borderWidth: 1.1,
                padding: 2,
                height: 30,
                borderRadius: 15,
              }}
            />
          );
        })}
      </View>
      <View style={styles.headerTitle}>
        <TextInput
          value={location}
          style={styles.searchBar}
          placeholder="Indique ta ville"
          onChangeText={(value) => setLocation(value)}
          //   onSubmitEditing={({ nativeEvent: { text, eventCount, target } }) =>
          //     loadSearchResults()
          //   }
        ></TextInput>
        <FontAwesome
          style={styles.searchButton}
          name="search"
          size={16}
          color="#0e0e66"
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSubmitValid()}
      >
        <Text style={styles.confirm}>C'est parti !</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.navigate("LoginScreen")}
      >
        <Text style={styles.confirm}>Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  var content;
  if (page === 1) {
    content = status;
  }
  if (page === 2) {
    content = work;
  }
  if (page === 3) {
    content = tag;
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
  searchBar: {
    height: "100%",
    width: "80%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 50,
    paddingLeft: 15,
    paddingRight: 15,
  },
  headerTitle: {
    flexDirection: "row",
    paddingVertical: 20,
    justifyContent: "center",
  },
  searchButton: {
    left: -25,
    top: 5,
  },
  button: {
    width: "90%",
    borderRadius: 10,
    backgroundColor: "#E74C3C",
    marginBottom: 25,
    padding: 15,
    alignSelf: "center",
  },
  confirm: {
    fontSize: 20,
    textAlign: "center",
    color: "#FFFFFF",
  },
});

const mapStateToProps = (state) => {
  return {
    userDatas: state.userDatas,
  };
};

export default connect(mapStateToProps, null)(OnBoardingStatus);

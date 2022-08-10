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
import { AntDesign, Octicons } from "@expo/vector-icons";
import { Badge, Overlay } from "@rneui/themed";
import { FontAwesome } from "@expo/vector-icons";

import {REACT_APP_DEV_MODE} from "@env"

function OnBoardingStatus(props) {
  const [page, setPage] = useState(1);
  console.log(REACT_APP_DEV_MODE)
  /*----------------Locals Stats => set datas = datas from DB----------------------*/
  const [statusDatasList, setStatusDatasList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [workDatasList, setWorkDatasList] = useState([]);
  const [typeWorkDatasList, setTypeWorkDatasList] = useState([]);
  const [tagsDatasList, setTagsDatasList] = useState([]);
  /*----------------Locals Stats => verify information of onboarding----------------------*/
  const [location, setLocation] = useState("");
  const [addressValited, setAddressValited] = useState(false);
  const [areSelected, setAreSelected] = useState(false);
  /*--------------------Setting  Overlay----------------------*/

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const [userDatasInput, setUserDatas] = useState({
    address: null, // String
    status: "", // Array
    tags: [], // Array
    work: "", // Array
    typeWork: "", // Array
    userID: props.userDatas._id,
  });
  /*----------------Function => get datas from DB----------------------*/
  const getDatasFromDB = async (typeDatas) => {
    const datas = await fetch(`${REACT_APP_DEV_MODE}/datas/${typeDatas}`);
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
    /*----------------------typeWork--------------------*/
    getDatasFromDB("typeJobs")
      .then((response) => setTypeWorkDatasList(response))
      .catch((error) => console.log(error));
    /*----------------------Tags--------------------*/
    getDatasFromDB("tags")
      .then((response) => setTagsDatasList(response))
      .catch((error) => console.log(error));
  }, []);

  /*--------------VERIFY LOCATION ---------------*/
  const handleVerifyLocation = async () => {
    const res = await fetch(`${REACT_APP_DEV_MODE}/users/userLocation`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `location=${location}`,
    });
    const resJSON = await res.json();
    if (resJSON.success) {
      props.setOnboardingSearch({
        // search :true is used to display the radius circle after first search, even with no results
        search: true,
        searchResults: resJSON.users,
        searchLocation: {
          long: resJSON.address.long,
          lat: resJSON.address.lat,
          locationRequest: resJSON.address.city,
          radius: resJSON.radius
        },
      });

      setAddressValited(true);
      setUserDatas({ ...userDatasInput, address: resJSON.address });
     
    } else {
      setErrorMessage("Veuillez indiquer un lieu valide");
      toggleOverlay();
    }
  };

  /*--------------VERIFY INFORMATIONS ONBOARDING ---------------*/
  useEffect(() => {
    if (
      userDatasInput.address &&
      userDatasInput.status &&
      userDatasInput.work &&
      userDatasInput.typeWork &&
      userDatasInput.tags.length > 0
    ) {
      setAreSelected(true);
    }
  }, [userDatasInput]);

  /*--------------VALIDATION AND SAVE USER DATAS IN DB------------------*/
  const handleSubmitValid = async () => {
    if (areSelected) {
      var res = await fetch(`${REACT_APP_DEV_MODE}/users/userDatas`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDatasInput),
      });
      var dataJSON
       const getUserDatas = async () => {
        const response = await fetch(
        `${REACT_APP_DEV_MODE}/users/getUserDatas?userID=${props.userDatas._id}`
        );
         dataJSON = await response.json();
         return dataJSON;
      };
      getUserDatas().then((response) =>props.setUserDatas(response.userDatas)).catch((error) => console.log(error));
      
      props.navigation.navigate("Home");
    } else {
      setErrorMessage("Veuillez valider tous les champs");
      toggleOverlay();
    }
  };

  function addData(filter, value) {
    let userDatasInputCopy = { ...userDatasInput };
    userDatasInputCopy[filter] = value;
    setUserDatas(userDatasInputCopy);
  }

  function addTags(filter, value) {
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
      {typeWorkDatasList.map(function (work, i) {
        var checked = false;
        if (userDatasInput.typeWork === work) {
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
            onPress={() => addData("typeWork", work)}
          />
        );
      })}
    </ScrollView>
  );

  // PAGE POUR LES STACKS
  var tag = (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Dans quoi te reconnais-tu ?</Text>
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
          var backgroundColor = "#FFFFFF";
          if (userDatasInput.tags.find((i) => i === tag)) {
            color = "#FFFFFF";
            backgroundColor = "#E74C3C";
          }
          return (
            <Badge
              key={i}
              value={tag}
              onPress={() => addTags("tags", tag)}
              containerStyle={{ margin: 5 }}
              textStyle={{ color: color, fontSize: 20 }}
              badgeStyle={{
                borderColor: "#ffffff",
                justifyContent: "center",
                backgroundColor: backgroundColor,
                borderWidth: 1.1,
                paddingBottom: 2,
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
          onSubmitEditing={({ nativeEvent: { text, eventCount, target } }) =>
            handleVerifyLocation()
          }
        ></TextInput>
        <TouchableOpacity>
        <FontAwesome
          style={styles.searchButton}
          name="search"
          size={20}
          color="#0e0e66"
          onPress={() => handleVerifyLocation()}
        />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSubmitValid()}
      >
        <Text style={styles.confirm}>C'est parti !</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  // VARIABLE POUR LE DEFILEMENT DES PAGES
  var firstDot = (
    <View>
      <Text>
        <Octicons name="dot-fill" size={24} color="white" />,
        <Octicons name="dot" size={24} color="white" />,
        <Octicons name="dot" size={24} color="white" />
      </Text>
    </View>
  );

  var secondDot = (
    <View>
      <Text>
        <Octicons name="dot" size={24} color="white" />,
        <Octicons name="dot-fill" size={24} color="white" />,
        <Octicons name="dot" size={24} color="white" />
      </Text>
    </View>
  );

  var thirdDot = (
    <View>
      <Text>
        <Octicons name="dot" size={24} color="white" />,
        <Octicons name="dot" size={24} color="white" />,
        <Octicons name="dot-fill" size={24} color="white" />
      </Text>
    </View>
  );

  var advance;

  var content;
  if (page === 1) {
    content = status;
    advance = firstDot;
  }
  if (page === 2) {
    content = work;
    advance = secondDot;
  }
  if (page === 3) {
    content = tag;
    advance = thirdDot;
  }

  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/back.png")}
    >
      <Overlay
        overlayStyle={{ width: 300 }}
        isVisible={visible}
        onBackdropPress={toggleOverlay}
      >
        <Text>{errorMessage}</Text>
      </Overlay>
      <View style={styles.content}>{content}</View>
      <View style={styles.bottom}>
        <TouchableOpacity>
          <AntDesign
            name="left"
            size={25}
            color="white"
            onPress={() => {
              if (page === 1) {
                setPage(page);
              } else {
                setPage(page - 1);
              }
            }}
          />
        </TouchableOpacity>

        {advance}

        <TouchableOpacity>
          <AntDesign
            name="right"
            size={25}
            color="white"
            onPress={() => {
              if (page === 3) {
                setPage(page);
              } else {
                setPage(page + 1);
              }
            }}
          />
        </TouchableOpacity>
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
    marginBottom: "8%",
    alignSelf: "center",
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
    fontSize: 18,
    borderRadius: 50,
    paddingLeft: 15,
  },
  headerTitle: {
    flexDirection: "row",
    height: 80,
    paddingVertical: 20,
    justifyContent: "center",
  },
  searchButton: {
    left: -25,
    top: 8,
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

const mapDispatchToProps = (dispatch) => {
  return {
    setOnboardingSearch: function (resultsOnboarding) {
      dispatch({
        type: "onboardingSearch",
        resultsOnboarding: resultsOnboarding,
      }); 
    },
    setUserDatas: function (userDatas) {
      dispatch({ type: "register", userDatas });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OnBoardingStatus);

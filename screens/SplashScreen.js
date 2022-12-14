import React, { useEffect } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import {REACT_APP_DEV_MODE} from "@env"


function SplashScreen(props) {
  // console.log('splash screen: ',REACT_APP_DEV_MODE)

  useEffect(() => {
    AsyncStorage.getItem("userID", async function (error, userID) {
      if (userID !== null) {

        var datas = await fetch(
          `${REACT_APP_DEV_MODE}/users/getUserDatas?userID=${userID}`
        );
        datas = await datas.json();
        props.setUserDatas(datas.userDatas);

        var buddiesDatas = await fetch(
          `${REACT_APP_DEV_MODE}/buddies/?userID=${userID}`
        );
        buddiesDatas = await buddiesDatas.json();
        console.log('TG', buddiesDatas)
        props.setBuddiesListFromDB(buddiesDatas.buddiesInfos);
      } else {
        props.setUserDatas({})
      }
    });
  }, []);

  async function searchLocation() {
    const res = await fetch(`${REACT_APP_DEV_MODE}/users/userLocation`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `location=${props.userDatas?.address.city}`,
    });
    return res.json();
  }

  var handleStart = async () => {
    AsyncStorage.getItem("userID", async function (error, userID) {
      if (userID !== null) {
        searchLocation().then((response) => {
          if (response.success) {
            props.setSplashSearch({
              // search :true is used to display the radius circle after first search, even with no results
              search: true,
              searchResults: response.users,
              searchLocation: {
                long: response.address.long,
                lat: response.address.lat,
                locationRequest: response.address.city,
                radius: response.radius,
              },
            })
          }
        }).then(()=>{props.navigation.navigate("Home")});
    } else {
      props.navigation.navigate("LoginScreen");
    }
    })};

  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/splash.png")}
    >
      <View
        style={{ flex: 1, flexDirection: "column", justifyContent: "flex-end" }}
      >
        <TouchableOpacity style={styles.button} onPress={() => handleStart()}>
          <Text style={styles.confirm}>Commencer</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

// --------- Style CSS --------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    opacity: 0.5,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
  },

  text: {
    width: "80%",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 80,
  },
  button: {
    width: "90%",
    borderRadius: 10,
    backgroundColor: "#E74C3C",
    marginBottom: 25,
    padding: 15,
    alignSelf: "center",
    elevation: 4,
  },
  confirm: {
    fontSize: 20,
    textAlign: "center",
    color: "#FFFFFF",
  },
});

//fonction pour le redux, reli?? au reducer userID
function mapStateToProps(state) {
  return { userDatas: state.userDatas };
}

function mapDispatchToProps(dispatch) {
  return {
    setUserDatas: function (userDatas) {
      dispatch({ type: "register", userDatas });
    },
    setBuddiesListFromDB: function (buddiesList) {
      dispatch({ type: "setBuddiesList", buddiesList });
      },
      setSplashSearch: function (splashSearch) {
        dispatch({ type: "splashSearch", splashSearch });
      },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);


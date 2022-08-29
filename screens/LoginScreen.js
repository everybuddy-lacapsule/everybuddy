import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Overlay, Input } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { REACT_APP_DEV_MODE } from "@env";

function LoginScreen(props) {
  const [visible, setVisible] = useState(false);
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPwd, setSigninPwd] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function searchLocation() {
    const res = await fetch(`${REACT_APP_DEV_MODE}/users/userLocation`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `location=${props.userDatas.address.city}`,
    });
    return res.json();
  }

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  //------------------------------------Affichage auto de l'email rempli dans CheckEmailScreen--------------------------------
  useEffect(() => {
    if (props.userEmail) {
      setSigninEmail(props.userEmail);
    }
  }, [props.userEmail]);

  var handleSubmitSignIn = async () => {
    var res = await fetch(`${REACT_APP_DEV_MODE}/users/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `email=${signinEmail}&pwd=${signinPwd}`,
    });
    res = await res.json();
    if (res.isLogin) {
      AsyncStorage.setItem("userID", res.userDatas._id);
      props.setUserDatas(res.userDatas);

      var buddiesDatas = await fetch(
        `${REACT_APP_DEV_MODE}/buddies/?userID=${res.userDatas._id}`
      );
      buddiesDatas = await buddiesDatas.json();
      props.setBuddiesListFromDB(buddiesDatas.buddiesInfos);

      if (res.userDatas.onboarding) {
        searchLocation().then((response) => {
          if (response.success) {
            props.setLoginSearch({
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
        props.navigation.navigate("OnboardingScreenInfo");
      }
    } else {
      setErrorMessage(res.errorMessage);
      toggleOverlay();
    }
  };

  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={styles.container}
    >
      <View style={styles.container}>
        <Overlay
          overlayStyle={{ width: 300 }}
          isVisible={visible}
          onBackdropPress={toggleOverlay}
        >
        <Text style={{textAlign: "center", color: '#0E0E66'}}>{errorMessage}</Text>
        </Overlay>
        <View style={styles.content}>
          <View style={styles.input}>
            <Input
              className="Login-input"
              onChangeText={(email) => setSigninEmail(email)}
              value={signinEmail}
              placeholder="john@lacapsule.com"
            />
          </View>
          <View style={styles.input}>
            <Input
              secureTextEntry={true}
              className="Login-input"
              onChangeText={(pwd) => setSigninPwd(pwd)}
              value={signinPwd}
              placeholder="Password"
            />
          </View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("CheckEmail")}
          >
            <Text style={styles.resetmdp}>
              Générer un mot de passe
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSubmitSignIn()}
        >
          <Text style={styles.confirm}>Confirmer</Text>
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
    marginTop: 20,
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
  resetmdp: {
    textDecorationLine: "underline",
    fontSize: 17,
    color:"#0E0E66",
  },
});

//Fonction qui récupère dans le reducers userEmail l'email et le renvoie dans la fonction
function mapStateToProps(state) {
  return { userEmail: state.userEmail,
          userDatas: state.userDatas
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUserDatas: function (userDatas) {
      dispatch({ type: "register", userDatas });
    },
    setBuddiesListFromDB: function (buddiesList) {
      dispatch({ type: "setBuddiesList", buddiesList });
    },
    setLoginSearch: function (loginSearch) {
      dispatch({ type: "loginSearch", loginSearch });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

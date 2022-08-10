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
import {REACT_APP_DEV_MODE} from "@env"

function LoginScreen(props) {
  const [visible, setVisible] = useState(false);
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPwd, setSigninPwd] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  console.log('login screen',REACT_APP_DEV_MODE)
  


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
    //console.log(res.userDatas);
    if (res.isLogin) {
      AsyncStorage.setItem("userID", res.userDatas._id);
      props.setUserDatas(res.userDatas);
      if (res.userDatas.onboarding) {
        props.navigation.navigate("Home");
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
          <Text>{errorMessage}</Text>
        </Overlay>
        <View style={styles.content}>
          <Text style={styles.text}>
            Consultez vos emails pour récupérer votre mot de passe
          </Text>
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
              Première connexion ou mot de passe oublié ?
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
    color: "#0e0e66",
  },
});

//Fonction qui récupère dans le reducers userEmail l'email et le renvoie dans la fonction
function mapStateToProps(state) {
  return { userEmail: state.userEmail };
}

function mapDispatchToProps(dispatch) {
  return {
    setUserDatas: function (userDatas) {
      dispatch({ type: "register", userDatas });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

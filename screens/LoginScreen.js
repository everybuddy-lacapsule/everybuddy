import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Overlay, Button, Input } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";

function LoginScreen(props) {
  const [visible, setVisible] = useState(false);
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPwd, setSigninPwd] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  var handleSubmitSignIn = async () => {
    var res = await fetch("http://172.16.189.145:3000/users/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `email=${signinEmail}&pwd=${signinPwd}`,
    });
    res = await res.json();
    if (res.isLogin) {
      AsyncStorage.setItem("userID", res.userID);
      props.navigation.navigate("Home");
    } else {
      setErrorMessage(res.errorMessage);
      toggleOverlay();
    }
  };

  return (
    <ImageBackground
      source={require("../assets/logo.jpg")}
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
            <Text style={styles.resetmdp}>Première fois ici ?</Text>
            <Text style={styles.resetmdp}>Oublie de mot de passe ?</Text>

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
  resetmdp: {
    textDecorationLine: "underline",
    fontSize: 15,
    color: "#e74c3c"
  }
});

export default LoginScreen;

import React, { useState } from "react";
import { connect } from "react-redux";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Overlay, Input } from "@rneui/themed";

import {IPLOCAL} from "@env"
var urlLocal = 'http://'+IPLOCAL+ ':3000'

function CheckEmailScreen(props) {
  const [visible, setVisible] = useState(false);
  const [signinEmail, setSigninEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  //------------------ FETCH récupère en BDD ------------------------------------
  var handleCheckEmail = async () => {
    var res = await fetch(`${urlLocal}/users/check-email`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `email=${signinEmail}`,
    });
    res = await res.json();
    if (res.emailExists) {
      props.navigation.navigate("LoginScreen");
      props.getEmail(res.userEmail);
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
            Renseignez votre E-mail de connexion Ariane
          </Text>
          <View style={styles.input}>
            <Input
              className="Login-input"
              onChangeText={(email) => setSigninEmail(email)}
              value={signinEmail}
              placeholder="john@lacapsule.com"
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleCheckEmail()}
        >
          <Text style={styles.confirm}>Confirmer</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

//fonction pour le redux, récupère dans HandleCheckEmail le user email et l'envoie dans le reducer userEmail
function mapDispatchToProps(dispatch) {
  return {
    getEmail: function (email) {
      dispatch({ type: "saveEmail", userEmail: email });
    },
  };
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

export default connect(null, mapDispatchToProps)(CheckEmailScreen);

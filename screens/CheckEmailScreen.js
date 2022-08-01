import React, { useState } from "react";
import { View, ImageBackground, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Overlay, Button, Icon, Input } from "@rneui/themed";

function CheckEmailScreen(props) {
  const [visible, setVisible] = useState(false);
  const [signinEmail, setSigninEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  var handleCheckEmail = async () => {
    var res = await fetch("http://172.16.190.139:3000/users/check-email", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `email=${signinEmail}`,
    });
    res = await res.json();
    if (res.emailExists) {
      props.navigation.navigate("LoginScreen");
    } else {
      setErrorMessage(res.errorMessage);
      toggleOverlay();
    }
  };

  //---------------------------------------------------------------------------------
  return (

    <ImageBackground 
    source={require('../assets/logo.jpg')} 
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

onPress={() => handleCheckEmail()}>
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
    width: '90%',
    borderRadius: 10,
    backgroundColor: "#E74C3C",
    marginBottom:25,
    padding: 15,
    alignSelf: 'center',
  },
  confirm : {
    fontSize: 20,
    textAlign: "center",
    color: '#FFFFFF',
  }
});

export default CheckEmailScreen;

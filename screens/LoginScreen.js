import React, { useState } from "react";
import { View, ImageBackground, StyleSheet, Text } from "react-native";
import { Overlay, Button, Icon, Input } from "@rneui/themed";

function LoginScreen(props) {
  const [visible, setVisible] = useState(false);
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPwd, setSigninPwd] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  var handleSubmitSignIn = async () => {
    var res = await fetch("http://172.16.189.141:3000/users/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `email=${signinEmail}&pwd=${signinPwd}`,
    });
    res = await res.json();
    if (res.isLogin) {
      props.navigation.navigate("Home");
    } else {
      setErrorMessage(res.errorMessage);
      toggleOverlay();
    }
  };

  return (
    <View style={styles.container}>
      <Overlay
        overlayStyle={{ width: 300 }}
        isVisible={visible}
        onBackdropPress={toggleOverlay}
      >
        <Text>{errorMessage}</Text>
      </Overlay>
      <View style={{ width: "70%" }}>
        <Input
          className="Login-input"
          onChangeText={(email) => setSigninEmail(email)}
          value={signinEmail}
          placeholder="john@lacapsule.com"
        />
      </View>
      <View style={{ width: "70%" }}>
        <Input
          secureTextEntry={true}
          className="Login-input"
          onChangeText={(pwd) => setSigninPwd(pwd)}
          value={signinPwd}
          placeholder="Password"
        />
      </View>
      <Button type="solid" onPress={() => handleSubmitSignIn()}>
        <Icon name="chevron-right" color="red" />
        Confirmer
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoginScreen;

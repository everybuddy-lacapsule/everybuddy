import React, { useState } from "react";
import { View, ImageBackground, StyleSheet, Text } from "react-native";
import { Button, Icon, Input } from "@rneui/themed";
import { connect } from "react-redux";

function LoginScreen(props) {
  const [signinEmail, setSigninEmail] = useState('');
  const [signinPwd, setSigninPwd] = useState('');

  var handleSubmitSignIn = async () => {
    var res = await fetch('http://172.16.189.141:3000/users/sign-in', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `email=${signinEmail}&pwd=${signinPwd}`
    })
    res = await res.json()
    if (res.saved) {
      props.navigation.navigate('Home')
    }
  }

  return (
    <View style={styles.container}>
        <View style={{ width: "70%" }}>
          <Input
            className="Login-input"
            onChangeText={(user) => setSigninEmail(user)}
            value={signinEmail}
            placeholder="john@lacapsule.com"
          />
        </View>
        <View style={{ width: "70%" }}>
          <Input
            secureTextEntry= {true}
            className="Login-input"
            onChangeText={(email) => setSigninPwd(email)}
            value={signinPwd}
            leftIcon={{ type: "font-awesome", name: "user", color: "#eb4d4b" }}
            placeholder="Password"
          />
        </View>
        <Button
          type="solid"
          onPress={()=> handleSubmitSignIn()}
        >
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

export default (LoginScreen);

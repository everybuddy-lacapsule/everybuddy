import React, { useEffect } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Overlay, Button, Icon, Input } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
//console.log(process.env);

function SplashScreen(props) {
  useEffect(() => {
    AsyncStorage.getItem("userID", async function (error, userID) {
      if (userID !== null) {
        var datas = await fetch(
          `http://172.16.190.6:3000/users/getUserDatas?userID=${userID}`
        );
        datas = await datas.json();
        //console.log(datas);
        props.setUserDatas(datas.userDatas);
      }
    });
  }, []);

  var handleStart = async () => {
    if (props.userDatas) {
      props.navigation.navigate("Home");
    } else {
      props.navigation.navigate("LoginScreen");
    }
  };

  return (
    <ImageBackground style={styles.container}
    source={require("../assets/splash.png")}
    >
      <View style={{ flex:1, flexDirection: 'column', justifyContent:'flex-end' }}>
      <Text style={[styles.confirm, {marginBottom:50}]}
        onPress={() => {
          AsyncStorage.clear(), props.setUserDatas(null);
        }}>Clear local storage</Text>
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
  },
  confirm: {
    fontSize: 20,
    textAlign: "center",
    color: "#FFFFFF",
  },
});

//fonction pour le redux, relié au reducer userID
function mapStateToProps(state) {
  return { userDatas: state.userDatas };
}

function mapDispatchToProps(dispatch) {
  return {
    setUserDatas: function (userDatas) {
      dispatch({ type: "register", userDatas });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
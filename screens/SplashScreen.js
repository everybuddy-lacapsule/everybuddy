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
<<<<<<< HEAD
          `http://192.168.1.23:3000/users/getUserDatas?userID=${userID}`
=======
          `http://192.168.0.149:3000/users/getUserDatas?userID=${userID}`
>>>>>>> 52bd232b72a8e7b6c13c296181fd724a08862caa
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
    <View style={styles.container}>
      <View style={styles.content}>
        <Text>EVERBUTTY</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => handleStart()}>
        <Text style={styles.confirm}>Confirmer</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          AsyncStorage.clear(), props.setUserDatas(null);
        }}
      >
        <Text style={styles.confirm}>Clear local storage</Text>
      </TouchableOpacity>
    </View>
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
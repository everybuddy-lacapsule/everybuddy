import React, { useEffect } from "react";
import { View, ImageBackground, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Overlay, Button, Icon, Input } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";


function SplashScreen(props) {

  useEffect(() => {
    AsyncStorage.getItem("userID", function (error, id) {
      console.log('id', id)
      props.setUserID(id);
    });
  }, []);

  var handleStart = async () => {
    if (props.userID) {
    props.navigation.navigate("Home");
    } else {
    props.navigation.navigate("CheckEmail");
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.content}>
      <Text>EVERBUTTY</Text>
      </View>
      <TouchableOpacity style={styles.button} 
       onPress={() => handleStart()}>
        <Text style={styles.confirm}>Confirmer</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} 
       onPress={() => {AsyncStorage.clear(), props.setUserID(null)}}>
        <Text style={styles.confirm}>Clear local storage</Text>
      </TouchableOpacity>
    </View>
  );
}

//fonction pour le redux, relié au reducer userID
function mapStateToProps(state) {
  return { userID: state.userID };
}

function mapDispatchToProps(dispatch) {
  return {
    setUserID: function (userID) {
      dispatch({ type: "register", userID });
    },
  };
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


  export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
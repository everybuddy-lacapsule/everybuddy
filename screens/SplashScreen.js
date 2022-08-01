import React, { useState } from "react";
import { View, ImageBackground, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Overlay, Button, Icon, Input } from "@rneui/themed";

function SplashScreen(props) {
  var handleStart = async () => {
    props.navigation.navigate("CheckEmail");
  };

  return (
    <View style={styles.container}>
        <View style={styles.content}>
      <Text>EVERBUTTY</Text>
      </View>

      <TouchableOpacity style={styles.button} 
       onPress={() => handleStart()}>
        <Text style={styles.confirm}>Confirmerrrr</Text>
      </TouchableOpacity>
    </View>
  );
}

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

export default SplashScreen;

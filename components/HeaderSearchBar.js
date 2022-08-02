import React, { useState, useRef } from "react";
import { TouchableOpacity, StyleSheet, View, TextInput } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import { connect } from "react-redux";

function HeaderSearchBar(props) {
  const [location, setLocation] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  var searchRef = useRef(null);

  async function loadSearchResults() {
    var searchResults = await fetch(
      `http:/172.16.188.131:3000/searchByLocation?location=${location}`
    );
    //console.log(searchResults);
    searchResults = await searchResults.json();
    //console.log(searchResults);
    setSearchResults(searchResults);

    props.search({
      search: searchResults.success,
      searchResults: searchResults.users,
      searchLocation: searchResults.location,
    });
  }
  /*
  console.log({
      searchResults: searchResults.users,
      searchLocation: searchResults.searchLocation,
    })
*/
  return (
    <View style={styles.headerTitle}>
      <TextInput
        style={styles.searchBar}
        placeholder="Type in city"
        onChangeText={(value) => setLocation(value)}
      />
      <TouchableOpacity
        style={styles.searchButtonBackground}
        onPress={() => loadSearchResults()}
      >
        <FontAwesome
          style={styles.searchButton}
          name="search"
          size={16}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {},
  searchBar: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    color: "white",
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    paddingLeft: 15,
    paddingRight: 15,
  },
  headerTitle: {
    flexDirection: "row",
    marginRight: 30,
  },
  searchButton: {
    alignSelf: "center",
    backgroundColor: "#E74C3C",
    padding: 6,
    borderRadius: 50,
  },
  searchButtonBackground: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    search: function (results) {
      dispatch({ type: "search", results: results });
    },
  };
};

export default connect(null, mapDispatchToProps)(HeaderSearchBar);

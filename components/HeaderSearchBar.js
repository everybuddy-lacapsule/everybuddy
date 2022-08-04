import React, { useState, useRef } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  Keyboard,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { connect } from "react-redux";

function HeaderSearchBar(props) {
  const [location, setLocation] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  var searchRef = useRef(null);

  async function loadSearchResults() {
    if (location) {
      var searchResults = await fetch(
        `http://192.168.27.171:3000/searchByLocation?location=${location}`
      );

      searchResults = await searchResults.json();
      setSearchResults(searchResults);

      props.search({
        search: true,
        searchResults: searchResults.users,
        searchLocation: searchResults.location,
      });
      Keyboard.dismiss();
    }
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
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        onChangeText={(value) => setLocation(value)}
        onSubmitEditing={({ nativeEvent: { text, eventCount, target } }) =>
          loadSearchResults()
        }
      />
      <TouchableOpacity
        style={styles.searchButtonBackground}
        onPress={() => loadSearchResults()}
      >
        <View style={styles.searchButton}>
          <FontAwesome name="search" size={16} color="white" />
        </View>
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

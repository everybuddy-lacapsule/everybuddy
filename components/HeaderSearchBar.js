import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  Keyboard,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { connect } from "react-redux";
import {REACT_APP_DEV_MODE} from "@env"

function HeaderSearchBar(props) {

  const [location, setLocation] = useState("");
  const [filters, setFilters] = useState({
    nbBatch: "", // Number
    location: "", // String
    radius: 10, // Number
    campus: [], // Array
    cursus: [], // Array
    status: [], // Array
    tags: [], // Array
    work: [], // Array
    workType: [], // Array
  });
  useEffect(() => {
    filters.location = location;
  }, [location]);

  async function loadSearchResults() {
    var searchResults = await fetch(
      `${REACT_APP_DEV_MODE}/search`,
      {method: "post",
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(filters),
    });
    searchResults = await searchResults.json();

    props.search({
      // search :true is used to display the radius circle after first search, even with no results
      search: true,
      searchResults: searchResults.users,
      searchLocation: searchResults.location,
    });
    Keyboard.dismiss();
  }

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

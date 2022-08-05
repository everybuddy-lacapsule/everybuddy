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

import {IPLOCAL} from "@env"

function HeaderSearchBar(props) {
  const [location, setLocation] = useState("");
  const [filters, setFilters] = useState({
    nbBatch: '', // Number
    location: '', // String 
    radius: 10, // Number
    campus: [], // Array
    cursus: [], // Array
    status: [], // Array
    tags: [], // Array
    work: [], // Array
    workType: [], // Array
  });
  useEffect(() => {
    filters.location = location
  },[location])

  async function loadSearchResults() {
    var searchResults = await fetch(
      `http://${IPLOCAL}:3000/search`,
      {method: "post",
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(filters),
      }
    );
    searchResults = await searchResults.json();
    console.log('searchResults', searchResults)

    props.search({
      // search :true is used to display the radius circle after first search, even with no results
      search: true,
      searchResults: searchResults.users,
      searchLocation: searchResults.location,
    });

}
  // async function loadSearchResults() {
  //   if (location) {
  //     var searchResults = await fetch(
  //       `http://${IPLOCAL}:3000/searchByLocation?location=${location}&radius=10`
  //     );
  //     searchResults = await searchResults.json();

  //     props.search({
  //       // search :true is used to display the radius circle after first search, even with no results
  //       search: true,
  //       searchResults: searchResults.users,
  //       searchLocation: searchResults.location,
  //     });
  //     Keyboard.dismiss();
  //   }
  // }

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

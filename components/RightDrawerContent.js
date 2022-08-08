import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Divider, Switch, Badge, Slider, Icon, Button } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { ListItem } from "@rneui/base";
import { ListItemAccordion } from "@rneui/base/dist/ListItem/ListItem.Accordion";
import { FontAwesome } from "@expo/vector-icons";

import { connect } from "react-redux";
import { IPLOCAL } from "@env";
//var urlLocal = 'http://'+IPLOCAL+':3000'
const urlLocal = "http://172.16.189.134:3000";

//* RIGHT DRAWER CONTENT
function CustomRightDrawerContent(props) {
  let colors = ["#FF1744", "#F94A56", "#7C4DFF"];

  // Etats du slider radius
  const [km, setKm] = useState(10);
  const [batch, setBatch] = useState("");
  const [location, setLocation] = useState("");

  // Etats pour dérouler et afficher les différentes catégories
  const [expandedCapsule, setExpandedCapsule] = useState(false);
  const [expandedStatus, setExpandedStatus] = useState(true);
  const [expandedTags, setExpandedTags] = useState(false);
  const [expandedJobs, setExpandedJobs] = useState(false);
  const [toggledCapsule, setToggledCapsule] = useState();
  const [toggledStatus, setToggledStatus] = useState();
  const [toggledTags, setToggledTags] = useState();
  const [toggledJobs, setToggledJobs] = useState();

  // Etat avec toutes les datas
  const [filters, setFilters] = useState({
    nbBatch: "", // Number
    location: "", // String
    radius: "", // Number
    campus: [], // Array
    cursus: [], // Array
    status: [], // Array
    tags: [], // Array
    work: [], // Array
    workType: [], // Array
  });

  // Allow the KM slider to set Filters.radius depending on his value state
  useEffect(() => {
    filters.radius = km;
  }, [km]);
  useEffect(() => {
    filters.location = location;
  }, [location]);
  useEffect(() => {
    filters.nbBatch = batch;
  }, [batch]);

  function addFilters(filter, value) {
    let filtersCopy = { ...filters };
    if (filter === "nbBatch" || filter === "location" || filter === "radius") {
      filtersCopy[filter] = value;
    } else {
      if (!filtersCopy[filter].find((e) => e === value)) {
        filtersCopy[filter] = [...filtersCopy[filter], value];
      } else {
        filtersCopy[filter] = filtersCopy[filter].filter((e) => e !== value);
    }
    setFilters(filtersCopy);
  }}

  function resetFilters() {
    setFilters({
      nbBatch: "", // Number
      location: "", // String
      radius: "", // Number
      campus: [], // Array
      cursus: [], // Array
      status: [], // Array
      tags: [], // Array
      work: [], // Array
      workType: [], // Array
    });
  }

  async function loadSearchResults() {
    // sans ce commentaire, ca marche pas !!! Si tu delte je te nique tes morts
    var searchResults = await fetch(
      `${urlLocal}/search`, 
      {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filters),
    });
    searchResults = await searchResults.json();

    props.search({
      // search :true is used to display the radius circle after first search, even with no results
      search: true,
      searchResults: searchResults.users,
      searchLocation: searchResults.location,
    });
  }

  const campusDatasList1 = ["Paris", "Lyon", "Marseille"];
  const campusDatasList2 = ["Toulouse", "Bordeaux", "Monaco"];
  const cursusDatasList = ["Fullstack", "DevOps", "Code for business"];
  const statusDatasList = [
    "#OPEN TO WORK",
    "#HIRING",
    "#PARTNER",
    "#JUST CURIOUS",
  ];
  const tagsDatasList = [
    "Frontend",
    "Backend",
    "Fullstack",
    "JavaScript",
    "AngularJS",
    "ReactJS",
    "VueJS",
    "TypeScript",
    "ReactNative",
    "Swift",
    "Kotlin",
    "Flutter",
    "BDD",
    "API",
    "Java",
    "Python",
    "PHP",
  ];
  const workDatasList = [
    "Développeur",
    "Product Owner",
    "Data Scientist",
    "DevOps",
    "Scrum Master",
  ];
  const workTypeDatasList = [
    "Entrepreneur",
    "En contrat",
    "Freelance",
    "En recherche",
  ];

  var displayValue = km;
  if (km === 100) {
    displayValue = "France entière";
  }
  useEffect(() => {
    if (props.searchResults.searchLocation.locationRequest) {
      setLocation(props.searchResults.searchLocation.locationRequest);
    }
  }, [props.searchResults.searchLocation.locationRequest]);

  return (
    <LinearGradient
      colors={colors}
      style={{ flex: 1 }}
      start={{ x: -1, y: 0 }}
      end={{ x: 1, y: 0.3 }}
    >
      <DrawerContentScrollView {...props}>
        <View style={{ alignItems: 'center' }}>
        <View style={styles.headerTitle}>
      <TextInput
      value = {location}
        style={styles.searchBar}
        placeholder="Type in city"
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        onChangeText={(value) => setLocation(value)}
        onSubmitEditing={({ nativeEvent: { text, eventCount, target } }) =>
          loadSearchResults()
        }
      >
       
        </TextInput>
        <FontAwesome
          style={styles.searchButton}
          name="search"
          size={16}
          color="white"
        />
    </View>
        <View style={[styles.contentView]}>
          <Slider
            value={filters.radius}
            onValueChange={setKm}
            maximumValue={100}
            minimumValue={10}
            step={5}
            allowTouchTrack
            trackStyle={{ height: 5, backgroundColor: "transparent" }}
            thumbStyle={{
              height: 20,
              width: 20,
              backgroundColor: "transparent",
            }}
            thumbProps={{
              children: (
                <Icon
                  name="circle"
                  type="font-awesome"
                  size={20}
                />
              ),
            }}
          />
          <Text style={{ color: "#FFFFFF" }}>
            Distance: {displayValue} km
          </Text>
        </View>
        </View>

        {/* //! 1ST SEGMENT */}
        <View style={[styles.RDContent, { backgroundColor: toggledStatus }]}>
          <ListItemAccordion
            containerStyle={{ backgroundColor: "transparent" }}
            isExpanded={expandedStatus}
            onPress={() => {
              setExpandedStatus(!expandedStatus);
              !expandedStatus
                ? setToggledStatus("rgba(255, 255, 255, 0.2)")
                : setToggledStatus("transparent");
            }}
            content={
              <>
                <ListItem.Content>
                  <ListItem.Title style={{ color: "#fff" }}>
                    Statut
                  </ListItem.Title>
                </ListItem.Content>
              </>
            }
          >
            <View
              style={{ flex: 1, color: "#ffffff", flexDirection: "column" }}
            >
              {/*//* DROPDOWN #1 - OPTION #2*/}
              {statusDatasList.map(function (status, i) {
                var checked = false;
                if (filters.status.find((e) => e === status)) {
                  checked = true;
                }
                return (
                  <View
                    key={i}
                    style={{
                      flexDirection: "column",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <View
                      style={[
                        styles.DDitem,
                        {
                          flexDirection: "row",
                          justifyContent: "space-between",
                        },
                      ]}
                    >
                      <Text style={styles.text}>{status}</Text>
                      <Switch
                        style={{ alignSelf: "flex-end" }}
                        value={checked}
                        color="#fff"
                        onValueChange={() => addFilters("status", status)}
                      />
                    </View>
                  </View>
                );
              })}
            </View>
          </ListItemAccordion>
        </View>
        <Divider style={styles.divider} />

        {/* //! 2ND SEGMENT */}
        <View
          style={[
            styles.RDContent,
            { backgroundColor: toggledCapsule, marginBottom: 0 },
          ]}
        >
          <ListItemAccordion
            containerStyle={{ backgroundColor: "transparent" }}
            isExpanded={expandedCapsule}
            onPress={() => {
              setExpandedCapsule(!expandedCapsule);
              !expandedCapsule
                ? setToggledCapsule("rgba(255, 255, 255, 0.2)")
                : setToggledCapsule("transparent");
            }}
            content={
              <>
                <ListItem.Content>
                  <ListItem.Title style={{ color: "#fff" }}>
                    La Capsule
                  </ListItem.Title>
                </ListItem.Content>
              </>
            }
          >
            <View
              style={{ flex: 1, color: "#ffffff", flexDirection: "column" }}
            >
              {/*//* DROPDOWN #1 - OPTION #1 */}
              <View style={[styles.DDitem, { flexDirection: "row" }]}>
                <Text style={styles.text}>Batch</Text>
                <TextInput
                  style={styles.input}
                  placeholder="#_ _"
                  onChangeText={(value) => setBatch(value)}
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                />
              </View>
              <Divider style={styles.divider} />
              {/*//* DROPDOWN #1 - OPTION #2*/}
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <View style={[styles.DDitem, { flexDirection: "row" }]}>
                  <Text style={styles.text}>Campus</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      width: "50%",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    {campusDatasList1.map(function (campus, i) {
                      var checked = false;
                      if (filters.campus.find((e) => e === campus)) {
                        checked = true;
                      }
                      return (
                        <View
                          key={i}
                          style={[
                            styles.DDitem,
                            {
                              flexDirection: "row",
                              justifyContent: "space-between",
                            },
                          ]}
                        >
                          <Text style={styles.text}>{campus}</Text>
                          <Switch
                            style={{ alignSelf: "flex-end" }}
                            value={checked}
                            color="#fff"
                            onValueChange={() => addFilters("campus", campus)}
                          />
                        </View>
                      );
                    })}
                  </View>
                  <View
                    style={{
                      width: "50%",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    {campusDatasList2.map(function (campus, i) {
                      var checked = false;
                      if (filters.campus.find((e) => e === campus)) {
                        checked = true;
                      }
                      return (
                        <View
                          key={i}
                          style={[
                            styles.DDitem,
                            {
                              flexDirection: "row",
                              justifyContent: "space-between",
                            },
                          ]}
                        >
                          <Text style={styles.text}>{campus}</Text>
                          <Switch
                            style={{ alignSelf: "flex-end" }}
                            value={checked}
                            color="#fff"
                            onValueChange={() => addFilters("campus", campus)}
                          />
                        </View>
                      );
                    })}
                  </View>
                </View>
                <Divider style={styles.divider} />
                <View style={[styles.DDitem, { flexDirection: "row" }]}>
                  <Text style={styles.text}>Cursus</Text>
                </View>
                <View style={{ flexDirection: "column" }}>
                  {cursusDatasList.map(function (cursus, i) {
                    var checked = false;
                    if (filters.cursus.find((e) => e === cursus)) {
                      checked = true;
                    }
                    return (
                      <View
                        key={i}
                        style={[
                          styles.DDitem,
                          {
                            flexDirection: "row",
                            justifyContent: "space-between",
                          },
                        ]}
                      >
                        <Text style={styles.text}>{cursus}</Text>
                        <Switch
                          style={{ alignSelf: "flex-end" }}
                          value={checked}
                          color="#fff"
                          onValueChange={() => addFilters("cursus", cursus)}
                        />
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>
          </ListItemAccordion>
        </View>
        <Divider style={styles.divider} />

        {/* //! 3RD SEGMENT */}
        <View style={[styles.RDContent, { backgroundColor: toggledTags }]}>
          <ListItemAccordion
            containerStyle={{ backgroundColor: "transparent" }}
            isExpanded={expandedTags}
            onPress={() => {
              setExpandedTags(!expandedTags);
              !expandedTags
                ? setToggledTags("rgba(255, 255, 255, 0.2)")
                : setToggledTags("transparent");
            }}
            content={
              <>
                <ListItem.Content>
                  <ListItem.Title style={{ color: "#fff" }}>
                    Stacks
                  </ListItem.Title>
                </ListItem.Content>
              </>
            }
          >
            <View
              style={{
                flex: 1,
                color: "#ffffff",
                flexDirection: "row",
                flexWrap: "wrap",
                paddingBottom: 10,
                paddingLeft: 10,
              }}
            >
              {/*//* DROPDOWN #1 - OPTION #2*/}
              {tagsDatasList.map(function (tag, i) {
                var color = "#ffffff";
                var status = "light";
                if (filters.tags.find((i) => i === tag)) {
                  color = "#0e0e66";
                  status = "white";
                }
                return (
                  <Badge
                    key={i}
                    value={tag}
                    onPress={() => addFilters("tags", tag)}
                    containerStyle={{ margin: 5 }}
                    status={status}
                    textStyle={{ color: color, fontSize: 13 }}
                    badgeStyle={{
                      borderColor: "#ffffff",
                      borderWidth: 1.1,
                      padding: 2,
                      height: 30,
                      borderRadius: 15,
                    }}
                  />
                );
              })}
            </View>
          </ListItemAccordion>
        </View>
        <Divider style={styles.divider} />

        {/* //! 4TH SEGMENT */}
        <View style={[styles.RDContent, { backgroundColor: toggledJobs }]}>
          <ListItemAccordion
            containerStyle={{ backgroundColor: "transparent" }}
            isExpanded={expandedJobs}
            onPress={() => {
              setExpandedJobs(!expandedJobs);
              !expandedJobs
                ? setToggledJobs("rgba(255, 255, 255, 0.2)")
                : setToggledJobs("transparent");
            }}
            content={
              <>
                <ListItem.Content>
                  <ListItem.Title style={{ color: "#fff" }}>Job</ListItem.Title>
                </ListItem.Content>
              </>
            }
          >
            <View
              style={{ flex: 1, color: "#ffffff", flexDirection: "column" }}
            >
              <View style={[styles.DDitem, { flexDirection: "row" }]}>
                <Text style={styles.text}>Poste</Text>
              </View>

              {workDatasList.map(function (work, i) {
                var checked = false;
                if (filters.work.find((e) => e === work)) {
                  checked = true;
                }
                return (
                  <View
                    key={i}
                    style={{
                      flexDirection: "column",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <View
                      style={[
                        styles.DDitem,
                        {
                          flexDirection: "row",
                          justifyContent: "space-between",
                        },
                      ]}
                    >
                      <Text style={styles.text}>{work}</Text>
                      <Switch
                        style={{ alignSelf: "flex-end" }}
                        value={checked}
                        color="#fff"
                        onValueChange={() => addFilters("work", work)}
                      />
                    </View>
                  </View>
                );
              })}
            </View>
            <Divider style={styles.divider} />

            <View style={[styles.DDitem, { flexDirection: "row" }]}>
              <Text style={styles.text}>Statut</Text>
            </View>

            {workTypeDatasList.map(function (workType, i) {
              var checked = false;
              if (filters.workType.find((e) => e === workType)) {
                checked = true;
              }
              return (
                <View
                  key={i}
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                  }}
                >
                  <View
                    style={[
                      styles.DDitem,
                      {
                        flexDirection: "row",
                        justifyContent: "space-between",
                      },
                    ]}
                  >
                    <Text style={styles.text}>{workType}</Text>
                    <Switch
                      style={{ alignSelf: "flex-end" }}
                      value={checked}
                      color="#fff"
                      onValueChange={() => addFilters("workType", workType)}
                    />
                  </View>
                </View>
              );
            })}
          </ListItemAccordion>
        </View>
      </DrawerContentScrollView>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={[styles.button, { width: "70%" }]}
          onPress={() => {
            loadSearchResults();
            props.navigation.toggleDrawer();
          }}
        >
          <Text style={{ fontSize: 20, color: "#7C4DFF" }}>Rechercher</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { width: "15%" }]}
          onPress={() => {
            resetFilters();
          }}
        >
          <Icon name="trash-o" type="font-awesome" color="#7C4DFF" size={20} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  RDContent: {
    flexGrow: 1,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 5,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: 3,
    width: 40,
    marginLeft: 5,
    padding: 5,
    textAlign: "center",
    color: "white",
  },
  DDitem: {
    flex: 1,
    height: 40,
    alignItems: "center",
    marginLeft: 15,
    marginRight: 15,
  },
  divider: {
    width: " 80%",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: "10%",
  },
  button: {
    backgroundColor: "white",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    height: 55,
    borderRadius: 5,
    marginRight: 0,
    margin: 15,
    marginRight: 0,
  },
  contentView: {
    width: "80%",
    justifyContent: "center",
    alignItems: "stretch",
  },
  verticalContent: {
    padding: 20,
    flex: 1,
    flexDirection: "row",
    height: 500,
    justifyContent: "center",
    alignItems: "stretch",
  },
  subHeader: {
    backgroundColor: "#2089dc",
    color: "white",
    textAlign: "center",
    paddingVertical: 5,
    marginBottom: 10,
  },
  text: { color: "rgba(255, 255, 255, 0.7)" },
  searchBar: {
    height: "100%",
    width: "80%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    color: "white",
    borderRadius: 50,
    paddingLeft: 15,
    paddingRight: 15,
  },
  headerTitle: {
    flexDirection: "row",
    paddingVertical: 20,
  },
  searchButton: {
    left: -25,
    top: 5,
  },
});

const mapStateToProps = (state) => {
  return {
    searchResults: state.searchResults,
    userDatas: state.userDatas,
    drawerStatus : state.drawerStatus,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    search: function (results) {
      dispatch({ type: "search", results: results });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomRightDrawerContent)
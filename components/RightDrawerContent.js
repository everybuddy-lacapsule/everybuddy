import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Divider, Switch, Badge, Slider, Icon } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { ListItem } from "@rneui/base";
import { ListItemAccordion } from "@rneui/base/dist/ListItem/ListItem.Accordion";

//* RIGHT DRAWER CONTENT
export default function CustomRightDrawerContent(props) {
  let colors = ["#FF1744", "#F94A56", "#7C4DFF"];

  // Etats du slider radius
  const [value, setValue] = useState(0);

  // Etats pour dérouler et afficher les différentes catégories
  const [expandedCapsule, setExpandedCapsule] = useState(false);
  const [expandedStatus, setExpandedStatus] = useState(true);
  const [expandedTags, setExpandedTags] = useState(false);
  const [expandedJobs, setExpandedJobs] = useState(false);
  const [toggledCapsule, setToggledCapsule] = useState();
  const [toggledStatus, setToggledStatus] = useState();
  const [toggledTags, setToggledTags] = useState();
  const [toggledJobs, setToggledJobs] = useState();

  // Etats à renvoyer au back pour Recherche avancée
  const [nbBatch, setNbBatch] = useState(1);
  const [location, setLocation] = useState("");
  const [radius, setRadius] = useState(5000);
  const [campusList, setCampusList] = useState([]);
  const [cursusList, setCursusList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [workList, setWorkList] = useState([]);
  const [workTypeList, setWorkTypeList] = useState([]);

  const campusDatasList1 = ["Paris", "Lyon", "Marseille"];
  const campusDatasList2 = ["Toulouse", "Bordeaux", "Monaco"];
  const cursusDatasList = ["FullStack", "DevOps", "Code for business"];
  const statusDatasList = [
    "#OPEN TO WORK",
    "#HIRING",
    "#PARTNER",
    "#JUST CURIOUS",
  ];
  const tagsDatasList = [
    "Frontend",
    "Backend",
    "FullStack",
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

  function addCampus(campus) {
    if (!campusList.find((e) => e === campus)) {
      setCampusList([...campusList, campus]);
    } else {
      setCampusList(campusList.filter((e) => e !== campus));
    }
  }

  function addCursus(cursus) {
    if (!cursusList.find((e) => e === cursus)) {
      setCursusList([...cursusList, cursus]);
    } else {
      setCursusList(cursusList.filter((e) => e !== cursus));
    }
  }

  function addStatus(status) {
    if (!statusList.find((e) => e === status)) {
      setStatusList([...statusList, status]);
    } else {
      setStatusList(statusList.filter((e) => e !== status));
    }
  }

  function addTag(tag) {
    if (!tagsList.find((e) => e === tag)) {
      setTagsList([...tagsList, tag]);
    } else {
      setTagsList(tagsList.filter((e) => e !== tag));
    }
  }

  function addWork(work) {
    if (!workList.find((e) => e === work)) {
      setWorkList([...workList, work]);
    } else {
      setWorkList(workList.filter((e) => e !== work));
    }
  }

  function addWorkType(workType) {
    if (!workTypeList.find((e) => e === workType)) {
      setWorkTypeList([...workTypeList, workType]);
    } else {
      setWorkTypeList(workTypeList.filter((e) => e !== workType));
    }
  }

  var displayValue = value;
  if (value === 300) {
    displayValue = "Monde";
  }

  console.log(tagsList);

  return (
    <LinearGradient
      colors={colors}
      style={{ flex: 1 }}
      start={{ x: -1, y: 0 }}
      end={{ x: 1, y: 0.3 }}
    >
      <DrawerContentScrollView {...props}>
        <View style={{ alignItems: 'center' }}>
        <View style={[styles.contentView]}>
          <Slider
            value={value}
            onValueChange={setValue}
            maximumValue={300}
            minimumValue={0}
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
                  name="map-pin"
                  type="font-awesome"
                  size={15}
                  reverse
                  containerStyle={{ bottom: 20, right: 20 }}
                />
              ),
            }}
          />
          <Text style={{ paddingTop: 20, color: "#FFFFFF" }}>
            Km: {displayValue}
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
                if (statusList.find((e) => e === status)) {
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
                        onValueChange={() => addStatus(status)}
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
                      if (campusList.find((e) => e === campus)) {
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
                            onValueChange={() => addCampus(campus)}
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
                      if (campusList.find((e) => e === campus)) {
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
                            onValueChange={() => addCampus(campus)}
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
                    if (cursusList.find((e) => e === cursus)) {
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
                          onValueChange={() => addCursus(cursus)}
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
                if (tagsList.find((i) => i === tag)) {
                  color = "#0e0e66";
                  status = "white";
                }
                return (
                  <Badge
                    key={i}
                    value={tag}
                    onPress={() => addTag(tag)}
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
                if (workList.find((e) => e === work)) {
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
                        onValueChange={() => addWork(work)}
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
              if (workTypeList.find((e) => e === workType)) {
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
                      onValueChange={() => addWorkType(workType)}
                    />
                  </View>
                </View>
              );
            })}
          </ListItemAccordion>
        </View>
      </DrawerContentScrollView>
      <TouchableOpacity style={styles.button}>
        <Text style={{ fontSize: 20, color: "#7C4DFF" }}>Rechercher</Text>
      </TouchableOpacity>
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
    width: "90%",
    height: 55,
    borderRadius: 5,
    margin: 15,
  },
  contentView: {
    padding: 20,
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
});

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Divider, Switch, CheckBox } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { ListItem } from "@rneui/base";
import { ListItemAccordion } from "@rneui/base/dist/ListItem/ListItem.Accordion";

//* RIGHT DRAWER CONTENT
export default function CustomRightDrawerContent(props) {
  let colors = ["#FF1744", "#F94A56", "#7C4DFF"];
  const [expanded, setExpanded] = useState(false);
  const [expanded1, setExpanded1] = useState(false);
  const [toggled, setToggled] = useState();
  const [toggled1, setToggled1] = useState();
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);

  // const toggleSwitch = () => {
  // 	setChecked(!checked);
  // };

  return (
    <LinearGradient
      colors={colors}
      style={{ flex: 1 }}
      start={{ x: -1, y: 0 }}
      end={{ x: 1, y: 0.3 }}
    >
      <DrawerContentScrollView {...props}>
        <View
          style={[
            styles.RDContent,
            { backgroundColor: toggled, marginBottom: 0 },
          ]}
        >
          <ListItemAccordion
            containerStyle={{ backgroundColor: "transparent" }}
            isExpanded={expanded}
            onPress={() => {
              setExpanded(!expanded);
              !expanded
                ? setToggled("rgba(255, 255, 255, 0.2)")
                : setToggled("transparent");
            }}
            content={
              <>
                {/*
                                //! 1ND SEGMENT
								//* DROPDOWN #1 - TITLE 
								// <Image source={require('../assetss/caps.png')} style={{ width:24, height:24, marginRight: 10}} color='black' /> 
								*/}
                <ListItem.Content>
                  <ListItem.Title style={{ color: "#fff" }}>
                    Parcours @ La Capsule
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
                    <View
                      style={[
                        styles.DDitem,
                        {
                          flexDirection: "row",
                          justifyContent: "space-between",
                        },
                      ]}
                    >
                      <Text style={styles.text}>Paris</Text>
                      <Switch
                        style={{ alignSelf: "center" }}
                        value={checked1}
                        color="#fff"
                        onValueChange={(value) => setChecked1(value)}
                      />
                    </View>
                    <View
                      style={[
                        styles.DDitem,
                        {
                          flexDirection: "row",
                          justifyContent: "space-between",
                        },
                      ]}
                    >
                      <Text style={styles.text}>Bordeaux</Text>
                      <Switch
                        style={{ alignSelf: "center" }}
                        value={checked2}
                        color="#fff"
                        onValueChange={(value) => setChecked2(value)}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      width: "50%",
                      flexDirection: "column",
                      justifyContent: "space-between",
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
                      <Text style={styles.text}>Lyon</Text>
                      <Switch
                        style={{ alignSelf: "center" }}
                        value={checked3}
                        color="#fff"
                        onValueChange={(value) => setChecked3(value)}
                      />
                    </View>
                    <View
                      style={[
                        styles.DDitem,
                        {
                          flexDirection: "row",
                          justifyContent: "space-between",
                        },
                      ]}
                    >
                      <Text style={styles.text}>Marseille</Text>
                      <Switch
                        style={{ alignSelf: "center" }}
                        value={checked4}
                        color="#fff"
                        onValueChange={(value) => setChecked4(value)}
                      />
                    </View>
                  </View>
                </View>
                <Divider style={styles.divider} />
                <View style={[styles.DDitem, { flexDirection: "row" }]}>
                  <Text style={styles.text}>Cursus</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      width: "50%",
                      flexDirection: "column",
                      justifyContent: "space-between",
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
                      <Text style={styles.text}>FullStack</Text>
                      <CheckBox
                        containerStyle={{
                          backgroundColor: "transparent",
                          height: "100%",
                        }}
                        checkedColor="#fff"
                        uncheckedColor="rgba(255, 255, 255, 0.5)"
                        size={20}
                        checked={check1}
                        onPress={() => setCheck1(!check1)}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      width: "50%",
                      flexDirection: "column",
                      justifyContent: "space-between",
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
                      <Text style={styles.text}>DevOps</Text>
                      <CheckBox
                        containerStyle={{
                          backgroundColor: "transparent",
                          height: "100%",
                        }}
                        checkedColor="#fff"
                        uncheckedColor="rgba(255, 255, 255, 0.5)"
                        size={20}
                        checked={check2}
                        onPress={() => setCheck2(!check2)}
                      />
                    </View>
                  </View>
                </View>
                <View
                  style={[
                    styles.DDitem,
                    {
                      flexDirection: "row",
                      justifyContent: "space-between",
                    },
                  ]}
                >
                  <Text style={styles.text}>Code for Business</Text>
                  <CheckBox
                    containerStyle={{
                      backgroundColor: "transparent",
                      height: "100%",
                    }}
                    checkedColor="#fff"
                    uncheckedColor="rgba(255, 255, 255, 0.5)"
                    size={20}
                    checked={check3}
                    onPress={() => setCheck3(!check3)}
                  />
                </View>
              </View>
            </View>
          </ListItemAccordion>
        </View>

        {/* //! 1st DIVIDER */}
        <Divider style={styles.divider} />

        {/* //! 2ND SEGMENT */}
        <View style={styles.RDContent}>
          <ListItem.Content style={styles.RDContent}>
            <ListItem.Title style={{ color: "#fff" }}>
              Statut Professionnel
            </ListItem.Title>
          </ListItem.Content>
        </View>

        <Divider style={styles.divider} />
        {/* //! 3RD SEGMENT */}
        {/* <View style={[styles.RDContent, { backgroundColor: toggled1 }]}>
					<ListItemAccordion
						containerStyle={{ backgroundColor: "transparent" }}
						isExpanded={expanded1}
						onPress={() => {
							setExpanded1(!expanded1);
							!expanded1
								? setToggled1("rgba(255, 255, 255, 0.2)")
								: setToggled1("transparent");
						}}
						content={
							<> */}
        {/*
								//* DROPDOWN #1 - TITLE 
								// <Image source={require('../assetss/caps.png')} style={{ width:24, height:24, marginRight: 10}} color='black' /> 
								*/}
        {/* <ListItem.Content>
									<ListItem.Title style={{ color: "#fff" }}>
										Parcours @ La Capsule
									</ListItem.Title>
								</ListItem.Content>
							</>
						}
					>
						<View
							style={{ flex: 1, color: "#ffffff", flexDirection: "column" }}
						>
							{/*/
        /* DROPDOWN #1 - OPTION #1 */}
        {/* <View style={[styles.DDitem, { flexDirection: "row" }]}>
								<Text style={styles.text}>Batch</Text>
								<TextInput
									style={styles.input}
									placeholder="#_ _"
									placeholderTextColor="rgba(255, 255, 255, 0.5)"
								/>
							</View>
							<Divider style={styles.divider} /> */}
        {/*//* DROPDOWN #1 - OPTION #2*/}
        {/* <View
								style={{
									flexDirection: "column",
									justifyContent: "space-evenly",
								}}
							>
								<View style={[styles.DDitem, { flexDirection: "row" }]}>
									<Text style={styles.text}>Statut</Text>
								</View>
								<View
									style={[
										styles.DDitem,
										{ flexDirection: "row", justifyContent: "space-between" },
									]}
								>
									<Text style={styles.text}>#OPEN TO WORK</Text>
									<Switch
										style={{ alignSelf: "flex-end" }}
										value={checked}
										color="#fff"
										onValueChange={(value) => setChecked(value)}
									/>
								</View>
								<View
									style={[
										styles.DDitem,
										{ flexDirection: "row", justifyContent: "space-between" },
									]}
								>
									<Text style={styles.text}>#HIRING</Text>
									<Switch
										style={{ alignSelf: "flex-end" }}
										value={checked}
										color="#fff"
										onValueChange={(value) => setChecked(value)}
									/>
								</View>
								<View
									style={[
										styles.DDitem,
										{ flexDirection: "row", justifyContent: "space-between" },
									]}
								>
									<Text style={styles.text}>#PARTNER</Text>
									<Switch
										style={{ alignSelf: "flex-end" }}
										value={checked}
										color="#fff"
										onValueChange={(value) => setChecked(value)}
									/>
								</View>
							</View>
						</View>
					</ListItemAccordion> 
				</View>*/}
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
  text: { color: "rgba(255, 255, 255, 0.7)" },
});

//SCREENS
import LoginScreen from "./screens/LoginScreen";
import MapScreen from "./screens/MapScreen";
import NewsScreen from "./screens/NewsScreen";
import MessengerScreen from "./screens/MessengerScreen";
import MyProfileScreen from "./screens/MyProfileScreen";
import ProfileScreen from "./screens/ProfileScreen";
import BuddiesScreen from "./screens/BuddiesScreen";
import SearchHeader from './screens/SearchHeader';



import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  StyleSheet,
  TouchableOpacity,
  LogBox,
  View,
  Input,
} from "react-native";
LogBox.ignoreAllLogs();



// ICON LIBRARIES
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

// NAV FACTORISATIONS
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// BOTTOM TABS
const TabsNavigator = function () {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === "Map") {
            iconName = "map-marked-alt";
          } else if (route.name === "Discussions") {
            iconName = "chatbubbles";
          } else if (route.name === "News") {
            iconName = "newspaper";
          }
          if (iconName == "map-marked-alt") {
            return <FontAwesome5 name={iconName} size={24} color={color} />;
          }
          if (iconName == "newspaper" || iconName == "chatbubbles") {
            return <Ionicons name={iconName} size={24} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        showLabel: false,
        style: {
          height: 40,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          // borderRadius: 10,
          borderTopWidth: 0,
          // overflow: "hidden",
        },
        activeBackgroundColor: "#0E0E66",
        inactiveBackgroundColor: "#0E0E66",
        activeTintColor: "#FFFFFF",
        inactiveTintColor: "#8686b3",
      }}
    >
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerStyle: styles.headers,
          headerTintColor: "#fff",
          headerTitleStyle: { alignSelf: "flex-start" },
          headerLeft: () => (
            <TouchableOpacity style={styles.left}>
              <Feather name="menu" size={24} color="white" />
            </TouchableOpacity>
          ),

          headerRight: () => (
            <TouchableOpacity style={styles.right}>
              <Ionicons name="options" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen name="Discussions" component={MessengerScreen} />
      <Tab.Screen name="News" component={NewsScreen} />
    </Tab.Navigator>
  );
};

// APP ----------------------------------------------------------------
export default function App() {
  return (
    // <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: styles.headers,
          headerTintColor: "#fff",
          headerTitleStyle: { alignSelf: "flex-start" },
          headerLeft: () => (
            <TouchableOpacity style={styles.left}>
              <Feather name="menu" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity style={styles.right}>
              <Ionicons name="options" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: "S'identifier",
            headerStyle: styles.headers,
            headerTintColor: "#fff",
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="Buddies"
          component={BuddiesScreen}
          options={{
            title: "Buddies",
          }}
        ></Stack.Screen>
        <Stack.Screen name="Results" component={ProfileScreen} />
        <Stack.Screen name="Profile" component={MyProfileScreen} />
        <Stack.Screen
          name="TabsNavigator"
          component={TabsNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    // </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  headers: {
    backgroundColor: "#0E0E66",
    height: 90,
  },
  left: {
    marginLeft: 20,
  },
  right: {
    marginRight: 20,
  },
});

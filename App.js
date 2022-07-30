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
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

LogBox.ignoreAllLogs();



// ICON LIBRARIES
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

// NAV FACTORISATIONS
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


// TABS
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
              <Ionicons name="options" size={24} color="white" 
            //TODO onPress={() => props.navigation.toggleDrawer()}
             />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen name="Discussions" component={MessengerScreen} />
      <Tab.Screen name="News" component={NewsScreen} />
    </Tab.Navigator>
  );
};

//! DRAWERS
// function CustomDrawerContent(props) {
//   return (
//     <DrawerContentScrollView {...props}>
//       <DrawerItemList {...props} />
//       <DrawerItem
//         label="Close drawer"
//         onPress={() => props.navigation.closeDrawer()}
//       />
//       <DrawerItem
//         label="Toggle drawer"
//         onPress={() => props.navigation.toggleDrawer()}
//       />
//     </DrawerContentScrollView>
//   );
// }

// const MyDrawer = function () {
//   return (
//     <Drawer.Navigator
//       useLegacyImplementation
//       drawerContent={(props) => <CustomDrawerContent {...props} />}
//     >
//       <Drawer.Screen name="Buddies" component={BuddiesScreen} />
//       <Drawer.Screen name="MyProfile" component={{MyProfileScreen}} />
//     </Drawer.Navigator>
//   );
// }

// APP ----------------------------------------------------------------
export default function App(props) {
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
              <Feather name="menu" size={24} color="white" onPress={() => props.navigation.toggleDrawer()}
/>
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
          name="TabsNavigator"
          component={TabsNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyDrawer"
          component={MyDrawer}
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

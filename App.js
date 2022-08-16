import React, { useState, useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { LogBox, StatusBar, Text, View, Button, Platform } from "react-native";
import StackNavigator from "./navigation/StackNavigator";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import userDatas from "./reducers/userDatas";
import userEmail from "./reducers/userEmail";
import { searchResults } from "./reducers/searchResults";
import { discussionInfos } from "./reducers/discussionInfos";
import drawerStatus from "./reducers/drawerStatus";
import leftDrawerStatus from "./reducers/leftDrawerStatus";
import alumniIDSearch from "./reducers/alumniIDSearch";
import editionMode from "./reducers/editionMode";
import buddiesList from "./reducers/buddiesList";
//import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

LogBox.ignoreAllLogs();

const store = createStore(
  combineReducers({
    userDatas,
    userEmail,
    searchResults,
    discussionInfos,
    drawerStatus,
    leftDrawerStatus,
    alumniIDSearch,
    editionMode,
    buddiesList,
  })
);

// Settings for the notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// APP ----------------------------------------------------------------
export default function App() {
  const notificationListener = useRef();
/*
  useEffect(() => {
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
    };
  }, []);
*/
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar backgroundColor="#8686b3" barStyle="default" />
        <StackNavigator />
      </NavigationContainer>
    </Provider>
  );
}

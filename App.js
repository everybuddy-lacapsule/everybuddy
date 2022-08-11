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
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import * as Permissions from 'expo-permissions';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

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

// APP ----------------------------------------------------------------
export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }
  

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar backgroundColor="#8686b3" barStyle="default" />
        <StackNavigator />
      </NavigationContainer>
    </Provider>
  );
}

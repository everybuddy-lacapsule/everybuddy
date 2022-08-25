import axios from "axios";
import { REACT_APP_DEV_MODE } from "@env";

const EXPO_SERVER_URL = "https://exp.host/--/api/v2/push/send";
//const TOKEN_SERVER_URL = 'https://exp.host/'; // for stocking the token

// Async Function for sending a notification to expo server
export const sendPushNotification = async (expoPushToken, title, body) => {
  // create a message type
  const message = {
    to: expoPushToken,
    sound: "default",
    title: title,
    body: body,
    data: {
      /* someData: 'goes here' */
    },
  };

  // send message to expo server
  await axios.post(EXPO_SERVER_URL, message);

  alert("Ta bière envoyée");
};

/************************************************/
/* TODO : Need to implement a server for an async call */
/************************************************/

// send token to server and receive a code
export const submitToken = async (alumniID, deviceToken) => {
  const body = {
    userID: alumniID,
    deviceToken: deviceToken,
  }
  const response = await fetch(`${REACT_APP_DEV_MODE}/users/deviceToken`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return response.json();
};

// get token from server by code
export const getToken = async (alumniID) => {
    const response = await fetch(`${REACT_APP_DEV_MODE}/users/deviceToken?userID=${alumniID}`);
    console.log('response', response);
  return response.json();
};

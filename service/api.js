import axios from 'axios';
import { EXPO_TOKEN_TEST } from '@env';

const EXPO_SERVER_URL = 'https://exp.host/--/api/v2/push/send';
//const TOKEN_SERVER_URL = 'https://exp.host/'; // for stocking the token

// Async Function for sending a notification to expo server
export const sendPushNotification = async (expoPushToken, title, body) => {
    // create a message type
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: title,
        body: body,
        data: {/* someData: 'goes here' */ },
    }

    // send message to expo server
    await axios.post(EXPO_SERVER_URL, message);

    alert('Ta bière envoyée');
};

/************************************************/
/* TODO : Need to implement a server for an async call */
/************************************************/

// send token to server and receive a code
export const submitToken = async (token) => {
    const rand = Math.random().toString().substr(2, 4);
    return {
        code: rand,
        token: '',
    };
};

// get token from server by code
export const getToken = async (code) => {
    return {
        code: code,
        token: EXPO_TOKEN_TEST,
    };
};
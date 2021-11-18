import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
import { UserType } from "./model/Users";
import axios from 'axios';

import { config } from "./config";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  };

/*/
firebase.initializeApp(firebaseConfig);
/*/
// firebase.analytics();

export const auth =  Object();
export const firestore = Object();
export const functions = Object();
export const storage = Object();

const provider = Object();
export const signInWithGoogle = () => {
  return;
};

interface userData {
  email: string,
  name: string,
  type: UserType,
  password: string,
  phoneNumber: string
};

export const generateUserDocument = async (data?: userData) => {
  if (!data) return;
  const { email, name, type, password, phoneNumber } = data;
  try {
    const res = await axios.post(
      config.apiUrl + '/api/user/register', {
        email,
        username: name,
        type: type.type,
        phoneNumber,
        password
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error creating user document", error);
  }
};

export const getUserDocument = async (user: any) => {
  if (!user) return null;
  const token = await user.getIdToken();
  try {
    const res = await axios.get(
      config.apiUrl + '/api/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

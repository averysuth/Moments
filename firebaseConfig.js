import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAfE1Q2YiRpOiNFJFDcUbrs1aHDnQZNzIY",
  authDomain: "moments-8a4b9.firebaseapp.com",
  projectId: "moments-8a4b9",
  storageBucket: "moments-8a4b9.appspot.com",
  messagingSenderId: "537440472449",
  appId: "1:537440472449:web:fb67d953f97d45052a2c80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)
export const db = getFirestore(app)
//export const auth = getAuth(app)
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
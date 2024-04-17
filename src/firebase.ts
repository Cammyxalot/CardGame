// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCQi1UgqPuYXerB5zHRNxLzmpYY0OqnOH4",
  authDomain: "cardgame-2f39d.firebaseapp.com",
  projectId: "cardgame-2f39d",
  storageBucket: "cardgame-2f39d.appspot.com",
  messagingSenderId: "311974005999",
  appId: "1:311974005999:web:59c934d8cf92aca6291f1a",
  measurementId: "G-HX4JY8BDDM"
};

// Initialize Firebase
// const analytics = getAnalytics(app);
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

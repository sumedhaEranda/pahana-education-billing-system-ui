// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwBPffJ_izCwZilGqVBmm1vjarhoZRTF4",
  authDomain: "skcompanysystem.firebaseapp.com",
  projectId: "pahanaeducation-23555",
  storageBucket: "skcompanysystem.appspot.com",
  messagingSenderId: "356830896619",
  appId: "1:356830896619:web:1f9c9db2a1c68fc87ef9ae",
  measurementId: "G-QYZ4D92LQF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

export { auth };
export default app;

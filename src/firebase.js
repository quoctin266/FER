// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWzYZ9uwt8Z536Mfa7xzQxbbgSebxMhRM",
  authDomain: "login-e63bc.firebaseapp.com",
  projectId: "login-e63bc",
  storageBucket: "login-e63bc.appspot.com",
  messagingSenderId: "1086876506406",
  appId: "1:1086876506406:web:88ce684065d84e2ded89e7",
  measurementId: "G-FHXPEC09T2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

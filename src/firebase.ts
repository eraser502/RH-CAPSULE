// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useState } from "react";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvOwEhc2h1C4FlXbMx6boUw8nscenxE7Y",
  authDomain: "rh-capsule.firebaseapp.com",
  projectId: "rh-capsule",
  storageBucket: "rh-capsule.appspot.com",
  messagingSenderId: "137559698606",
  appId: "1:137559698606:web:f578dc77794744c462513f",
  measurementId: "G-MR05SP6T5C"
};

// Initialize Firebase
export const app:any = initializeApp(firebaseConfig);
export const auth:any = getAuth();
export { createUserWithEmailAndPassword };


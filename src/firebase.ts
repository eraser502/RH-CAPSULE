// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";
import { collection, getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app"
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
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
firebase.initializeApp(firebaseConfig);
 
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth:any = getAuth(app)
export const functions = getFunctions(app)
export const storage = getStorage(app);

export const firebaseInstance = firebase;
// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
export { firestore };


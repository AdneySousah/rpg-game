import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACPswyWzA_PvpGeuWZFB9c4TM_YxK62Hk",
  authDomain: "rpj-project-faf89.firebaseapp.com",
  projectId: "rpj-project-faf89",
  storageBucket: "rpj-project-faf89.firebasestorage.app",
  messagingSenderId: "203171671075",
  appId: "1:203171671075:web:2cb83b6124f6d222575596",
  measurementId: "G-LQDKXHLER6"
};

const firebaseApp = initializeApp(firebaseConfig)

const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)

export {auth, db}
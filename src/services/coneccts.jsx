import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "ApikeyFirebase",
  authDomain: "AuthDomain",
  projectId: "ProjectID",
  storageBucket: "StorageBucket",
  messagingSenderId: "MessaginSenderId",
  appId: "AppId",
  measurementId: "MeasurementID"
};

const firebaseApp = initializeApp(firebaseConfig)

const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)

export {auth, db}
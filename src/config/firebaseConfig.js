import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBW9MsDZNSxVxo8PXlJiO7nvVLMWrr-k6U",
  authDomain: "sorabel-catalog.firebaseapp.com",
  databaseURL: "https://sorabel-catalog.firebaseio.com",
  projectId: "sorabel-catalog",
  storageBucket: "sorabel-catalog.appspot.com",
  messagingSenderId: "329146348562"
};

firebase.initializeApp(config);
firebase.firestore()
// .settings({ timestampsInSnapshots: true });

export default firebase;

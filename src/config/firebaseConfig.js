import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyBW9MsDZNSxVxo8PXlJiO7nvVLMWrr-k6U",
  authDomain: "sorabel-catalog.firebaseapp.com",
  databaseURL: "https://sorabel-catalog.firebaseio.com",
  projectId: "sorabel-catalog",
  storageBucket: "sorabel-catalog.appspot.com",
  messagingSenderId: "329146348562"
};

firebase.initializeApp(config);
export const storage = firebase.storage();
firebase.firestore();
// .settings({ timestampsInSnapshots: true });
export default firebase;

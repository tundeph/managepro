import firebase from "firebase"
import "firebase/firestore"
import "firebase/auth"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjPE2HM3XhzlpL3bkqv_8ofzAv6zGdusA",
  authDomain: "managepro-67d05.firebaseapp.com",
  projectId: "managepro-67d05",
  storageBucket: "managepro-67d05.appspot.com",
  messagingSenderId: "681461085709",
  appId: "1:681461085709:web:2a4dca652badb53e75c744",
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

//init firestore
const manageproDb = firebase.firestore()

//init auth
const manageproAuth = firebase.auth()

//timestamp
const timestamp = firebase.firestore.Timestamp

export { manageproDb, manageproAuth, timestamp }

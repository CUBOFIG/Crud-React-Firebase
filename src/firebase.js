import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyD8eNmHZ_d-oz0EcVDyTtYSPlzAjGVZLVM",
  authDomain: "fb-crud-react-3cea1.firebaseapp.com",
  projectId: "fb-crud-react-3cea1",
  storageBucket: "fb-crud-react-3cea1.appspot.com",
  messagingSenderId: "615282154725",
  appId: "1:615282154725:web:624118a18684a967fd480c"
};

const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();

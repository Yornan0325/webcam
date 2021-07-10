import firebase from "firebase/app";
 
 //Autentificacion
// import 'firebase/auth';

import "firebase/analytics";

//Almacenar datos
// import "firebase/firestore";

//Almacenar Imagen
import 'firebase/storage'
 
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChgo1EwwsSRAUb4l7mVSHvi0oF9Lr79eo",
  authDomain: "webapp-yornan.firebaseapp.com",
  projectId: "webapp-yornan",
  storageBucket: "webapp-yornan.appspot.com",
  messagingSenderId: "815057235184",
  appId: "1:815057235184:web:c4f680ceee145fd5456635",
  measurementId: "G-RBRQYZH7N0"
};

// Initialize Firebase
let instance;
export default function getFirebases() {
  if (typeof window !== "undefined") {
    if (instance) return instance;
    instance = firebase.initializeApp(firebaseConfig);
    return instance;
  }
  return null;
}


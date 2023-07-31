import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBj57zwJja5gEWWNs3JT9I6LqyTcF1OLDk",
  authDomain: "fir-login-5bf8c.firebaseapp.com",
  projectId: "fir-login-5bf8c",
  storageBucket: "fir-login-5bf8c.appspot.com",
  messagingSenderId: "29975446276",
  appId: "1:29975446276:web:bac0686861527ececa4651"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();
export {app,auth};
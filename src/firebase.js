// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore,doc,setDoc} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApYD2s_DgDhhV8tu0gkL5DyfFYAiwRuw4",
  authDomain: "personal-finance-tracker-68fd5.firebaseapp.com",
  projectId: "personal-finance-tracker-68fd5",
  storageBucket: "personal-finance-tracker-68fd5.appspot.com",
  messagingSenderId: "1022642227164",
  appId: "1:1022642227164:web:dc2504668c165e4ff2b119",
  measurementId: "G-47K4EEDP4P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirestore(app);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();

export {db,auth,provider,doc,setDoc};
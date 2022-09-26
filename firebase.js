// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore,deleteDoc} from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBL6RQzNv3U0XbWHGvYX2BwqsCGOuP8Fmk",
  authDomain: "codeomit.firebaseapp.com",
  projectId: "codeomit",
  storageBucket: "codeomit.appspot.com",
  messagingSenderId: "2895920485",
  appId: "1:2895920485:web:9abe9cebe94d5cfef6b58c",
  measurementId: "G-5E8RYVJGWZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore();
const storage = getStorage();
const auth=getAuth(app);
export{db,storage,auth};

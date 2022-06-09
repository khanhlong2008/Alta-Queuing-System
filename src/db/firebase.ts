import { initializeApp } from "firebase/app" ;   
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsEdElH7oylfsd-L0JhVOc7aIbOGDwF_A",
  authDomain: "queuing-system-2359b.firebaseapp.com",
  // databaseURL: "https://queuing-system-2359b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "queuing-system-2359b",
  storageBucket: "queuing-system-2359b.appspot.com",
  messagingSenderId: "62191979797",
  appId: "1:62191979797:web:1a679b024acc516d1a2d1c",
  measurementId: "G-KSVT1NP786"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db
export const dbFileStorage = getStorage()
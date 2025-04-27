import { initializeApp } from "firebase/app";
import { collection, addDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmlQk5Sjvl_yO8s3VRrxNMW7a_NVxfANI",
  authDomain: "bloom-watch.firebaseapp.com",
  projectId: "bloom-watch",
  storageBucket: "bloom-watch.firebasestorage.app",
  messagingSenderId: "396532464613",
  appId: "1:396532464613:web:2f3de876f15f7cf0c70d0c",
  measurementId: "G-WHP4SQBTRW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
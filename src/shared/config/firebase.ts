// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCdDPeMKUcHTVxJAzCBNkMB4tlkTHhWp4",
  authDomain: "banka-ff77e.firebaseapp.com",
  projectId: "banka-ff77e",
  storageBucket: "banka-ff77e.firebasestorage.app",
  messagingSenderId: "932270444142",
  appId: "1:932270444142:web:1c46182ecf3698b998a07f",
  measurementId: "G-JNHG60WCVE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export { auth, googleProvider, db };

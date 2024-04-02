import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDdYTscIPOOUJqvDIq1KC3qIOnXlvMLb2g",
  authDomain: "influyst-283ff.firebaseapp.com",
  projectId: "influyst-283ff",
  storageBucket: "influyst-283ff.appspot.com",
  messagingSenderId: "1020141181358",
  appId: "1:1020141181358:web:538375614344acba0b903f",
  measurementId: "G-4SGK4VBYD7"
};

// Initialize Firebase
let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDrwgrl17LPIwZ0BNPVEhhcnIXKUCb6QRk",
  authDomain: "e-zinemh.firebaseapp.com",
  databaseURL: "https://e-zinemh-default-rtdb.firebaseio.com",
  projectId: "e-zinemh",
  storageBucket: "e-zinemh.appspot.com",
  messagingSenderId: "917427413900",
  appId: "1:917427413900:web:1c03806173a2d4b1a32ca9",
  measurementId: "G-BTYG2DJD6W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

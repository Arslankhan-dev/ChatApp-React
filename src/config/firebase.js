// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA641ylyc4yJewogDVcNmrE2qWnLH92VSw",
  authDomain: "chatapp-5bac4.firebaseapp.com",
  projectId: "chatapp-5bac4",
  storageBucket: "chatapp-5bac4.appspot.com",
  messagingSenderId: "341621310764",
  appId: "1:341621310764:web:49288effc41eaa392e1889",
  measurementId: "G-LVRWQBJJVP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app
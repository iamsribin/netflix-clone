// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDR9DgIHabsgSns9ZsPR8vBklwBWMMN3rE",
//   authDomain: "netflix-clone-2fe32.firebaseapp.com",
//   projectId: "netflix-clone-2fe32",
//   storageBucket: "netflix-clone-2fe32.appspot.com",
//   messagingSenderId: "165672099571",
//   appId: "1:165672099571:web:10c00800a810c9f879a186",
//   measurementId: "G-MLWVR0LG65"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDR9DgIHabsgSns9ZsPR8vBklwBWMMN3rE",
  authDomain: "netflix-clone-2fe32.firebaseapp.com",
  projectId: "netflix-clone-2fe32",
  storageBucket: "netflix-clone-2fe32.appspot.com",
  messagingSenderId: "165672099571",
  appId: "1:165672099571:web:10c00800a810c9f879a186",
  measurementId: "G-MLWVR0LG65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); 

export { app, auth }; 

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChq1Q29GYiMQJBMMBHR46mmiQ9OFfxmOA",
  authDomain: "express-app-b8221.firebaseapp.com",
  projectId: "express-app-b8221",
  storageBucket: "express-app-b8221.appspot.com",
  messagingSenderId: "392601484936",
  appId: "1:392601484936:web:2502b3482fc89c2d59a93d",
  measurementId: "G-XPEJTRF6VD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const storage = getFirestore(app);
const photoStorage = getStorage(app);

export { auth, app, storage, photoStorage };

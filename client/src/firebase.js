// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-8a028.firebaseapp.com",
  projectId: "mern-blog-8a028",
  storageBucket: "mern-blog-8a028.appspot.com",
  messagingSenderId: "480617393310",
  appId: "1:480617393310:web:ed6a6f7e40b30df40edf8f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

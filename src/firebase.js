// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCVjZEJ95NZ4gOSe5bgEmrpIYQmZtXNmqw",
    authDomain: "smartfinance-3071f.firebaseapp.com",
    projectId: "smartfinance-3071f",
    storageBucket: "smartfinance-3071f.appspot.com",
    messagingSenderId: "582183466341",
    appId: "1:582183466341:web:a96817db44fa8beb695d8c",
    measurementId: "G-PP79TW75YF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
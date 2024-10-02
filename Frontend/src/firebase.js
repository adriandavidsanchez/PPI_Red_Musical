// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBKHSKLOq_TGhzYDx9-JcP-ZMItk-IYbRY",
    authDomain: "melodydatabase.firebaseapp.com",
    projectId: "melodydatabase",
    storageBucket: "melodydatabase.appspot.com",
    messagingSenderId: "359955636976",
    appId: "1:359955636976:web:68b5433ef45a11b06e9835"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Obtén una instancia de Firebase Storage
const storage = getStorage(app);

export { storage };

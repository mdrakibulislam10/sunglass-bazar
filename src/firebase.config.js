// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAybCHmusnqgMCHs_TNbNe7BuMMSc_0A9o",
    authDomain: "sunglass-bazar.firebaseapp.com",
    projectId: "sunglass-bazar",
    storageBucket: "sunglass-bazar.appspot.com",
    messagingSenderId: "738374295135",
    appId: "1:738374295135:web:f0fe764e39c40ef71b05ea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
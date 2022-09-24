import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCtm-DWVs9EygXpDGmRpXDLWEOS8jRCPEk",
    authDomain: "dhivia-cantik.firebaseapp.com",
    projectId: "dhivia-cantik",
    storageBucket: "dhivia-cantik.appspot.com",
    messagingSenderId: "568282908194",
    appId: "1:568282908194:web:e49e8a9d8c608531fb2c7b",
    measurementId: "G-3XCC4WD0PP",
    databaseURL: "https://dhivia-cantik-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getDatabase(firebaseApp);
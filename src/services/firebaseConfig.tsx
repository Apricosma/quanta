import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7vEDwFTA1xYPZfdf29noj48jpV1f7xuI",
  authDomain: "quanta-8e1c0.firebaseapp.com",
  projectId: "quanta-8e1c0",
  storageBucket: "quanta-8e1c0.appspot.com",
  messagingSenderId: "787617762480",
  appId: "1:787617762480:web:c02279bc27d85731b13f75",
  measurementId: "G-7D0G0SHDJC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const firestore = getFirestore(app);
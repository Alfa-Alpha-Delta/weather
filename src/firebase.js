// Import the functions you need from the SDKs you need

import { getMessaging } from "firebase/messaging";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIkTNygkdOYo5vyFdNAfKupjUTHTPUajI",
  authDomain: "notificasion-push.firebaseapp.com",
  projectId: "notificasion-push",
  storageBucket: "notificasion-push.appspot.com",
  messagingSenderId: "986314487966",
  appId: "1:986314487966:web:f33bb7e32fe165b351e38f"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app)

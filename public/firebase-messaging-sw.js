importScripts("https://www.gstatic.com/firebasejs/9.18.0/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/9.18.0/firebase-messaging-compat.js")

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
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app)


messaging.onBackgroundMessage(payload=>{
    console.log("Recibiste un mensaje mientras estabas ausente");
    console.log(payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "./logo192.png"
    };

    return self.registration.showNotification(
        notificationTitle,
        notificationOptions
    )
})
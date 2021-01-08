import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDNzyBhtO2hKRKNHJQxX6JK33eexKfsMsE",
    authDomain: "chatbox-b45e3.firebaseapp.com",
    projectId: "chatbox-b45e3",
    storageBucket: "chatbox-b45e3.appspot.com",
    messagingSenderId: "609218165702",
    appId: "1:609218165702:web:4d13cefd0590ec6acf90c7",
    measurementId: "G-R3HVEQ7CLG"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()

const auth = firebase.auth()

const provider = new firebase.auth.GoogleAuthProvider()

export {auth, provider}
export default db

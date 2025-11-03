import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBCBp7A_vDaXKZVcyHtP2cH8bplqdEhi2s",
    authDomain: "pi2-progra3.firebaseapp.com",
    projectId: "pi2-progra3",
    storageBucket: "pi2-progra3.firebasestorage.app",
    messagingSenderId: "801874749837",
    appId: "1:801874749837:web:4950c9c10569b4e75335c4"
  };
  

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();

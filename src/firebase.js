import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAsE7pkWOf1QT5NH1sCe_kpO38IlXtrpAY",
    authDomain: "netflix-clone-c2b59.firebaseapp.com",
    projectId: "netflix-clone-c2b59",
    storageBucket: "netflix-clone-c2b59.appspot.com",
    messagingSenderId: "793215652279",
    appId: "1:793215652279:web:0efe8ba328577aa0d05832"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };
export default firebase;
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCYxp7VmFczJDXGu3U7aO-lMONk9OOrgS4",
    authDomain: "tennis-tracker-c3056.firebaseapp.com",
    projectId: "tennis-tracker-c3056",
    storageBucket: "tennis-tracker-c3056.appspot.com",
    messagingSenderId: "766978715575",
    appId: "1:766978715575:web:5fcd8002a4ce87ea9d8232",
    measurementId: "G-ZS06LNXB0P"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }

export default firebase;
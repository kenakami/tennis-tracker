import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAloP7cwHozhwLcJgPz37_ER9i1y8CmsgA",
    authDomain: "tennis-tracker-bc314.firebaseapp.com",
    databaseURL: "https://tennis-tracker-bc314-default-rtdb.firebaseio.com",
    projectId: "tennis-tracker-bc314",
    storageBucket: "tennis-tracker-bc314.appspot.com",
    messagingSenderId: "679204524877",
    appId: "1:679204524877:web:2cec9dde713054b9001d04",
    measurementId: "G-3W14DWK2C2"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }

export default firebase;
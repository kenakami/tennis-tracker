import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDL6Dk1Bo4HLe6ox7ljJSVzjkLIyy9h-cM",
    authDomain: "tennis-tracker-75666.firebaseapp.com",
    projectId: "tennis-tracker-75666",
    storageBucket: "tennis-tracker-75666.appspot.com",
    messagingSenderId: "266985960725",
    appId: "1:266985960725:web:36de3a2bceb3e1015a651c",
    measurementId: "G-9TF9XH1Q35"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
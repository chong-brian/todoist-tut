import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyBlYeKIFIsQqHNyRfcnHgBAFobsXVkvCpw",
    authDomain: "todoist-tut-fccc3.firebaseapp.com",
    databaseURL: "https://todoist-tut-fccc3.firebaseio.com",
    projectId: "todoist-tut-fccc3",
    storageBucket: "todoist-tut-fccc3.appspot.com",
    messagingSenderId: "887976421402",
    appId: "1:887976421402:web:743a3741fa72e901e8c9a3",
});

export { firebaseConfig as firebase };
import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCs6KCI5xvRcZ2SR-6-emEZ5UoVYzObb3A",
    authDomain: "exerciseduringwork.firebaseapp.com",
    projectId: "exerciseduringwork",
    storageBucket: "exerciseduringwork.appspot.com",
    messagingSenderId: "666248324587",
    appId: "1:666248324587:web:a070947d3388ef2baf25ae",
    measurementId: "G-GJ9NH1L528"
  };
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const db = firebase.firestore(app)

  export const Exercises = db.collection('Exercises')

  export { firebase }
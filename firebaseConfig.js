
//import * as firebase from 'firebase';
import firebase from 'firebase';
//import firebase from 'firebase/app';
import 'firebase/firestore';

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

  if (firebase.apps.length === 0) {

    firebase.initializeApp(firebaseConfig);
}
  
  //firebase.analytics();

  //const db = firebase.firestore(firebaseApp)

  export const db = firebase.firestore()
  export const exercises = db.collection('Exercises')

  export const auth = firebase.auth();

  export { firebase };

  // exercises.onSnapshot(function(snapshot) {
  //   snapshot.forEach(function(doc){
  //     console.log("!!!Current data: ", doc.data())
  //     console.log("!!!Current ID: ", doc.id)
  //   })
  // })
import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyBxNb8L4yLWPOqGdHZomnBP2eC2cTMNjMM",
    authDomain: "new-gifts.firebaseapp.com",
    databaseURL:"https://new-gifts.firebaseio.com",
    projectId: "new-gifts",
    storageBucket: "new-gifts.appspot.com",
    messagingSenderId: "403946070225",
    appId: "1:403946070225:web:19a9d244d74aa5db1465f0",
    measurementId: "G-KKEWSRMVGH"
  };
  // Initialize Firebase
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }
  export default firebase.firestore();

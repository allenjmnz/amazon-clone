import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'IMPORT_YOUR_CONFIG',
  authDomain: 'IMPORT_YOUR_CONFIG',
  databaseURL: 'IMPORT_YOUR_CONFIG',
  projectId: 'IMPORT_YOUR_CONFIG',
  storageBucket: 'IMPORT_YOUR_CONFIG',
  messagingSenderId: 'IMPORT_YOUR_CONFIG',
  appId: 'IMPORT_YOUR_CONFIG',
  measurementId: 'IMPORT_YOUR_CONFIG'
});

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };

import * as firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyARbscgyxDtoEs0aqFiUgELJoLJQoUUHf4',
  authDomain: 'instagram-codersx.firebaseapp.com',
  databaseURL: 'https://instagram-codersx.firebaseio.com',
  projectId: 'instagram-codersx',
  storageBucket: 'instagram-codersx.appspot.com',
  messagingSenderId: '112356100998',
  appId: '1:112356100998:web:f407251f8d5c1c5256fa07',
  measurementId: 'G-N2R4TTD0RL',
});

const db = firebaseApp.firestore();
const storage = firebase.storage();

export { db, storage };

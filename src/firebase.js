import * as firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyCXP-n0Mq2ZkUEgJvRQ_IM4uB6bMcs9zEw',
  authDomain: 'instagram-clone-codersx.firebaseapp.com',
  databaseURL: 'https://instagram-clone-codersx.firebaseio.com',
  projectId: 'instagram-clone-codersx',
  storageBucket: 'instagram-clone-codersx.appspot.com',
  messagingSenderId: '457203622030',
  appId: '1:457203622030:web:8f35d62c342b133dcfe9df',
  measurementId: 'G-THJWKX7QGC',
});

const db = firebaseApp.firestore();
const storage = firebase.storage();

export { db, storage };

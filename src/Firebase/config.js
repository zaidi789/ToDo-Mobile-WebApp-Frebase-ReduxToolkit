// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDiPmt39Fld28P11L1A3rUSI_BNFX8fHzQ',
  authDomain: 'todowebapp-459a8.firebaseapp.com',
  projectId: 'todowebapp-459a8',
  storageBucket: 'todowebapp-459a8.appspot.com',
  messagingSenderId: '481015037270',
  appId: '1:481015037270:web:d7886eafbd99b8c8072af7',
  measurementId: 'G-W1D6XP287H',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export {db};
// var auth =firebase
export default app;

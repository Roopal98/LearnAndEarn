// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBHkPCKgLDuza_iPpVDx6sw_AX4Pxeet5Y',
  authDomain: 'learn-earn-ba8b7.firebaseapp.com',
  databaseURL: 'https://learn-earn-ba8b7-default-rtdb.firebaseio.com',
  projectId: 'learn-earn-ba8b7',
  storageBucket: 'learn-earn-ba8b7.appspot.com',
  messagingSenderId: '163972705194',
  appId: '1:163972705194:web:f00cd793a5d561126819d3',
}

// Initialize Firebase
const firebaseapp = firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export const auth = firebaseapp.auth()
export default db

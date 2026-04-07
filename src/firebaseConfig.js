import { initializeApp } from 'firebase/app';
import {getAnalytics,isSupported} from 'firebase/analytics';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'

// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDt8XJwIz65Dr6A_ywASEn_dzTj9OJlzj0",
  authDomain: "typing-website-project-cb28d.firebaseapp.com",
  projectId: "typing-website-project-cb28d",
  storageBucket: "typing-website-project-cb28d.firebasestorage.app",
  messagingSenderId: "793933940083",
  appId: "1:793933940083:web:51a3e68a918ce08c157106",
  measurementId: "G-QKW7V0TXEF"
};

const app=initializeApp(firebaseConfig);//connect frontEnd to FireBase(firebase app instance)

export let analytics;
isSupported().then((yes)=>{
    if(yes)
    {
        analytics=getAnalytics(app);//keep track record of page views by user and user visit
    }
})//Checks if analytics can run in current environment,some browser will not supported 

export const auth=getAuth(app);//initialize firebase authentication
export const db=getFirestore(app);//initialize firestore database (connect app to firstore database)


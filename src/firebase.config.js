import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import env from 'react-dotenv'
 
const firebaseConfig = {
    apiKey:   env.API_KEY,
    authDomain:   env.AUTH_DOMAIN,
    projectId:   env.PROJECT_ID,
    storageBucket:   env.STORAGE_BUCKET,
    messagingSenderId:   env.MESSAGING_SENDER_ID,
    appId:   env.APP_ID,
    measurementId:   env.MEASUREMENT_ID
  };
  
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export default firebase;

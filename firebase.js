import firebase from "firebase/app";
import "firebase/database";
import 'firebase/auth';



const firebaseConfig = {
    apiKey: "AIzaSyDQ0vcvbCei5vozvBz7Oq1rBTPerK6o2UI",
    authDomain: "scheduler-7cf55.firebaseapp.com",
    databaseURL: "https://scheduler-7cf55-default-rtdb.firebaseio.com",
    projectId: "scheduler-7cf55",
    storageBucket: "scheduler-7cf55.appspot.com",
    messagingSenderId: "280388055466",
    appId: "1:280388055466:web:37794d2baa1cf04fc07bd3"
  };

firebase.initializeApp(firebaseConfig);


export { firebase };
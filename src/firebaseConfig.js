import { initializeApp, getApps } from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC1bE40xu-zTIgoUR820s3T2gSB7b9XH_U",
    authDomain: "advanced-todo-list-aeac6.firebaseapp.com",
    projectId: "advanced-todo-list-aeac6",
    storageBucket: "advanced-todo-list-aeac6.appspot.com",
    messagingSenderId: "780018680192",
    appId: "1:780018680192:web:6f84bc2f269fbb627f8165",
    measurementId: "G-11Y9Q8T85Q"
};

let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
}

export default app;

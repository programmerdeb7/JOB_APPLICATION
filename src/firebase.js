import { initializeApp } from 'firebase';
const app = initializeApp({
    apiKey: "AIzaSyC87Lfg7x_OIsTDsD7wJ24qShPp5TVsyyw",
    authDomain: "vue-simple-project-01.firebaseapp.com",
    databaseURL: "https://vue-simple-project-01.firebaseio.com",
    projectId: "vue-simple-project-01",
    storageBucket: "vue-simple-project-01.appspot.com",
    messagingSenderId: "604770702570",
});

export const db = app.firestore();
export const comments = db.collection('comments');
export const homePageStatus = db.collection('homePageStatus');
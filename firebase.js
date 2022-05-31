const firebase = require('firebase-admin')
const firebaseConfig = {
  apiKey: "AIzaSyA98nPME5pblF90SshukzEzHenlHV7SIoo",
  authDomain: "gravity-news-app.firebaseapp.com",
  projectId: "gravity-news-app",
  storageBucket: "gravity-news-app.appspot.com",
  messagingSenderId: "191991222868",
  appId: "1:191991222868:web:d85f67247bec21c52293c1"
};

// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
module.exports = fb
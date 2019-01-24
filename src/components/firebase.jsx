import firebase from "firebase";


// Initialize Firebase
// TODO: Replace with your project's customized code snippet
// Initialize Firebase
var config = {
  apiKey: "AIzaSyC0oLwT8sY32jvDwcqJbG5HO0T_I1WnShw",
  authDomain: "getschwifty-780d2.firebaseapp.com",
  databaseURL: "https://getschwifty-780d2.firebaseio.com",
  projectId: "getschwifty-780d2",
  storageBucket: "getschwifty-780d2.appspot.com",
  messagingSenderId: "691786957596"
};
const fire = firebase.initializeApp(config);

export default fire;

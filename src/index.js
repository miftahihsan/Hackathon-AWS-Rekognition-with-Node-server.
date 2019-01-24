import React from "react";
import ReactDOM from "react-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import * as firebase from "firebase";
import "./index.css";
import App from "./App";
import registerServiceWorker from './registerServiceWorker';

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
  firebase.initializeApp(config);


ReactDOM.render( <App /> , document.getElementById('root'));

registerServiceWorker();

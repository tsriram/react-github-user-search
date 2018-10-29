import * as firebase from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCkaoMFT9Z6mzM83riCXM-GStCGRM6RzWE",
  authDomain: "github-user-search-ts.firebaseapp.com",
  databaseURL: "https://github-user-search-ts.firebaseio.com",
  projectId: "github-user-search-ts",
  storageBucket: "github-user-search-ts.appspot.com",
  messagingSenderId: "1076006149080"
};

firebase.initializeApp(config);

const firebaseAuth = firebase.auth;

const githubAuthProvider = new firebase.auth.GithubAuthProvider();

export { firebaseAuth, githubAuthProvider };

import { githubAuthProvider, firebaseAuth } from "../services/Firebase";
import { auth } from "../services/Auth";
import * as React from "react";

const loginWithPopup = () => {
  return firebaseAuth()
    .signInWithPopup(githubAuthProvider)
    .then((response: any) => {
      const accessToken =
        response.credential && response.credential.accessToken;
      if (accessToken) {
        auth.setAccessToken(accessToken);
      }
    })
    .catch(error => console.error("Error while logging in :", error));
};

const Login: React.SFC<{}> = () => {
  return (
    <div className="login-page page-container">
      <h2 className="title">GitHub User Search</h2>
      <button onClick={loginWithPopup} className="login-btn">
        Login with GitHub
      </button>
    </div>
  );
};

export default Login;

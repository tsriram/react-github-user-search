import { githubAuthProvider, firebaseAuth } from "../services/Firebase";
import { auth } from "src/services/Auth";
import * as React from "react";

export default class Login extends React.Component<{}, {}> {
  constructor(props: any) {
    super(props);
  }

  loginWithPopup = () => {
    return firebaseAuth()
      .signInWithPopup(githubAuthProvider)
      .then((response: any) => {
        const accessToken =
          response.credential && response.credential.accessToken;
        if (accessToken) {
          auth.setAccessToken(accessToken);
          this.setState({
            isAuthenticated: true
          });
        }
      })
      .catch(error => console.error("Error while logging in :", error));
  };

  public render() {
    return (
      <div className="login-page page-container">
        <h2 className="title">GitHub User Search</h2>
        <button onClick={this.loginWithPopup} className="login-btn">
          Login with GitHub
        </button>
      </div>
    );
  }
}

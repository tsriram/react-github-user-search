import { githubAuthProvider, firebaseAuth } from "../services/Firebase";
import { Redirect } from "react-router-dom";
import { auth } from "src/services/Auth";
import * as React from "react";

interface LoginState {
  readonly isAuthenticated: boolean;
}

export default class Login extends React.Component<{}, LoginState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isAuthenticated: false
    };
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
    if (this.state.isAuthenticated) {
      return <Redirect to="/" />;
    } else {
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
}

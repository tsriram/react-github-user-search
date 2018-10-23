import { auth } from "../services/Auth";
import * as React from "react";

export default class Login extends React.Component<{}, {}> {
  componentDidMount() {
    this.login();
  }

  login = () => {
    auth.login();
  };

  public render() {
    return <h3 className="loading-login">Loading login page...</h3>;
  }
}

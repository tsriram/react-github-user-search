// import { Redirect } from "react-router-dom";
import { auth } from "src/services/Auth";
import * as React from "react";

export default class AuthCallback extends React.Component<{}, {}> {
  componentDidMount() {
    auth.handleAuthentication();
  }

  public render() {
    return <div>loading...</div>;
  }
}

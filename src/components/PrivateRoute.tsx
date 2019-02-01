import { RouteProps } from "react-router-dom";
import { AuthContext } from "src/AuthContext";
import * as React from "react";
import Login from "./Login";

class PrivateRoute extends React.Component<RouteProps, {}> {
  render() {
    const { component, ...rest } = this.props;
    // TODO: fix any
    const Component: any = component;
    return (
      <AuthContext.Consumer>
        {user => {
          return user ? <Component {...rest} /> : <Login />;
        }}
      </AuthContext.Consumer>
    );
  }
}

export default PrivateRoute;

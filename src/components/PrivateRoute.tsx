import { RouteProps, RouteComponentProps } from "react-router-dom";
import { AuthContext } from "src/AuthContext";
import * as React from "react";
import Login from "./Login";

interface PrivateRouteProps extends RouteProps {
  readonly component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
}

class PrivateRoute extends React.Component<PrivateRouteProps, {}> {
  render() {
    const { component, ...rest } = this.props;
    const Component = component;
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

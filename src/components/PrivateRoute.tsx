import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps
} from "react-router-dom";
import { auth } from "../services/Auth";
import * as React from "react";

if (!auth) {
  throw new Error("No AUTH");
}

interface PrivateRouteProps extends RouteProps {
  readonly component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  // console.log("Private route auth: ", auth);
  const { component, ...rest } = props;
  const Component = component;
  return (
    <Route
      {...rest}
      render={props =>
        auth.isAuthenticated() && Component ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;

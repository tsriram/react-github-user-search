import { RouteProps } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import * as React from "react";
import Login from "./Login";

const PrivateRoute = (props: RouteProps) => {
  const user = React.useContext(AuthContext);
  const { component, ...rest } = props;

  // TODO: fix any
  const Component: any = component;
  return user ? <Component {...rest} /> : <Login />;
};

export default PrivateRoute;

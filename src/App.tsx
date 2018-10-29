import { BrowserRouter as Router, Route } from "react-router-dom";
import UserSearchPage from "./components/UserSearchPage";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import * as React from "react";

export default class App extends React.Component<{}, {}> {
  public render() {
    return (
      <Router>
        <div>
          <PrivateRoute exact path="/" component={UserSearchPage} />
          <Route exact path="/login" component={Login} />
        </div>
      </Router>
    );
  }
}

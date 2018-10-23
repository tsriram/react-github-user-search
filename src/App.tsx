import { BrowserRouter as Router, Route } from "react-router-dom";
import UserSearchPage from "./components/UserSearchPage";
import PrivateRoute from "./components/PrivateRoute";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import Login from "./components/Login";
import * as React from "react";

const gitHubToken = process.env.REACT_APP_GITHUB_TOKEN;

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  headers: {
    authorization: gitHubToken ? `Bearer ${gitHubToken}` : ""
  }
});

export default class App extends React.Component<{}, {}> {
  public render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>
            <PrivateRoute exact path="/" component={UserSearchPage} />
            <Route exact path="/login" component={Login} />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

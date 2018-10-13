import UserSearchPage from "./components/UserSearchPage";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import * as React from "react";

const gitHubToken = process.env.REACT_APP_GITHUB_TOKEN;

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  headers: {
    authorization: gitHubToken ? `Bearer ${gitHubToken}` : ""
  }
});

class App extends React.Component {
  public render() {
    return (
      <ApolloProvider client={client}>
        <UserSearchPage />
      </ApolloProvider>
    );
  }
}

export default App;

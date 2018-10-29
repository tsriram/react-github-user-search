import { ApolloProvider } from "react-apollo";
import { auth } from "src/services/Auth";
import ApolloClient from "apollo-boost";
import UserSearch from "./UserSearch";
import * as React from "react";

const gitHubToken = auth.getAccessToken();
const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  headers: {
    authorization: `Bearer ${gitHubToken}`
  }
});

export default class UserSearchPage extends React.Component<{}, {}> {
  public render() {
    return (
      <ApolloProvider client={client}>
        <UserSearch />
      </ApolloProvider>
    );
  }
}

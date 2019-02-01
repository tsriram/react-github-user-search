import { ApolloProvider } from "react-apollo";
import { auth } from "src/services/Auth";
import ApolloClient from "apollo-boost";
import UserSearch from "./UserSearch";
import * as React from "react";

const gitHubToken = auth.getAccessToken();
const apolloClient = new ApolloClient({
  uri: "https://api.github.com/graphql",
  headers: {
    authorization: `Bearer ${gitHubToken}`
  }
});

const UserSearchPage = () => {
  if (apolloClient !== null) {
    return (
      <ApolloProvider client={apolloClient}>
        <UserSearch />
      </ApolloProvider>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default UserSearchPage;

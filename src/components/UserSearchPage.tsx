import { ApolloProvider } from "react-apollo";
import { auth } from "src/services/Auth";
import ApolloClient from "apollo-boost";
import UserSearch from "./UserSearch";
import * as React from "react";

interface UserSearchPageState {
  readonly client: ApolloClient<any> | null;
}

export default class UserSearchPage extends React.Component<
  {},
  UserSearchPageState
> {
  state = {
    client: null
  };

  componentDidMount() {
    const gitHubToken = auth.getAccessToken();
    if (gitHubToken) {
      this.setState({
        client: new ApolloClient({
          uri: "https://api.github.com/graphql",
          headers: {
            authorization: `Bearer ${gitHubToken}`
          }
        })
      });
    }
  }

  public render() {
    const { client } = this.state;
    if (client !== null) {
      return (
        <ApolloProvider client={client}>
          <UserSearch />
        </ApolloProvider>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

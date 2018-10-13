import { Query } from "react-apollo";
import SearchBar from "./SearchBar";
import * as React from "react";
import gql from "graphql-tag";

import "../styles/user-search.css";
import SearchResult from "./SearchResult";

interface SearchPageState {
  readonly query: string;
  readonly shouldFetchData: boolean;
}

const searchUsersQuery = gql`
  {
    search(type: USER, query: "kentcdodds", first: 10) {
      userCount
      edges {
        node {
          ... on User {
            name
            email
            bio
            login
            avatarUrl
            location
            url
          }
        }
      }
    }
  }
`;

export default class UserSearchPage extends React.Component<
  {},
  SearchPageState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      query: "",
      shouldFetchData: false
    };
  }

  handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      query: event.target.value
    });
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.setState({
      shouldFetchData: true
    });
  };

  public render() {
    return (
      <div className="user-search page-container">
        <h2 className="title">GitHub User Search</h2>
        <SearchBar
          query={this.state.query}
          onChange={this.handleQueryChange}
          onSubmit={this.handleSubmit}
        />
        {this.state.shouldFetchData && (
          <Query query={searchUsersQuery}>
            {({ loading, error, data }) => {
              if (loading) {
                return <h3>Loading...</h3>;
              } else if (error) {
                return <h3>Error loading search results</h3>;
              } else {
                return (
                  <div>
                    {data.search.edges.map((edge: any) => {
                      return (
                        <SearchResult
                          userNode={edge.node}
                          key={edge.node.login}
                        />
                      );
                    })}
                  </div>
                );
              }
            }}
          </Query>
        )}
      </div>
    );
  }
}

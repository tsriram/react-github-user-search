import { SearchUsersQuery } from "src/queries";
import SearchResult from "./SearchResult";
import { Query } from "react-apollo";
import SearchBar from "./SearchBar";
import * as React from "react";

import "../styles/user-search.css";

interface SearchPageState {
  readonly query: string;
  readonly shouldFetchData: boolean;
}

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
    const query = this.state.query;
    return (
      <div className="user-search page-container">
        <h2 className="title">GitHub User Search</h2>
        <SearchBar
          query={this.state.query}
          onChange={this.handleQueryChange}
          onSubmit={this.handleSubmit}
        />
        {this.state.shouldFetchData && (
          <Query query={SearchUsersQuery} variables={{ query }}>
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

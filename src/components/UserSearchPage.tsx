import { SearchUsersQuery, SearchResults } from "src/queries";
import { ApolloClient } from "apollo-boost";
import SearchResult from "./SearchResult";
import { withApollo } from "react-apollo";
import SearchBar from "./SearchBar";
import * as React from "react";

import "../styles/user-search.css";

interface SearchPageState {
  readonly query: string;
  readonly loading: boolean;
  readonly error: boolean;
  readonly data: SearchResults;
}

interface SearchPageProps {
  readonly client: ApolloClient<SearchResults>;
}

class UserSearchPage extends React.Component<SearchPageProps, SearchPageState> {
  constructor(props: any) {
    super(props);
    this.state = {
      query: "",
      loading: false,
      error: false,
      data: {
        search: {
          userCount: undefined,
          edges: []
        }
      }
    };
  }

  handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      query: event.target.value
    });
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.executeSearch();
  };

  executeSearch = async () => {
    this.setState({
      loading: true
    });
    const query = this.state.query;
    try {
      const { data } = await this.props.client.query<SearchResults>({
        query: SearchUsersQuery,
        variables: { query }
      });
      this.setState({
        loading: false,
        data
      });
    } catch (error) {
      console.error("error: ", error);
      this.setState({
        loading: false,
        error: true
      });
    }
  };

  private renderLoading() {
    return this.state.loading ? <h3>Loading...</h3> : null;
  }

  private renderError() {
    return this.state.error ? <h3>Error loading search results</h3> : null;
  }

  private renderSearchResults() {
    const { data } = this.state;
    if (data.search.userCount !== undefined && data.search.userCount > 0) {
      return (
        <div>
          {data.search.edges.map((edge: any) => {
            return <SearchResult userNode={edge.node} key={edge.node.login} />;
          })}
        </div>
      );
    } else if (data.search.userCount === 0) {
      return <h3>No results found!</h3>;
    } else {
      return null;
    }
  }

  public render() {
    return (
      <div className="user-search page-container">
        <h2 className="title">GitHub User Search</h2>
        <SearchBar
          query={this.state.query}
          onChange={this.handleQueryChange}
          onSubmit={this.handleSubmit}
        />

        {this.renderLoading() ||
          this.renderError() ||
          this.renderSearchResults()}
      </div>
    );
  }
}

export default withApollo(UserSearchPage);

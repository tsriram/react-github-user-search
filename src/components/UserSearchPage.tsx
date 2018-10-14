import { SearchUsersQuery, SearchResults } from "src/queries";
import { DEFAULT_PAGE_SIZE } from "src/constants";
import { ApolloClient } from "apollo-boost";
import SearchResult from "./SearchResult";
import { withApollo } from "react-apollo";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import * as React from "react";

import "../styles/user-search.css";

interface SearchPageState {
  readonly query: string;
  readonly loading: boolean;
  readonly error: boolean;
  readonly data: SearchResults;
  readonly page: number;
}

interface SearchPageProps {
  readonly client: ApolloClient<SearchResults>;
}

interface SearchOptions {
  readonly after?: string;
  readonly before?: string;
  readonly first?: Number;
  readonly last?: Number;
}

class UserSearchPage extends React.Component<SearchPageProps, SearchPageState> {
  constructor(props: any) {
    super(props);
    this.state = {
      page: 1,
      query: "",
      loading: false,
      error: false,
      data: {
        search: {
          userCount: undefined,
          edges: [],
          pageInfo: {
            hasNextPage: false,
            hasPreviousPage: false,
            startCursor: "",
            endCursor: ""
          }
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
    this.executeSearch({ after: undefined, before: undefined });
  };

  executeSearch = async (options: SearchOptions) => {
    this.setState({
      loading: true
    });
    const query = this.state.query;
    const { after, before, first, last } = options;
    let firstQuery = first;
    if (first === undefined && last === undefined) {
      firstQuery = DEFAULT_PAGE_SIZE;
    }
    try {
      const { data } = await this.props.client.query<SearchResults>({
        query: SearchUsersQuery,
        variables: { query, after, before, first: firstQuery, last }
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

  handlePreviousClick = () => {
    const { data } = this.state;
    const { startCursor } = data.search.pageInfo;
    const options = {
      before: startCursor,
      last: DEFAULT_PAGE_SIZE
    };
    this.executeSearch(options);
  };

  handleNextClick = () => {
    const { data } = this.state;
    const { endCursor } = data.search.pageInfo;
    const options = {
      after: endCursor,
      first: DEFAULT_PAGE_SIZE
    };
    this.executeSearch(options);
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
          <h3>{data.search.userCount.toLocaleString()} Users</h3>
          {data.search.edges.map((edge: any) => {
            return <SearchResult userNode={edge.node} key={edge.node.login} />;
          })}

          <Pagination
            pageInfo={data.search.pageInfo}
            onPreviousClick={this.handlePreviousClick}
            onNextClick={this.handleNextClick}
          />
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

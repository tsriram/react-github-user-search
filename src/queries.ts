import gql from "graphql-tag";

export const SearchUsersQuery = gql`
  query SearchUsers(
    $query: String!
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    search(
      type: USER
      query: $query
      first: $first
      last: $last
      after: $after
      before: $before
    ) {
      userCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
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

interface SearchNode {
  readonly node: {
    readonly name: string;
    readonly email: string;
    readonly bio: string;
    readonly login: string;
    readonly avatarUrl: string;
    readonly location: string;
    readonly url: string;
  };
}

export interface PageInfo {
  readonly hasNextPage: boolean;
  readonly hasPreviousPage: boolean;
  readonly startCursor: string;
  readonly endCursor: string;
}

export interface SearchResults {
  readonly search: {
    readonly userCount: number | undefined;
    readonly pageInfo: PageInfo;
    readonly edges: ReadonlyArray<SearchNode>;
  };
}
